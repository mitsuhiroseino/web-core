import clamp from '@visue/utils/number/clamp';
import getValidMinMax from '@visue/utils/number/getValidMinMax';

import animateValue from '../animateValue';
import { CALC_VALUE } from './constants';
import { AnimateFramesOptions } from './types';

/**
 * 範囲の指定された数値を基に、配列から対応する値を返しアニメーションを行う
 * @param value 数値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateFrames(
  value: number | undefined,
  setValue: (value: any | undefined) => void,
  options: AnimateFramesOptions = {},
) {
  const { frames = [], minValue = 0, maxValue = 1, initialValue = 0, ...rest } = options,
    [min, max] = getValidMinMax(minValue, maxValue),
    val = clamp(value || 0, min, max, { defaultValue: 0 }),
    initialVal = clamp(initialValue, min, max, { defaultValue: 0 });

  return animateValue(val, setValue, {
    calcValue: CALC_VALUE,
    ...rest,
    frames,
    initialValue: initialVal,
    minValue: min,
    maxValue: max,
  });
}
