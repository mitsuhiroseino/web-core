/**
 * 子要素が横幅を超えているか判定する
 * @param element エレメント
 * @returns
 */
export default function isWidthOverflowing(
  element: HTMLElement,
): boolean {
  return element.scrollWidth > element.clientWidth;
}
