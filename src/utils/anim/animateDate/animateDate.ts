import format from '@visue/utils/date/format';

import animateValue from '../animateValue';
import { CALC_VALUE } from './constants';
import { AnimateDateOptions } from './types';

/**
 * 日付変更時のアニメーションを行う
 * @param value 日付
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateNumber(
  value: Date | undefined,
  setValue: (value: any | null | undefined) => void,
  options: AnimateDateOptions = {},
) {
  const { formatOptions, ...rest } = options,
    setNum = formatOptions == null ? setValue : (currentValue: Date) => setValue(format(currentValue, formatOptions));
  return animateValue(value, setNum, { ...rest, calcValue: CALC_VALUE });
}
