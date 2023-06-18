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

import { CartProduct } from '../store/projectStore.types';

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

/**
 * The function calculates the total amount with tax included based on the given amount and tax
 * percentage.
 * @param {number} amount - The amount is a number that represents the total cost of a product or
 * service before tax is applied.
 * @param {number} tax - The "tax" parameter is a number representing the tax rate as a decimal value.
 * For example, if the tax rate is 8%, the value of the "tax" parameter would be 0.08.
 * @returns The function `calculateTotalWithTax` returns the total amount including tax, which is
 * calculated by adding the original amount to the product of the original amount and the tax rate.
 */
export const calculateTotalWithTax = (amount: number, tax: number) => {
  return amount + amount * tax;
};

/**
 * This TypeScript function calculates the total cost of products in a shopping cart.
 * @param {CartProduct[]} cartProducts - The `cartProducts` parameter is an array of objects
 * representing the products in a shopping cart. Each object in the array has two properties: `price`
 * (the price of the product) and `quantity` (the quantity of the product in the cart). The function
 * `calculateTotal` calculates the
 * @returns The function `calculateTotal` is returning the total cost of all the products in the cart,
 * which is calculated by multiplying the price of each product by its quantity and then adding up all
 * the resulting values. The function uses the `reduce` method to iterate over the `cartProducts` array
 * and accumulate the total cost. The initial value of the accumulator is set to 0.
 */
export const calculateTotal = (cartProducts: CartProduct[]) => {
  return cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};

/**
 * This TypeScript function calculates the total quantity of products in a shopping cart.
 * @param {CartProduct[]} cartProducts - An array of objects representing products in a shopping cart.
 * Each object should have a "quantity" property indicating the number of that product in the cart.
 * @returns The function `calculateTotalQuantity` is returning the total quantity of all products in
 * the cart, which is calculated by using the `reduce` method to iterate over the `cartProducts` array
 * and summing up the `quantity` property of each `CartProduct` object. The initial value of the
 * accumulator is set to 0.
 */
export const calculateTotalQuantity = (cartProducts: CartProduct[]) => {
  return cartProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
};
