import calcRatioValue from '@visue/utils/string/calcRatioValue';

import { AnimateValueOptions, AnimateValueState } from '../animateValue';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * 文字列アニメーション用の値算出関数
 * @param value 値
 * @param state アニメーションの状態
 * @param options オプション
 * @returns
 */
export const CALC_VALUE = (value: string, state: AnimateValueState, options: AnimateValueOptions) => {
  return calcRatioValue(value, state.progress, options);
};
