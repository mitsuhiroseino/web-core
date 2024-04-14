import { Easing, EasingType } from '@visue/core/utils/easing';

import { DIRECTION_TYPE, EXECUTION_STATUS } from './constants';

/**
 * 実行状況
 */
export type ExecutionStatus = (typeof EXECUTION_STATUS)[keyof typeof EXECUTION_STATUS];

/**
 * 進捗割合の進行方向
 */
export type DirectionType = (typeof DIRECTION_TYPE)[keyof typeof DIRECTION_TYPE];

/**
 * オプション
 */
export type RunWithProgressOptions = {
  /**
   * 処理を繰り返す時間(ms)
   * 指定されている場合、進捗割合は指定時間経過した時点で1となるように推移する。
   * 未指定の場合は300ms。
   */
  duration?: number;

  /**
   * 進捗割合が0～1に変化するまでの処理を1とした場合の繰り返し回数
   * 未指定の場合は無限に繰り返す
   */
  iterationCount?: number;

  /**
   * 最初の処理実行までの待ち時間(ms)
   */
  delay?: number;

  /**
   * 進捗割合の進行方向
   * 未指定の場合は`normal`
   */
  direction?: DirectionType;

  /**
   * タイミング関数
   */
  timingFunction?: EasingType | Easing;

  /**
   * 逆順時の処理を繰り返す時間(ms)
   * 指定されている場合、進捗割合は指定時間経過した時点で1となるように推移する。
   * 未指定の場合の進捗割合は0固定となる。
   */
  reverseDuration?: number;

  /**
   * 逆順時のタイミング関数
   */
  reverseTimingFunction?: EasingType | Easing;

  /**
   * 繰り返し処理が全て完了した際に実行されるコールバック
   * durationとiterationCountが設定されている場合に有効
   * @returns
   */
  onComplete?: (state: RunWithProgressState) => void;

  /**
   * 繰り返し処理がキャンセルされた際に実行されるコールバック
   * @returns
   */
  onCancel?: (state: RunWithProgressState) => void;
};

/**
 * 現在の状態
 */
export type RunWithProgressState = {
  /**
   * 繰り返し処理のID
   */
  id: number | null;

  /**
   * easingとreverseを考慮した進捗割合(0～1)
   */
  progress: number;

  /**
   * easingとreverseを考慮しない進捗割合(0～1)
   */
  linearProgress: number;

  /**
   * duration='alternate'またはduration='alternate_reverse'の場合にtrue
   */
  alternate: boolean;

  /**
   * 現在の進捗割合の進行方向が逆順の場合にtrue
   */
  reverse: boolean;

  /**
   * 実行状況
   */
  status: ExecutionStatus;
};
