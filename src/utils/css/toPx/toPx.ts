import isNumber from 'lodash/isNumber';

export default function toPx(value: number | string): string {
  return isNumber(value) ? `${value}px` : value;
}
