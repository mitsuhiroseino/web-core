import { AnimateValueOptions } from '../animateValue';
import { PATH_ANIMATION_TYPE } from './constants';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * パスのアニメーション種別
 */
export type PathAnimationType = (typeof PATH_ANIMATION_TYPE)[keyof typeof PATH_ANIMATION_TYPE];

/**
 * オプション
 */
export type AnimatePathOptions = Omit<AnimateValueOptions, 'calcValue'> & {
  /**
   * パスのアニメーション種別
   */
  pathAnimationType?: PathAnimationType;
};
