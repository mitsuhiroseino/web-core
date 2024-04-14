import { Color } from 'chroma-js';

import { AnimateFramesOptions } from '../animateFrames';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * オプション
 */
export type AnimateColorsOptions = Omit<AnimateFramesOptions, 'frames'> & {
  /**
   * 色の配列
   */
  colors?: (string | number | Color)[];
};
