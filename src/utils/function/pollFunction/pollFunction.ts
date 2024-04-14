import applyIf from '@visue/core/utils/function/applyIf';
import toPositiveNumber from '@visue/core/utils/number/toPositiveNumber';

import { EXECUTION_STATUS } from './constants';
import { PollFunctionOptions, PollFunctionState } from './types';

/**
 * コールバックの戻り値
 */
const CALLBACK_RESULT = {
  /**
   * 実行済
   */
  DONE: 0,

  /**
   * イテレーション終了
   */
  END: 1,

  /**
   * 強制終了
   */
  TERMINATE: 2,
} as const;
type CallbackResult = (typeof CALLBACK_RESULT)[keyof typeof CALLBACK_RESULT];

/**
 * 周期的にcallbackの呼び出しを行う
 */
export default function pollFunction(
  callback: (state: PollFunctionState) => boolean | void,
  options: PollFunctionOptions = {},
): () => PollFunctionState {
  // 現在の状態を初期化
  const state: PollFunctionState = {
      id: null,
      status: EXECUTION_STATUS.WAITING,
      execution: 0,
    },
    // requestAnimationFrame用コールバック作成
    frameRequestCallback = createFrameRequestCallback(state, callback, options);

  // 処理を実行
  state.id = requestAnimationFrame(frameRequestCallback);

  // 処理キャンセル用のコールバック
  return () => {
    if (state.id != null) {
      cancelAnimationFrame(state.id);
    }
    state.status = EXECUTION_STATUS.CANCELED;
    applyIf(options.onCancel, [state]);
    return state;
  };
}

/**
 * requestAnimationFrame用コールバック関数作成
 * @param state
 * @param callback
 * @param options
 */
function createFrameRequestCallback(
  state: PollFunctionState,
  callback: (state: PollFunctionState) => boolean | void,
  options: PollFunctionOptions,
) {
  // 処理開始時間
  const startTime = performance.now();
  // 処理開始からの所要時間(ms)
  let totalTime = 0,
    // コールバック処理の前回実行終了時間(ms)
    previousEndTime = 0,
    // 前回実行完了からの経過時間(ms)
    elapsedTime = 0;

  const { delay, interval, executionCount, onComplete, onCancel } = options,
    dly = toPositiveNumber(delay, { negativeValue: 0, defaultValue: 0 }) as number,
    itvl = toPositiveNumber(interval, { negativeValue: 0, defaultValue: 0 }) as number,
    executionCnt = toPositiveNumber(executionCount, { negativeValue: 'abs', defaultValue: 0 }) as number,
    // オプションの内容を反映したコールバック関数作成
    callbackFn = createCallbackFn(callback, executionCnt),
    // requestAnimationFrame用コールバック関数作成
    frameRequestCallback = () => {
      const currentStartTime = performance.now();

      // 実行可否判定
      if (previousEndTime !== 0) {
        // 前回実行完了からの経過時間
        elapsedTime = currentStartTime - previousEndTime;
        if (elapsedTime < itvl) {
          // 前回の実行から指定ミリ秒以上経っていない場合は次の回に先送り
          state.id = requestAnimationFrame(frameRequestCallback);
          return;
        }
      }

      // コールバック前処理
      // 主に今回のcallbackでの参照、およびprogressの算出に必要な値を更新する
      totalTime = currentStartTime - startTime;
      if (state.status === EXECUTION_STATUS.WAITING) {
        if (dly <= totalTime) {
          // delayなし or delayに指定された時間が経過したらrunning
          state.status = EXECUTION_STATUS.RUNNING;
        } else {
          // delayに指定された時間が経過していない場合は次回の実行
          state.id = requestAnimationFrame(frameRequestCallback);
          return;
        }
      }

      if (state.status === EXECUTION_STATUS.RUNNING) {
        // statusが`running`の場合にのみ処理
        state.execution++;

        let result;
        try {
          // callback実行
          result = callbackFn({ ...state });
        } catch (error) {
          state.status = EXECUTION_STATUS.ERROR;
          throw {
            state,
            error,
          };
        }

        // コールバック後処理
        // 主にcallbackの実行有無によって設定する値が変わるものを設定する
        // callback処理完了時間
        const currentEndTime = performance.now();
        previousEndTime = currentEndTime;
        if (result === CALLBACK_RESULT.DONE) {
          // 処理継続
          state.id = requestAnimationFrame(frameRequestCallback);
        } else if (result === CALLBACK_RESULT.END) {
          // 処理終了
          state.status = EXECUTION_STATUS.COMPLETED;
          applyIf(onComplete, [state]);
        } else {
          // 強制終了
          state.status = EXECUTION_STATUS.CANCELED;
          applyIf(onCancel, [state]);
        }
      }
    };
  return frameRequestCallback;
}

/**
 * コールバック関数作成
 * @param callback
 * @returns
 */
function createCallbackFn(
  callback: (state: PollFunctionState) => boolean | void,
  executionCount: number,
): (state: PollFunctionState) => CallbackResult {
  // コールバック作成
  return (state: PollFunctionState): CallbackResult => {
    const result = callback(state);
    if (result === false) {
      // 強制終了
      return CALLBACK_RESULT.TERMINATE;
    } else if (executionCount == state.execution) {
      // 指定の処理回数が完了
      return CALLBACK_RESULT.END;
    } else {
      // 処理成功
      return CALLBACK_RESULT.DONE;
    }
  };
}
