import animateValue from '../animateValue';
import { GET_CALC_VALUE_FNS } from './constants';
import { AnimatePathOptions } from './types';

const CALC_VALUE_FNS = GET_CALC_VALUE_FNS();

/**
 * 数値変更時のアニメーションを行う
 * @param value 数値
 * @param setValue アニメーション中の値を設定する為のセッター
 * @param options オプション
 */
export default function animatePath(
  value: any[] | undefined,
  setValue: (value: any[] | undefined) => void,
  options: AnimatePathOptions = {},
) {
  const { pathAnimationType = 'entire' } = options,
    calcValue = CALC_VALUE_FNS[pathAnimationType](value, options);
  return animateValue(value, setValue, { ...options, calcValue });
}
