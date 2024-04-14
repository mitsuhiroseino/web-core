import { RunWithProgressState } from 'src/utils/function/runWithProgress';

/**
 * progress毎の実行回数をカウントするクラス
 */
class Execution {
  private _progressies: any = {};

  private _linearProgressies: any = {};

  private _startTime: number = 0;

  private _totalTime: number = 0;

  private _firstTime: number = 0;

  private _values: any[] = [];

  private _valueAndProgress: any[] = [];

  /**
   * 処理の開始
   */
  start() {
    this._startTime = performance.now();
  }

  /**
   * コールバックの実行
   * @param state
   * @returns
   */
  exec(state: RunWithProgressState) {
    const progressCount = this._progressies[state.progress] || 0;
    this._progressies[state.progress] = progressCount + 1;

    const linearProgressCount = this._linearProgressies[state.linearProgress] || 0;
    this._linearProgressies[state.linearProgress] = linearProgressCount + 1;

    if (this._firstTime === 0) {
      this._firstTime = performance.now() - this._startTime;
    }

    this._totalTime = performance.now() - this._startTime;

    return this._totalTime;
  }

  setValue(value: any) {
    this._values.push(value);
    this._totalTime = performance.now() - this._startTime;
    return this._totalTime;
  }

  onCalcValue(value: any, state: RunWithProgressState, options: any) {
    this._valueAndProgress.push({ progress: state.progress, value });
    this._totalTime = performance.now() - this._startTime;
    return true;
  }

  /**
   * 進捗割合に対応する値を取得
   * @param progress
   * @returns
   */
  get(progress: number) {
    return this._progressies[progress] || 0;
  }

  /**
   * 線形進捗割合に対応する値を取得
   * @param progress
   * @returns
   */
  getLinear(progress: number) {
    return this._linearProgressies[progress] || 0;
  }

  /**
   * 進捗割合に対応する値を全て取得
   * @returns
   */
  getProgressies() {
    return this._progressies;
  }

  /**
   * 線形進捗割合に対応する値を全て取得
   * @returns
   */
  getLinearProgressies() {
    return this._linearProgressies;
  }

  /**
   * 1回目を実行するまでに要した時間
   * @returns
   */
  getFirstTime() {
    return this._firstTime;
  }

  /**
   * 全て完了するまでに要した時間を取得
   * @returns
   */
  getTotalTime() {
    return this._totalTime;
  }

  /**
   * 値をすべて取得
   * @returns
   */
  getValues() {
    return this._values;
  }

  /**
   * 値を取得
   * @returns
   */
  getValue(index: number) {
    return this._values[index];
  }

  /**
   * 最初の値を取得
   * @returns
   */
  getFirstValue() {
    return this._values[0];
  }

  /**
   * 最後の値を取得
   * @returns
   */
  getLastValue() {
    return this._values[this._values.length - 1];
  }

  getValueAndProgress() {
    return this._valueAndProgress;
  }
}
export default Execution;
