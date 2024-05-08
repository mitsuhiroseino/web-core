import animateValue, { AnimateValueState, EXECUTION_STATUS } from 'src/utils/anim/animateValue';

import Execution from '../Execution';

/**
 * 許容誤差
 */
const MARGIN_OF_ERROR = 1.2;

describe('animateValue', () => {
  describe('default', () => {
    test('cancel', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        const cancel = animateValue(100, execution.setValue.bind(execution), { initialValue: 0 });
        setTimeout(() => {
          // 500ms後にキャンセル
          const result = cancel();
          resolve(result);
        }, 500);
      }).then((result) => {
        // キャンセル時のstateを検証
        expect(result.status).toBe(EXECUTION_STATUS.CANCELED);
        expect(execution.getTotalTime()).toBeGreaterThanOrEqual(500 / MARGIN_OF_ERROR);
        expect(execution.getTotalTime()).toBeLessThanOrEqual(500 * MARGIN_OF_ERROR);
      });
    });
  });

  describe('options', () => {
    test('calcValue', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateValue(100, execution.setValue.bind(execution), {
          initialValue: 0,
          iterationCount: 1,
          duration: 1000,
          calcValue: (value, state, options) => {
            execution.exec(state);
            return value * state.progress;
          },
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getTotalTime()).toBeGreaterThanOrEqual(1000 / MARGIN_OF_ERROR);
        expect(execution.getTotalTime()).toBeLessThanOrEqual(1000 * MARGIN_OF_ERROR);
        expect(execution.getFirstValue()).toBe(0);
        expect(execution.getLastValue()).toBe(100);
      });
    });
  });
});
