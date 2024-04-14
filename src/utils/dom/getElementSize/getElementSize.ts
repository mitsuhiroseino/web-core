import { GetElementSizeOptions, GetElementSizeResult } from './types';

const CORRECTION_TARGETS = {
  '': true,
  'max-content': true,
  'min-content': true,
  'fit-content': true,
  auto: true,
  inherit: true,
  initial: true,
  revert: true,
  unset: true,
};

/**
 * エレメントの幅と高さを取得する
 * @param element エレメント
 * @param options オプション
 * @returns
 */
export default function getElementSize(
  element: HTMLElement,
  options: GetElementSizeOptions = {},
): GetElementSizeResult {
  const { paddding, margin, border, scrollbar, computedStyle = window.getComputedStyle(element) } = options,
    // border-boxで高さや幅が明示されていない場合はwidth,heightにpadding,border-widthを含むので補正が必要
    isBorderBox = computedStyle.boxSizing === 'border-box',
    correctWidth = isBorderBox && CORRECTION_TARGETS[element.style.width],
    correctHeight = isBorderBox && CORRECTION_TARGETS[element.style.height],
    width = parseFloat(computedStyle.width),
    height = parseFloat(computedStyle.height),
    paddingLeftRight = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight),
    paddingTopBottom = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom),
    borderLeftRight = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth),
    borderTopBottom = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth),
    // 補正が必要な場合は補正した値、必要ない場合はそのままの値
    size: GetElementSizeResult = {
      width: correctWidth ? width - paddingLeftRight - borderLeftRight : width,
      height: correctHeight ? height - paddingTopBottom - borderTopBottom : height,
    };

  if (paddding) {
    size.width += paddingLeftRight;
    size.height += paddingTopBottom;
  }

  if (margin) {
    size.width += parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight);
    size.height += parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
  }

  if (border) {
    size.width += borderLeftRight;
    size.height += borderTopBottom;
  }

  if (scrollbar) {
    size.width += element.offsetWidth - element.clientWidth - borderLeftRight;
    size.height += element.offsetHeight - element.clientHeight - borderTopBottom;
  }

  return size;
}
