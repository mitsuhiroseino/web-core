import format from '@visue/utils/number/format';

import animateValue from '../animateValue';
import { CALC_VALUE } from './constants';
import { AnimateNumberOptions } from './types';

/**
 * 数値変更時のアニメーションを行う
 * @param value 数値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateNumber(
  value: number | undefined,
  setValue: (value: any | null | undefined) => void,
  options: AnimateNumberOptions = {},
) {
  const { formatOptions, ...rest } = options,
    setNum = formatOptions == null ? setValue : (currentValue: number) => setValue(format(currentValue, formatOptions));
  return animateValue(value, setNum, { ...rest, calcValue: CALC_VALUE });
}
