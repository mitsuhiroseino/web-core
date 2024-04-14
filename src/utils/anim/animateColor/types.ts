import { AnimateValueOptions } from '../animateValue';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * オプション
 */
export type AnimateColorOptions = Omit<AnimateValueOptions, 'calcValue'>;
