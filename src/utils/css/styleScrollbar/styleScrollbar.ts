import { css } from '@emotion/css';
import './style.scss';
import { StyleScrollbarOptions } from './types';

/**
 * スクロールバーのスタイルを適用するクラスを返す
 * @param options
 * @returns
 */
export default function styleScrollbar(options: StyleScrollbarOptions = {}): string {
  const {
    thumbColor = 'rgba(0, 0, 0, 0.1)',
    trackColor = 'rgba(0, 0, 0, 0)',
    hoverThumbColor = 'rgba(0, 0, 0, 0.5)',
    hoverTrackColor = 'rgba(0, 0, 0, 0.02)',
  } = options;

  return css({
    '&.ss-scrollbar': {
      '--thumb-color': thumbColor,
      '--track-color': trackColor,

      '&:hover': {
        '--thumb-color': hoverThumbColor,
        '--track-color': hoverTrackColor,
      },
    },
  });
}
