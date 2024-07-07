import { CalcRatioValueOptions } from '@visue/utils/string/calcRatioValue';

import { AnimateValueOptions } from '../animateValue';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * オプション
 */
export type AnimateStringOptions = Omit<AnimateValueOptions, 'calcValue'> & CalcRatioValueOptions;
