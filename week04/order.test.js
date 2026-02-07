test("no discount applied when total is less than or equal to 100", () => {
  // Arrange
  const price = 20;
  const quantity = 5;
  const expected = (100).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("discount not applied for total exactly 100", () => {
  // Arrange
  const price = 50;
  const quantity = 2;
  const expected = (100).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});

test("throws error for negative price", () => {
  // Arrange
  const price = -10;
  const quantity = 5;

  // Act & Assert
  expect(() => processOrder(price, quantity)).toThrow("Invalid input: price and quantity must be non-negative.");
});

test("throws error for negative quantity", () => {
  // Arrange
  const price = 10;
  const quantity = -5;

  // Act & Assert
  expect(() => processOrder(price, quantity)).toThrow("Invalid input: price and quantity must be non-negative.");
});
const { processOrder } = require("./order");

test("applies discount when total is greater than 100", () => {
  // Arrange
  const price = 25;
  const quantity = 5;
  const expected = (115).toFixed(2);

  // Act
  const result = processOrder(price, quantity);

  // Assert
  expect(result).toBe(expected);
});
