export type CanClickAndDoubleClickOptions = {
  /**
   * ダブルクリックと見なすクリック間隔
   * 未指定の場合は300ms
   */
  doubleClickSpeed?: number;

  /**
   * クリック回数が3回以上でもダブルクリックとして扱う場合にtrue
   */
  loose?: boolean;
};
