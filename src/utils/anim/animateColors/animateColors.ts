import Chroma from 'chroma-js';

import animateFrames from '../animateFrames';
import { AnimateColorsOptions } from './types';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * 値に応じた色のアニメーションを行う
 * @param value 数値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateColors(
  value: number | undefined,
  setValue: (value: any | undefined) => void,
  options: AnimateColorsOptions = {},
) {
  const { colors = [], ...rest } = options;
  return animateFrames(value, setValue, {
    ...rest,
    frames: colors,
    interpolateValue: (frames: any[], ratio: number, options: AnimateColorsOptions) => {
      return Chroma.scale(frames)(ratio).css();
    },
  });
}
