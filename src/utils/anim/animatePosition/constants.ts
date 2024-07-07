import getAnyValue from '@visue/utils/collection/getAnyValue';
import getDiff2D from '@visue/utils/coord/getDiff2D';

import { AnimateValueState } from '../animateValue';
import { AnimatePositionOptions } from './types';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

export const GET_CALC_VALUE =
  (xKey: string = 'x', yKey: string = 'y', xKeys: string | string[] = xKey, yKeys: string | string[] = yKey) =>
  (value: any, state: AnimateValueState, options: AnimatePositionOptions) => {
    const { initialValue = { [xKey]: 0, [yKey]: 0 } } = options,
      diff = getDiff2D(
        initialValue,
        { [xKey]: getAnyValue(value, xKeys), [yKey]: getAnyValue(value, yKeys) },
        {
          xKeys,
          yKeys,
          xKey,
          yKey,
        },
      ),
      progress = state.progress;

    return {
      [xKey]: initialValue[xKey] + diff[xKey] * progress,
      [yKey]: initialValue[yKey] + diff[yKey] * progress,
    };
  };
