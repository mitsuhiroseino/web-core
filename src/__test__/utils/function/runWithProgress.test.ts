import runWithProgress, { EXECUTION_STATUS, RunWithProgressState } from 'src/utils/function/runWithProgress';

import Execution from '../Execution';

/**
 * 許容誤差
 */
const MARGIN_OF_ERROR = 1.4;

describe('runWithProgress', () => {
  describe('default', () => {
    test('cancel', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        execution.start();
        const cancel = runWithProgress((state) => {
          if (execution.exec(state) > 1000) {
            throw new Error('1000ms!!!');
          }
        });
        setTimeout(() => {
          // 500ms後にキャンセル
          const result = cancel();
          resolve(result);
        }, 500);
      }).then((result) => {
        // キャンセル時のstateを検証
        expect(execution.getTotalTime()).toBeLessThanOrEqual(500 * MARGIN_OF_ERROR);
        expect(result.status).toBe(EXECUTION_STATUS.CANCELED);
      });
    });

    test('return false', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        execution.start();
        runWithProgress(
          (state) => {
            execution.exec(state);
            if (execution.getTotalTime() > 1000) {
              throw new Error('1000ms!!!');
            } else if (execution.getTotalTime() > 500) {
              return false;
            }
          },
          { onCancel: (state) => resolve(state) },
        );
      }).then((result) => {
        // キャンセル時のstateを検証
        expect(execution.getTotalTime()).toBeLessThanOrEqual(500 * MARGIN_OF_ERROR);
        expect(result.status).toBe(EXECUTION_STATUS.CANCELED);
      });
    });
  });

  describe('options', () => {
    test('onComplete', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        execution.start();
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          { duration: 300, iterationCount: 1, onComplete: (state) => resolve(state) },
        );
      }).then((state) => {
        expect(execution.get(0)).toBe(1);
        expect(execution.get(1)).toBe(1);
        expect(execution.getTotalTime()).toBeLessThanOrEqual(300 * MARGIN_OF_ERROR);
      });
    });

    test('duration', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        execution.start();
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          { duration: 1000, iterationCount: 1, onComplete: (state) => resolve(state) },
        );
      }).then((state) => {
        const result = execution.getTotalTime();
        expect(result).toBeGreaterThanOrEqual(1000);
        expect(result).toBeLessThanOrEqual(1000 * MARGIN_OF_ERROR);
      });
    });

    test('duration & iterationCount', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        execution.start();
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          { duration: 1000, iterationCount: 2, onComplete: (state) => resolve(state) },
        );
      }).then((state) => {
        const result = execution.getTotalTime();
        expect(result).toBeGreaterThanOrEqual(2000);
        expect(result).toBeLessThanOrEqual(2000 * MARGIN_OF_ERROR);
        expect(execution.get(0)).toBe(2);
        expect(execution.get(1)).toBe(2);
      });
    });

    test('delay', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        execution.start();
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          {
            delay: 1000,
            duration: 100,
            iterationCount: 1,
            onComplete: (state) => resolve(state),
          },
        );
      }).then((state) => {
        const totalTime = execution.getTotalTime(),
          firstTime = execution.getFirstTime();
        expect(totalTime).toBeGreaterThanOrEqual(1100);
        expect(totalTime).toBeLessThanOrEqual(1100 * MARGIN_OF_ERROR);
        expect(firstTime).toBeGreaterThanOrEqual(1000);
        expect(firstTime).toBeLessThanOrEqual(1000 * MARGIN_OF_ERROR);
      });
    });

    test('not timingFunction', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          { duration: 100, iterationCount: 1, onComplete: (state) => resolve(state) },
        );
      }).then((result) => {
        expect(result.progress).toBe(1);
        expect(result.linearProgress).toBe(1);
        expect(execution.getProgressies()).toEqual(execution.getLinearProgressies());
      });
    });

    test('timingFunction', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          { timingFunction: 'easeInBack', duration: 100, iterationCount: 1, onComplete: (state) => resolve(state) },
        );
      }).then((result) => {
        expect(result.progress).toBe(1);
        expect(result.linearProgress).toBe(1);
        expect(execution.getProgressies()).not.toEqual(execution.getLinearProgressies());
      });
    });

    test('timingFunction(custom)', () => {
      const execution = new Execution();
      return new Promise<RunWithProgressState>((resolve) => {
        runWithProgress(
          (state) => {
            execution.exec(state);
          },
          {
            timingFunction: (rate: number) => (rate === 1 ? 1 : rate * 2),
            duration: 100,
            iterationCount: 1,
            onComplete: (state) => resolve(state),
          },
        );
      }).then((result) => {
        expect(result.progress).toBe(1);
        expect(result.linearProgress).toBe(1);
        expect(execution.getProgressies()).not.toEqual(execution.getLinearProgressies());
      });
    });
  });
});
