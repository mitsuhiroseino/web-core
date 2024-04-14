import getTextSize from '../getTextSize';
import { GetScalesToFitOptions, GetScalesToFitResult } from './types';

/**
 * テキストを対象のエレメント配下に折り返しなしで全体を表示できるscaleを幅と高さそれぞれ取得する
 * @param text 文字列
 * @param element エレメント
 * @returns scale
 */
export default function getScalesToFit(
  text: string | null | undefined,
  element: HTMLElement,
  options: GetScalesToFitOptions = {},
): GetScalesToFitResult {
  if (text == null || !text.length) {
    // textが無い場合は1でOK
    return { widthScale: 1, heightScale: 1 };
  }
  // 文字列のサイズを取得
  const textSize = getTextSize(text, element, options),
    textWidth = textSize.width,
    textHeight = textSize.height,
    // padding,border,scrollbarを含まないエレメントのサイズを取得
    computedStyle = window.getComputedStyle(element),
    elementWidth = parseFloat(computedStyle.width),
    elementHeight = parseFloat(computedStyle.height),
    // 幅を基に決めたスケール
    widthScale = elementWidth / textWidth,
    // 高さを基に決めたスケール
    heightScale = elementHeight / textHeight;

  return { widthScale, heightScale };
}
