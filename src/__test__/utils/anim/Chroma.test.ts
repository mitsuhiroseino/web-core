import Chroma from 'chroma-js';

describe('chroma-js', () => {
  test('rgba', () => {
    const color = Chroma('rgba(255, 0, 110, 0.8)');
    console.log(color.rgba());
    console.log(color.hex());
    expect(0).toBe(0);
  });

  test('rgba (object)', () => {
    const color = Chroma([255, 0, 110, 0.8]);
    console.log(color.rgba());
    console.log(color.hex());
    expect(0).toBe(0);
  });

  test('hex', () => {
    const color = Chroma('#FF006E');
    console.log(color.rgba());
    console.log(color.hex());
    expect(0).toBe(0);
  });

  test('scale', () => {
    console.log(Chroma.scale(['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'])(0.3).rgba());
    expect(0).toBe(0);
  });
});
