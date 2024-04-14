import calcRatioValue from '@visue/core/utils/date/calcRatioValue';

import { AnimateValueOptions, AnimateValueState } from '../animateValue';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * 日付アニメーション用の値算出関数
 * @param value 値
 * @param oldValue 更新前の値
 * @param state アニメーションの状態
 * @returns
 */
export const CALC_VALUE = (value: Date, state: AnimateValueState, options: AnimateValueOptions) => {
  return calcRatioValue(value, state.progress, options);
};
