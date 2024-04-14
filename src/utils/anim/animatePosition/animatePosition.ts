import animateValue from '../animateValue';
import { GET_CALC_VALUE } from './constants';
import { AnimatePositionOptions } from './types';

const CALC_VALUE_FNS = GET_CALC_VALUE();

/**
 * 位置変更時のアニメーションを行う
 * @param value 数値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animatePosition(
  value: any | undefined,
  setValue: (value: any | undefined) => void,
  options: AnimatePositionOptions = {},
) {
  return animateValue(value, setValue, { ...options, calcValue: CALC_VALUE_FNS });
}
