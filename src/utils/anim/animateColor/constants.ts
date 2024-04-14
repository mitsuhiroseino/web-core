import Chroma from 'chroma-js';

import { AnimateValueOptions, AnimateValueState } from '../animateValue';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * 色アニメーション用の値算出関数
 * @param value 値
 * @param state アニメーションの状態
 * @param options オプション
 * @returns
 */
export const CALC_VALUE = (value: any, state: AnimateValueState, options: AnimateValueOptions) => {
  const { initialValue = [0, 0, 0, 0], ...rest } = options,
    initialColor = Chroma(initialValue),
    color = Chroma(value);
  return Chroma.scale([initialColor, color])(state.progress).css();
};
