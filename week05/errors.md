# Error Handling for Simple E-commerce API

## Standard Error Format
```json
{
  "error": {
    "code": 400,
    "message": "Description of the error."
  }
}
```


## Error Cases

### 1. 400 Bad Request (Invalid Input)
- **Example:** Creating a product with a negative price
- **Response:**
```json
{
  "error": {
    "code": 400,
    "message": "Price must be a positive number."
  }
}
```


### 2. 404 Not Found
- **Example:** Retrieving a product that does not exist
- **Response:**
```json
{
  "error": {
    "code": 404,
    "message": "Product not found."
  }
}
```


### 3. 409 Conflict
- **Example:** Adding an item to an order when the product is out of stock
- **Response:**
```json
{
  "error": {
    "code": 409,
    "message": "Product is out of stock."
  }
}
```
