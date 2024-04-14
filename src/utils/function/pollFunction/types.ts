import { EXECUTION_STATUS } from './constants';

/**
 * 実行状況
 */
export type ExecutionStatus = (typeof EXECUTION_STATUS)[keyof typeof EXECUTION_STATUS];

/**
 * オプション
 */
export type PollFunctionOptions = {
  /**
   * 実行回数
   */
  executionCount?: number | null;

  /**
   * 処理を実行する間隔(ms)
   * 未指定の場合はrequestAnimationFrameに従う
   */
  interval?: number | null;

  /**
   * 最初の処理実行までの待ち時間(ms)
   */
  delay?: number | null;

  /**
   * 繰り返し処理が全て完了した際に実行されるコールバック
   * durationとiterationCountが設定されている場合に有効
   * @returns
   */
  onComplete?: (state: PollFunctionState) => void;

  /**
   * 繰り返し処理がキャンセルされた際に実行されるコールバック
   * @returns
   */
  onCancel?: (state: PollFunctionState) => void;
};

/**
 * 現在の状態
 */
export type PollFunctionState = {
  /**
   * 繰り返し処理のID
   */
  id: number | null;

  /**
   * 総実行回数
   */
  execution: number;

  /**
   * 実行状況
   */
  status: ExecutionStatus;
};
