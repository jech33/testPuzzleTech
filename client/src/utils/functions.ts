/**
 * The function formats a given amount of money in either USD, EUR, or HNL currency, with the option to
 * convert the amount to a different currency.
 * @param {number} amount - a number representing the amount of money to be formatted
 * @param {'USD' | 'EUR' | 'HNL'} currency - The currency parameter is a string that specifies the
 * currency type for which the amount needs to be formatted. It can take one of the three values:
 * 'USD', 'EUR', or 'HNL'.
 * @returns The `formatCurrency` function returns a formatted string representing the given `amount` in
 * the specified `currency`. The string includes the currency symbol and the appropriate formatting
 * based on the user's locale. The `amount` is transformed based on the `currency` parameter before
 * being formatted.
 */

export const formatCurrency = (amount: number, currency: 'USD' | 'EUR' | 'HNL') => {
  let transformedAmount = amount;
  switch (currency) {
    case 'HNL':
      transformedAmount = amount * 24;
      break;
    case 'EUR':
      transformedAmount = amount * 1.07;
      break;
    default:
      break;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })
    .format(transformedAmount)
    .replace('HNL', 'L');
};
