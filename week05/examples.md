# Example Requests & Responses for Simple E-commerce API


## 1. Create a New Product
**POST /products**

Request:
```json
{
  "name": "Wireless Mouse",
  "price": 29.99,
  "stock": 100
}
```

Response (201 Created):
```json
{
  "id": "p123",
  "name": "Wireless Mouse",
  "price": 29.99,
  "stock": 100
}
```


## 2. Get a Single Order
**GET /orders/o456**

Response (200 OK):
```json
{
  "id": "o456",
  "userId": "u789",
  "status": "processing",
  "items": [
    { "itemId": "i1", "productId": "p123", "quantity": 2 }
  ],
  "total": 59.98
}
```


## 3. Add an Item to an Order
**POST /orders/o456/items**

Request:
```json
{
  "productId": "p124",
  "quantity": 1
}
```

Response (201 Created):
```json
{
  "itemId": "i2",
  "productId": "p124",
  "quantity": 1
}
```
