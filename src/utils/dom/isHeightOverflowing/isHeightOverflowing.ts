/**
 * 子要素が縦幅を超えているか判定する
 * @param element エレメント
 * @returns
 */
export default function isHeightOverflowing(
  element: HTMLElement,
): boolean {
  return element.scrollHeight > element.clientHeight;
}
