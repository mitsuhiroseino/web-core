import { EASINGS, EASING_TYPE, Easing, EasingCreater, EasingType } from '@visue/core/utils/easing';
import applyIf from '@visue/core/utils/function/applyIf';
import toPositiveNumber, { ToPositiveNumberOptions } from '@visue/core/utils/number/toPositiveNumber';
import isFunction from 'lodash/isFunction';
import { DIRECTION_TYPE, EXECUTION_STATUS } from './constants';
import { RunWithProgressOptions, RunWithProgressState } from './types';

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
export default function runWithProgress(
  callback: (state: RunWithProgressState) => boolean | void,
  options: RunWithProgressOptions = {},
): () => RunWithProgressState {
  // 現在の状態を初期化
  const state: RunWithProgressState = initState(options),
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
 * ステートの初期化
 * @param options
 * @returns
 */
function initState(options: RunWithProgressOptions): RunWithProgressState {
  const direction = options.direction || DIRECTION_TYPE.NORMAL;

  return {
    id: null,
    status: EXECUTION_STATUS.WAITING,
    progress: 0,
    linearProgress: 0,
    alternate: direction === DIRECTION_TYPE.ALTERNATE || direction === DIRECTION_TYPE.ALTERNATE_REVERSE,
    reverse: direction === DIRECTION_TYPE.REVERSE || direction === DIRECTION_TYPE.ALTERNATE_REVERSE,
  };
}

/**
 * requestAnimationFrame用コールバック関数作成
 * @param state 処理状態
 * @param callback コールバック処理
 * @param options オプション
 */
function createFrameRequestCallback(
  state: RunWithProgressState,
  callback: (state: RunWithProgressState) => boolean | void,
  options: RunWithProgressOptions,
) {
  // 処理開始時間
  const startTime = performance.now();
  // 処理開始からの所要時間(ms)
  let totalTime = 0,
    // コールバック処理の前回実行終了時間(ms)
    previousEndTime = 0,
    // 前回実行完了からの経過時間(ms)
    elapsedTime = 0,
    // 現在の繰り返し開始時間
    iterationStartTime = 0,
    // 現在の繰り返し開始からの所要時間(ms)
    iterationTotalTime = 0,
    // 現在の繰り返し回数(1～)
    iteration = 0,
    // イテレーション中か
    underIteration = false;

  const { delay, iterationCount, onComplete, onCancel } = options,
    dly = toPositiveNumber(delay, { negativeValue: 0, defaultValue: 0 }) as number,
    iterationCnt = toPositiveNumber(iterationCount, { negativeValue: 'abs', defaultValue: 0 }) as number,
    // オプションの内容を反映したコールバック関数作成
    callbackFn = createCallbackFn(callback),
    // 進捗割合更新関数作成
    updateProgress = getUpdateProgress(options, state.alternate),
    // requestAnimationFrame用コールバック関数作成
    frameRequestCallback = () => {
      console.log('performance.now()', performance.now());
      const currentStartTime = performance.now();

      if (previousEndTime !== 0) {
        // 前回実行完了からの経過時間
        elapsedTime = currentStartTime - previousEndTime;
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

      if (!underIteration) {
        // まだイテレーションが開始されていない場合
        // イテレーションの開始時間を設定
        iterationStartTime = currentStartTime;
        if (state.alternate) {
          // alternateの折り返し時は0や1が2回続いてしまうので、開始時間を少し前倒し
          iterationStartTime -= elapsedTime;
        }
        iteration++;
        underIteration = true;
      }

      if (state.status === EXECUTION_STATUS.RUNNING) {
        // statusが`running`の場合にのみ処理
        iterationTotalTime = currentStartTime - iterationStartTime;
        // progressの更新
        updateProgress(state, iterationTotalTime);

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
        if (result === CALLBACK_RESULT.END) {
          // イテレーション終了
          if (iterationCnt === iteration) {
            // 指定されたイテレーション回数を完了
            state.status = EXECUTION_STATUS.COMPLETED;
            applyIf(onComplete, [state]);
            return;
          } else {
            // 次のイテレーションあり
            iterationTotalTime = 0;
            underIteration = false;
            if (state.alternate) {
              state.reverse = !state.reverse;
            }
            // 次回の実行
            state.id = requestAnimationFrame(frameRequestCallback);
            return;
          }
        } else if (result === CALLBACK_RESULT.TERMINATE) {
          // 強制終了
          state.status = EXECUTION_STATUS.CANCELED;
          applyIf(onCancel, [state]);
          return;
        } else {
          // イテレーション継続
          state.id = requestAnimationFrame(frameRequestCallback);
          return;
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
  callback: (state: RunWithProgressState) => boolean | void,
): (state: RunWithProgressState) => CallbackResult {
  // コールバック作成
  return (state: RunWithProgressState): CallbackResult => {
    const result = callback(state);
    if (result === false) {
      return CALLBACK_RESULT.TERMINATE;
    } else if (state.linearProgress < 1) {
      // 進捗が1以下
      return CALLBACK_RESULT.DONE;
    } else {
      // 進捗が1
      return CALLBACK_RESULT.END;
    }
  };
}

/**
 * 進捗割合更新処理取得
 * @param options
 * @param options
 * @returns
 */
function getUpdateProgress(options: RunWithProgressOptions, alternate: boolean) {
  let { duration, timingFunction = EASING_TYPE.LINEAR, reverseDuration, reverseTimingFunction } = options,
    durationOptions: ToPositiveNumberOptions = { defaultValue: 300, negativeValue: 'abs' },
    hasReverseConfig = alternate && (reverseDuration != null || reverseTimingFunction != null);

  // 正順の設定
  const forward = {
    duration: toPositiveNumber(duration, durationOptions) as number,
    timingFn: getTimingFunction(timingFunction),
  };

  let reverse;
  if (hasReverseConfig) {
    // 逆順用の設定がある場合
    reverse = {};
    // duration
    if (reverseDuration == null) {
      reverse.duration = forward.duration;
    } else {
      reverse.duration = toPositiveNumber(reverseDuration, durationOptions) as number;
    }
    // timingFunction
    if (reverseTimingFunction == null) {
      reverse.timingFn = forward.timingFn;
    } else {
      reverse.timingFn = getTimingFunction(reverseTimingFunction);
    }
  }

  return hasReverseConfig
    ? // 行きと帰りがある場合
      (state: RunWithProgressState, iterationTotalTime: number) =>
        state.reverse
          ? updateProgress(state, iterationTotalTime, forward)
          : updateProgress(state, iterationTotalTime, reverse)
    : // 行きを繰り返す場合
      (state: RunWithProgressState, iterationTotalTime: number) => updateProgress(state, iterationTotalTime, forward);
}

// タイミング関数取得
function getTimingFunction(timingFunction: EasingType | Easing = EASING_TYPE.LINEAR): Easing {
  if (isFunction(timingFunction)) {
    return timingFunction;
  } else {
    const createEasing: EasingCreater = EASINGS[timingFunction] || EASINGS[EASING_TYPE.LINEAR];
    return createEasing();
  }
}

// progress更新用関数
function updateProgress(
  state: RunWithProgressState,
  iterationTotalTime: number,
  setting: { duration: number; timingFn: Easing },
) {
  const linearProgress = Math.min(iterationTotalTime / setting.duration, 1);
  state.linearProgress = linearProgress;
  const progress = setting.timingFn(linearProgress);
  state.progress = state.reverse ? 1 - progress : progress;
}
