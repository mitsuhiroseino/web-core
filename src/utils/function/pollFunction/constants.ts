/**
 * pollFunctionの実行状況
 */
export const EXECUTION_STATUS = {
  /**
   * 実行中
   */
  RUNNING: 'running',

  /**
   * 正常終了済
   */
  COMPLETED: 'completed',

  /**
   * キャンセル済
   */
  CANCELED: 'canceled',

  /**
   * エラー
   */
  ERROR: 'error',

  /**
   * 待機中
   */
  WAITING: 'waiting',
} as const;
