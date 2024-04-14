import animateValue from '../animateValue';
import { CALC_VALUE } from './constants';
import { AnimateStringOptions } from './types';

/**
 * 文字列変更時のアニメーションを行う
 * @param value 文字列
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateNumber(
  value: string | undefined,
  setValue: (value: string | undefined) => void,
  options: AnimateStringOptions = {},
) {
  return animateValue(value, setValue, { ...options, calcValue: CALC_VALUE });
}
