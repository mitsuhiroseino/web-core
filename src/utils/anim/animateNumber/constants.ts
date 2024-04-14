import calcRatioValue from '@visue/core/utils/number/calcRatioValue';

import { AnimateValueOptions, AnimateValueState } from '../animateValue';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * 数値アニメーション用の値算出関数
 * @param value 値
 * @param state アニメーションの状態
 * @param options オプション
 * @returns
 */
export const CALC_VALUE = (value: number, state: AnimateValueState, options: AnimateValueOptions) => {
  return calcRatioValue(value, state.progress, options);
};
