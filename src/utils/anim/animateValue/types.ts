import { RunWithProgressOptions, RunWithProgressState } from '../../function/runWithProgress';

export { DirectionType, ExecutionStatus } from '../../function/runWithProgress';

/**
 * アニメーション中のステート
 */
export type AnimateValueState = RunWithProgressState;

/**
 * オプション
 */
export type AnimateValueOptions<S extends AnimateValueState = AnimateValueState> = RunWithProgressOptions & {
  /**
   * 初期値
   */
  initialValue?: any | undefined;

  /**
   * 初期値がnull,undefinedの場合でもアニメーションする
   * ※ calcValueで初期値がない場合を想定した実装をする必要あり
   */
  enableNoInitialValue?: boolean;

  /**
   * アニメーション中の値を計算する関数
   * 未指定の場合は常に value を返す
   * @param value 値
   * @param state 状態
   * @param options オプション
   * @returns
   */
  calcValue?: (value: any, state: S, options: AnimateValueOptions) => any;

  /**
   * calcValue実行前処理
   * falseを返した場合はcalcValueの実行をスキップする
   * @param currentValue calcValueで算出した値
   * @param state 状態
   * @param options オプション
   * @returns
   */
  onCalcValue?: (currentValue: any, state: S, options: AnimateValueOptions) => void;
};
