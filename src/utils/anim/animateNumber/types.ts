import { CalcRatioValueOptions } from '@visue/utils/number/calcRatioValue';
import { FormatOptions } from '@visue/utils/number/format';

import { AnimateValueOptions } from '../animateValue';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * オプション
 */
export type AnimateNumberOptions = Omit<AnimateValueOptions, 'calcValue'> &
  CalcRatioValueOptions & {
    /**
     * 数値のフォーマットオプション
     * 指定されている場合、setValueに渡される値は文字列
     */
    formatOptions?: FormatOptions;
  };
