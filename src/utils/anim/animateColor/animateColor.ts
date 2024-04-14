import animateValue from '../animateValue';
import { CALC_VALUE } from './constants';
import { AnimateColorOptions } from './types';

/**
 * 色変更時のアニメーションを行う
 * @param value 数値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateColor(
  value: any | undefined,
  setValue: (value: any | undefined) => void,
  options: AnimateColorOptions = {},
) {
  return animateValue(value, setValue, { ...options, calcValue: CALC_VALUE });
}
