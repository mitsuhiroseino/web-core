import { GetTextSizeOptions } from '../getTextSize';

/**
 * オプション
 */
export type GetScalesToFitOptions = GetTextSizeOptions;

/**
 * 戻り値
 */
export type GetScalesToFitResult = {
  /**
   * エレメントの幅 / 文字列の幅
   */
  widthScale: number;

  /**
   * エレメントの高さ / 文字列の高さ
   */
  heightScale: number;
};
