console.info('Order processing program started.');

function calculateTotal(price, quantity) {
  console.info(`Calculating total for price: $${price}, quantity: ${quantity}`);
  return price * quantity;
}

function applyDiscount(total) {
  const discount = 10; // Define the discount value
  if (total > 100) {
    console.warn(`Discount applied: $${discount} off total $${total}`);
    return total - discount;
      // ERROR TYPE: ReferenceError
      // LINE NUMBER: 7
      // ROOT CAUSE: 'discount' is not defined anywhere in the code, so JavaScript throws a ReferenceError when trying to use it.
  } else {
    console.info('No discount applied.');
  }
  return total;
}

function processOrder(price, quantity) {
  if (price < 0 || quantity < 0) {
    console.error('Invalid input: price and quantity must be non-negative.');
    throw new Error('Invalid input: price and quantity must be non-negative.');
  }
  const total = calculateTotal(price, quantity);
  console.info(`Total calculated: $${total}`);
  const discounted = applyDiscount(total);
  const result = discounted.toFixed(2);
  console.info(`Final result after discount (if any): $${result}`);
  return result;
}

 

module.exports = {
  calculateTotal,
  applyDiscount,
  processOrder
};
 

console.log(processOrder(25, 5));

