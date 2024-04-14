import { AnimateElementOptions } from './types';

/**
 * 値のアニメーションを行う
 * @param element エレメント
 * @param className アニメーション用のクラス
 * @param options オプション
 */
export default function animateElement<O extends AnimateElementOptions = AnimateElementOptions>(
  element: Element | undefined,
  className: string,
  options: O = {} as O,
) {
  if (element != null) {
    const handleAnimationEnd = () => {
      element.classList.remove(className);
      element.removeEventListener('animationend', handleAnimationEnd);
      element.removeEventListener('animationcancel', handleAnimationEnd);
    };
    element.addEventListener('animationend', handleAnimationEnd);
    element.addEventListener('animationcancel', handleAnimationEnd);
    element.classList.add(className);
  }
}
