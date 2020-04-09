/**
 * Rounds a number with the given decimals.
 * @param {number} number
 * @param {number} decimals
 */
export const round = (number, decimals) =>
    Math.round(number * (10 ** decimals)) / (10 ** decimals);
