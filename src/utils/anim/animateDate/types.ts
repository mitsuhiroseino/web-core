import { CalcRatioValueOptions } from '@visue/utils/date/calcRatioValue';
import { FormatOptions } from '@visue/utils/date/format';

import { AnimateValueOptions } from '../animateValue';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * オプション
 */
export type AnimateDateOptions = Omit<AnimateValueOptions, 'calcValue'> &
  CalcRatioValueOptions & {
    /**
     * 日付型のフォーマットオプション
     * 指定されている場合、setValueに渡される値は文字列
     */
    formatOptions?: FormatOptions;
  };
