import toPx from '../../css/toPx';
import { GetTextSizeOptions } from './types';

/**
 * テキストを対象のエレメント直下に描画した際の文字列の幅と高さを取得
 * @param text 文字列
 * @param target エレメント
 * @returns 文字列の幅と高さ
 */
export default function getTextSize(
  text: string | null | undefined,
  target: HTMLElement,
  options: GetTextSizeOptions = {},
) {
  if (text == null || !text.length) {
    // textが無い場合は0,0でOK
    return { width: 0, height: 0 };
  }
  const { fontSize } = options,
    el = target.cloneNode() as HTMLElement,
    style = el.style;
  if (fontSize != null) {
    style.fontSize = toPx(fontSize);
  }
  style.visibility = 'hidden';
  style.whiteSpace = 'nowrap';
  style.position = 'absolute';
  style.top = '-1000px';
  style.width = 'auto';
  style.maxWidth = 'none';
  style.minWidth = 'initial';
  style.height = 'auto';
  style.maxHeight = 'none';
  style.minHeight = 'initial';
  style.margin = '0';
  style.padding = '0';
  style.border = 'none';
  style.boxSizing = 'content-box';
  style.transform = 'none';
  el.textContent = text;
  target.after(el);
  const width = el.clientWidth,
    height = el.clientHeight;
  el.remove();
  return { width, height };
}
