// @scripts
import { round } from '../../util';

test('round', () => {
    const number = 1.999999;
    const roundedNumber = round(number, 2);
    const expectedNumber = 1.20;
    expect(roundedNumber).toEqual(expectedNumber);
});
