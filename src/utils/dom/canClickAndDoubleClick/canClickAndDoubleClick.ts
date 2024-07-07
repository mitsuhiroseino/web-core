import { CanClickAndDoubleClickOptions } from './types';

/**
 * 1つのdomでclickとdoubleclickのイベント処理ができるようにする
 * @param onClick クリックイベントのハンドラー
 * @param onDoubleClick ダブルクリックイベントのハンドラー
 * @returns
 */
export default function canClickAndDoubleClick<E = MouseEvent>(
  onClick: (event: E) => void,
  onDoubleClick: (event: E) => void,
  options: CanClickAndDoubleClickOptions = {},
): (event: E) => void {
  const { doubleClickSpeed = 300, loose } = options;
  let count = 0;
  return (event: E) => {
    count++;
    setTimeout(() => {
      if (count === 1) {
        onClick(event);
      } else if (count === 2 || (loose && count > 3)) {
        onDoubleClick(event);
      }
      count = 0;
    }, doubleClickSpeed);
  };
}
