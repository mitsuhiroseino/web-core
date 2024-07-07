import getPathByRatio, { GetPathByRatioOptions, GetPathByRatioResult } from '@visue/utils/coord/getPathByRatio';
import getPointByRatio, {
  GetPointByRatioInput,
  GetPointByRatioOptions,
  GetPointByRatioResult,
} from '@visue/utils/coord/getPointByRatio';

import { AnimateValueState } from '../animateValue';
import { AnimatePathOptions } from './types';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

/**
 * アニメーションする対象
 */
export const PATH_ANIMATION_TYPE = {
  /**
   * パス全体のアニメーション
   */
  ENTIRE: 'entire',

  /**
   * 前回との差分のみアニメーション
   */
  DIFFERENCE: 'difference',

  /**
   * 最後の1っ前から最後の点までのみアニメーション
   */
  LATEST: 'latest',
} as const;

/**
 * パスアニメーション用の関数を取得する
 * @param getPointByRatioFn パスとパス全体の長さに対する割合から、対象の位置を取得する関数
 * @param getPathByRatioFn パスとパス全体の長さに対する割合から、対象の位置までのパスを取得する関数
 * @returns
 */
export const GET_CALC_VALUE_FNS = (
  getPointByRatioFn: (
    path: GetPointByRatioInput[],
    ratio: number,
    options?: GetPointByRatioOptions,
  ) => GetPointByRatioResult = getPointByRatio,
  getPathByRatioFn: (
    path: any[],
    rate: number,
    options?: GetPathByRatioOptions,
  ) => GetPathByRatioResult[] = getPathByRatio,
) =>
  ({
    [PATH_ANIMATION_TYPE.ENTIRE]: (path: any[] = [], options: AnimatePathOptions) => {
      // 全体をアニメーション
      return (value: any[], state: AnimateValueState, opts: AnimatePathOptions) => {
        return getPathByRatioFn(path, state.progress);
      };
    },
    [PATH_ANIMATION_TYPE.LATEST]: (path: any[] = [], options: AnimatePathOptions) => {
      // 最後の1つ前から最後の点までのみアニメーション
      const lastIndex = path.length - 1,
        previous = path[lastIndex - 1],
        latest = path[lastIndex],
        newPath = path.slice(0, lastIndex);

      return (value: any[], state: AnimateValueState, opts: AnimatePathOptions) => {
        const end = getPointByRatioFn([{ ...previous }, { ...latest }], state.progress);
        return newPath.concat([end]);
      };
    },
    [PATH_ANIMATION_TYPE.DIFFERENCE]: (path: any[] = [], options: AnimatePathOptions) => {
      // 旧パスと新パスの差分をアニメーションで描画
      const { initialValue = [] } = options,
        pathDiff = path.slice(initialValue.length);

      return (value: any[], state: AnimateValueState, opts: AnimatePathOptions) => {
        const updatedPath = getPathByRatioFn(pathDiff, state.progress);
        return initialValue.concat(updatedPath as any[]);
      };
    },
  }) as const;
