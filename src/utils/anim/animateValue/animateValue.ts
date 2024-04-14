import noop from 'lodash/noop';

import runWithProgress from '../../function/runWithProgress';
import { AnimateValueOptions } from './types';

/**
 * 値のアニメーションを行う
 * @param value 値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animateValue<O extends AnimateValueOptions = AnimateValueOptions>(
  value: any | undefined,
  setValue: (value: any | undefined) => void,
  options: O = {} as O,
) {
  const { initialValue, enableNoInitialValue, onCalcValue = noop, ...opts } = options;
  if (value != null && (enableNoInitialValue || initialValue != null)) {
    const { calcValue = (value) => value, ...rest } = opts;
    // アニメーション開始
    return runWithProgress((state) => {
      // アニメーション中の値更新
      const calcValueOpts = { ...rest, initialValue },
        currentValue = calcValue(value, state, calcValueOpts);
      setValue(currentValue);
      onCalcValue(currentValue, state, calcValueOpts);
    }, rest);
  } else {
    // 以下の何れかの場合はアニメーションなし
    // - 値がnull,undefined
    // - 初期値がnull,undefined & 初期値なしの場合はアニメーションしない
    const cancel = runWithProgress(() => {
      setValue(value);
      cancel();
    });
    return cancel;
  }
}
