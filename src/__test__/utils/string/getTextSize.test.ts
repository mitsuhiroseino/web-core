import getTextSize from 'src/utils/string/getTextSize';

describe('getTextSize', () => {
  describe('default', () => {
    test('初期値なし', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      const result = getTextSize('abcdefg', element);
      element.remove();
      expect(result).toEqual({ width: 0, height: 0 });
    });
  });
});
