import animateColor, { EXECUTION_STATUS } from 'src/utils/anim/animateColor';
import { AnimateValueState } from 'src/utils/anim/animateValue';

import Execution from '../Execution';

describe('animateColor', () => {
  describe('default', () => {
    test('初期値なし', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateColor('rgba(255, 255, 255, 0.9)', execution.setValue.bind(execution), {
          initialValue: 'rgba(0, 0, 0, 0)',
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toBe('rgba(0,0,0,0)');
        expect(execution.getLastValue()).toBe('rgba(255,255,255,0.9)');
        expect(execution.getValues().length).toBeGreaterThan(2);
        expect(execution.getValues().some((color, i) => execution.getValue(i - 1) === color)).toBe(false);
      });
    });
  });

  describe('options', () => {
    test('initialValue', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateColor('rgba(255, 255, 255, 0.9)', execution.setValue.bind(execution), {
          initialValue: 'rgba(128, 64, 0, 0.5)',
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toBe('rgba(128,64,0,0.5)');
        expect(execution.getLastValue()).toBe('rgba(255,255,255,0.9)');
        expect(execution.getValues().length).toBeGreaterThan(2);
        expect(execution.getValues().some((color, i) => execution.getValue(i - 1) === color)).toBe(false);
      });
    });

    test('enableNoInitialValue', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateColor('rgba(255, 255, 255, 0.9)', execution.setValue.bind(execution), {
          enableNoInitialValue: true,
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toBe('rgba(0,0,0,0)');
        expect(execution.getLastValue()).toBe('rgba(255,255,255,0.9)');
        expect(execution.getValues().length).toBeGreaterThan(2);
        expect(execution.getValues().some((color, i) => execution.getValue(i - 1) === color)).toBe(false);
      });
    });
  });
});
