import convertRatio from '@visue/core/utils/ratio/convertRatio';
import getItemByRatio from '@visue/core/utils/ratio/getItemByRatio';

import { AnimateValueState } from '../animateValue';
import { AnimateFramesOptions } from './types';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * コマ撮りアニメーション用の値算出関数
 * @param value 値
 * @param state アニメーションの状態
 * @param options オプション
 * @returns
 */
export const CALC_VALUE = (value: number, state: AnimateValueState, options: AnimateFramesOptions) => {
  // 例:
  // value(*)が84、initialValue(#)が34、
  // framesが0～10の11要素、
  // minValueが0、maxValueが100、
  // progress(?)が0.4の場合
  //
  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+----+----+----+-*--+----+
  //   0                                                 100
  //                    0                        1
  //                    |=========?==============|
  const {
      initialValue = 0,
      frames = [],
      minValue = 0,
      maxValue = 1,
      interpolation,
      calcSum,
      calcDifference,
      calcProduct,
      interpolateValue,
    } = options,
    //   0    1    2    3    4    5    6    7    8    9    10
    //   +----+----+----+-#--+----+----+----+----+-*--+----+
    //                    0                        1
    //                    |=========?==============|
    //                    progress(?)はこの範囲を0～1として遷移しているので、
    //   0                                                 1
    //   |==========================!======================|
    //   この範囲を0～1として考えた場合のratio(!)はいくつになるのかを算出
    ratio = convertRatio(minValue, maxValue, initialValue, value, state.progress);

  //   0    1    2    3    4    5    6    7    8    9    10
  //   +----+----+----+-#--+----+-x--+----+----+-*--+----+
  //   0                                                 1
  //   |==========================!======================|
  //                              この位置に当たる要素を算出して返す
  return getItemByRatio(frames, ratio, {
    interpolation,
    calcSum,
    calcDifference,
    calcProduct,
    interpolateValue,
  })[0];
};
