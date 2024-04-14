import { CalcRatioValueOptions } from '@visue/core/utils/number/calcRatioValue';
import { GetItemByRatioOptions } from '@visue/core/utils/ratio/getItemByRatio';

import { AnimateValueOptions } from '../animateValue';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * オプション
 */
export type AnimateFramesOptions = Omit<AnimateValueOptions, 'calcValue'> &
  CalcRatioValueOptions &
  GetItemByRatioOptions & {
    /**
     * 戻り値候補
     */
    frames?: any[];

    /**
     * 値の最小値
     */
    minValue?: number;

    /**
     * 値の最大値
     */
    maxValue?: number;
  };
