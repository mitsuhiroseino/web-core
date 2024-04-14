import getAnyValue from '@visue/core/utils/collection/getAnyValue';
import getDiff2D from '@visue/core/utils/coord/getDiff2D';

import { AnimateValueState } from '../animateValue';
import { AnimatePositionOptions } from './types';

export { DIRECTION_TYPE, EXECUTION_STATUS } from '../animateValue';

export const GET_CALC_VALUE =
  (keyX: string = 'x', keyY: string = 'y', keysX: string | string[] = keyX, keysY: string | string[] = keyY) =>
  (value: any, state: AnimateValueState, options: AnimatePositionOptions) => {
    const { initialValue = { [keyX]: 0, [keyY]: 0 } } = options,
      diff = getDiff2D(
        initialValue,
        { [keyX]: getAnyValue(value, keysX), [keyY]: getAnyValue(value, keysY) },
        {
          keysX,
          keysY,
          keyX,
          keyY,
        },
      ),
      progress = state.progress;

    return {
      [keyX]: initialValue[keyX] + diff[keyX] * progress,
      [keyY]: initialValue[keyY] + diff[keyY] * progress,
    };
  };
