import animateNumber, { AnimateNumberOptions, EXECUTION_STATUS } from 'src/utils/anim/animateNumber';
import { AnimateValueState } from 'src/utils/anim/animateValue';

import Execution from '../Execution';

/**
 * 許容誤差
 */
const MARGIN_OF_ERROR = 1.2;

describe('animateNumber', () => {
  describe('default', () => {
    test('初期値なし', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateNumber(100, execution.setValue.bind(execution), {
          initialValue: 0,
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toBe(0);
        expect(execution.getLastValue()).toBe(100);
      });
    });
  });

  describe('options', () => {
    test('initialValue', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateNumber(100, execution.setValue.bind(execution), {
          initialValue: 50,
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toBe(50);
        expect(execution.getLastValue()).toBe(100);
      });
    });

    test('enableNoInitialValue', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateNumber(100, execution.setValue.bind(execution), {
          enableNoInitialValue: true,
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toBe(0);
        expect(execution.getLastValue()).toBe(100);
      });
    });
  });
});
