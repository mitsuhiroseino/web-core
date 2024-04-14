/**
 * オプション
 */
export type GetElementSizeOptions = {
  /**
   * スタイル
   */
  computedStyle?: CSSStyleDeclaration;

  /**
   * width,heightにpaddingの値を含める
   */
  paddding?: boolean;

  /**
   * width,heightにmarginの値を含める
   */
  margin?: boolean;

  /**
   * width,heightにborderの値を含める
   */
  border?: boolean;

  /**
   * width,heightにscrollbarの値を含める
   */
  scrollbar?: boolean;
};

/**
 * 戻り値
 */
export type GetElementSizeResult = {
  /**
   * 幅
   */
  width: number;

  /**
   * 高さ
   */
  height: number;
};
