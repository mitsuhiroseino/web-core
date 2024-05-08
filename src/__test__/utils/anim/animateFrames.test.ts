import animateFrames, { EXECUTION_STATUS } from 'src/utils/anim/animateFrames';
import { AnimateValueState } from 'src/utils/anim/animateValue';

import Execution from '../Execution';

describe('animateFrames', () => {
  const frames = [
    // 0
    { value: 0 },
    // 0.2
    { value: 20 },
    // 0.4
    { value: 40 },
    // 0.6
    { value: 60 },
    // 0.8
    { value: 80 },
    // 1
    { value: 100 },
  ];
  describe('default', () => {
    test('0 -> 1', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(1, execution.setValue.bind(execution), {
          frames,
          initialValue: 0,
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 0 });
        expect(execution.getLastValue()).toEqual({ value: 100 });
        for (const frame of execution.getValues()) {
          expect(frames).toContainEqual(frame);
        }
      });
    });

    test('0.2 -> 0.8', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(0.8, execution.setValue.bind(execution), {
          frames,
          initialValue: 0.2,
          iterationCount: 1,
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 20 });
        expect(execution.getLastValue()).toEqual({ value: 80 });
        for (const frame of execution.getValues()) {
          expect(frames).toContainEqual(frame);
        }
      });
    });
  });

  describe('options', () => {
    test('minValue=100, maxValue=200', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(200, execution.setValue.bind(execution), {
          frames,
          initialValue: 100,
          iterationCount: 1,
          minValue: 100,
          maxValue: 200,
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 0 });
        expect(execution.getLastValue()).toEqual({ value: 100 });
        for (const frame of execution.getValues()) {
          expect(frames).toContainEqual(frame);
        }
      });
    });

    test('minValue=-128, maxValue=128', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(-64, execution.setValue.bind(execution), {
          frames,
          initialValue: 64,
          iterationCount: 1,
          minValue: -128,
          maxValue: 128,
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 60 });
        expect(execution.getLastValue()).toEqual({ value: 20 });
        for (const frame of execution.getValues()) {
          expect(frames).toContainEqual(frame);
        }
      });
    });

    test('interpolation', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(1, execution.setValue.bind(execution), {
          frames,
          initialValue: 0,
          iterationCount: 1,
          interpolation: true,
          calcSum: (value0: any, value1: any) => ({ value: value0.value + value1.value }),
          calcDifference: (start: any, end: any) => ({ value: end.value - start.value }),
          calcProduct: (value: any, multiplier: number) => ({ value: value.value * multiplier }),
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 0 });
        expect(execution.getLastValue()).toEqual({ value: 100 });
        // 0,20,40,60,80,100以外の値がある＝補完されている
        expect(execution.getValues().some((frame) => frame.value % 20 !== 0)).toBe(true);
      });
    });

    test('interpolation, minValue=100, maxValue=200', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(200, execution.setValue.bind(execution), {
          frames,
          initialValue: 100,
          iterationCount: 1,
          minValue: 100,
          maxValue: 200,
          interpolation: true,
          calcSum: (value0: any, value1: any) => ({ value: value0.value + value1.value }),
          calcDifference: (start: any, end: any) => ({ value: end.value - start.value }),
          calcProduct: (value: any, multiplier: number) => ({ value: value.value * multiplier }),
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 0 });
        expect(execution.getLastValue()).toEqual({ value: 100 });
        // 0,20,40,60,80,100以外の値がある＝補完されている
        expect(execution.getValues().some((frame) => frame.value % 20 !== 0)).toBe(true);
      });
    });

    test('interpolation, minValue=-128, maxValue=128', () => {
      const execution = new Execution();
      return new Promise<AnimateValueState>((resolve) => {
        execution.start();
        animateFrames(-64, execution.setValue.bind(execution), {
          frames,
          initialValue: 64,
          iterationCount: 1,
          minValue: -128,
          maxValue: 128,
          interpolation: true,
          calcSum: (value0: any, value1: any) => ({ value: value0.value + value1.value }),
          calcDifference: (start: any, end: any) => ({ value: end.value - start.value }),
          calcProduct: (value: any, multiplier: number) => ({ value: value.value * multiplier }),
          onComplete: (state) => {
            resolve(state);
          },
          onCalcValue: execution.onCalcValue.bind(execution),
        });
      }).then((result) => {
        expect(result.status).toBe(EXECUTION_STATUS.COMPLETED);
        expect(execution.getFirstValue()).toEqual({ value: 75 });
        expect(execution.getLastValue()).toEqual({ value: 25 });
        // 0,20,40,60,80,100以外の値がある＝補完されている
        expect(execution.getValues().some((frame) => frame.value % 20 !== 0)).toBe(true);
      });
    });
  });
});
