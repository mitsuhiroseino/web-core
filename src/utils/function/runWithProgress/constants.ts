/**
 * runWithProgressの実行状況
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

/**
 * 進捗割合の進行方向
 */
export const DIRECTION_TYPE = {
  /**
   * 進捗割合が順方向に変化する
   */
  NORMAL: 'normal',

  /**
   * 進捗割合が逆方向に変化する
   */
  REVERSE: 'reverse',

  /**
   * 進捗割合が初回は順方向、それ以降は繰り返し毎に反転して変化する
   */
  ALTERNATE: 'alternate',

  /**
   * 進捗割合が初回は逆方向、それ以降は繰り返し毎に反転して変化する
   */
  ALTERNATE_REVERSE: 'alternate-reverse',
} as const;
