import './style.css';
import { StyleScrollbarOptions } from './types';

export default function styleScrollbar(options: StyleScrollbarOptions = {}) {
  const {
    thumbColor = 'rgba(0, 0, 0, 0.1)',
    trackColor = 'rgba(0, 0, 0, 0.02)',
    hoverThumbColor = 'rgba(0, 0, 0, 0.5)',
    hoverTrackColor = 'rgba(0, 0, 0, 0.05)',
  } = options;

  return {
    '--thumb-color': thumbColor,
    '--track-color': trackColor,

    '@supports not (selector(::-webkit-scrollbar))': {
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--thumb-color) var(--track-color)',
      transition: 'scrollbar-color .5s',
    },

    transition: '--thumb-color .5s, --track-color .5s',

    '&::-webkit-scrollbar': {
      height: 11,
      width: 11,
    },

    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'var(--track-color)',
      cursor: 'pointer',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--thumb-color)',
      border: 'solid 2px transparent',
      borderRadius: 8,
      backgroundClip: 'content-box',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'var(--track-color)',
    },

    '&:hover': {
      '--thumb-color': hoverThumbColor,
      '--track-color': hoverTrackColor,
    },
  };
}
