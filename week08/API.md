# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Protected routes require an API key in the request header:
```
x-api-key: 12345
```

---

## Products

### 1. List All Products
- **Endpoint:** `/products`
- **Method:** `GET`
- **Auth Required:** No
- **Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Results per page |

- **Success Response:**
  - **Status:** `200 OK`
  ```json
  {
    "data": [
      { "id": 1, "name": "Widget", "price": 9.99, "stock": 100 }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1
    }
  }
  ```

---

### 2. Get Product by ID
- **Endpoint:** `/products/:id`
- **Method:** `GET`
- **Auth Required:** No
- **Success Response:**
  - **Status:** `200 OK`
  ```json
  { "id": 1, "name": "Widget", "price": 9.99, "stock": 100 }
  ```
- **Error Responses:**
  - **Status:** `404 Not Found`
  ```json
  { "error": { "code": 404, "message": "Product not found." } }
  ```

---

### 3. Create Product
- **Endpoint:** `/products`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  { "name": "Widget", "price": 9.99, "stock": 100 }
  ```
- **Success Response:**
  - **Status:** `201 Created`
  ```json
  { "id": 1, "name": "Widget", "price": 9.99, "stock": 100 }
  ```
- **Error Responses:**
  - **Status:** `400 Bad Request`
  ```json
  { "error": { "code": 400, "message": "Invalid product data." } }
  ```
  - **Status:** `401 Unauthorized`
  ```json
  { "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
  ```
  - **Status:** `409 Conflict`
  ```json
  { "error": { "code": 409, "message": "Product name must be unique." } }
  ```

---

### 4. Update Product
- **Endpoint:** `/products/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes
- **Request Body (all fields optional):**
  ```json
  { "name": "Updated Widget", "price": 12.99, "stock": 50 }
  ```
- **Success Response:**
  - **Status:** `200 OK`
  ```json
  { "id": 1, "name": "Updated Widget", "price": 12.99, "stock": 50 }
  ```
- **Error Responses:**
  - **Status:** `401 Unauthorized`
  ```json
  { "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
  ```
  - **Status:** `404 Not Found`
  ```json
  { "error": { "code": 404, "message": "Product not found." } }
  ```
  - **Status:** `409 Conflict`
  ```json
  { "error": { "code": 409, "message": "Product name must be unique." } }
  ```

---

### 5. Delete Product
- **Endpoint:** `/products/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Status:** `204 No Content`
- **Error Responses:**
  - **Status:** `401 Unauthorized`
  ```json
  { "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
  ```
  - **Status:** `404 Not Found`
  ```json
  { "error": { "code": 404, "message": "Product not found." } }
  ```

---

## Orders

### 1. List All Orders
- **Endpoint:** `/orders`
- **Method:** `GET`
- **Auth Required:** No
- **Success Response:**
  - **Status:** `200 OK`
  ```json
  [
    {
      "id": 1,
      "userId": "user_01",
      "items": [{ "productId": 1, "quantity": 2 }],
      "total": 19.98,
      "status": "processing"
    }
  ]
  ```

---

### 2. Get Order by ID
- **Endpoint:** `/orders/:id`
- **Method:** `GET`
- **Auth Required:** No
- **Success Response:**
  - **Status:** `200 OK`
  ```json
  {
    "id": 1,
    "userId": "user_01",
    "items": [{ "productId": 1, "quantity": 2 }],
    "total": 19.98,
    "status": "processing"
  }
  ```
- **Error Responses:**
  - **Status:** `404 Not Found`
  ```json
  { "error": { "code": 404, "message": "Order not found." } }
  ```

---

### 3. Create Order
- **Endpoint:** `/orders`
- **Method:** `POST`
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "userId": "user_01",
    "items": [{ "productId": 1, "quantity": 2 }],
    "total": 19.98
  }
  ```
- **Success Response:**
  - **Status:** `201 Created`
  ```json
  {
    "id": 1,
    "userId": "user_01",
    "items": [{ "productId": 1, "quantity": 2 }],
    "total": 19.98,
    "status": "processing"
  }
  ```
- **Error Responses:**
  - **Status:** `400 Bad Request`
  ```json
  { "error": { "code": 400, "message": "Invalid order data." } }
  ```
  - **Status:** `401 Unauthorized`
  ```json
  { "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
  ```

---

### 4. Update Order
- **Endpoint:** `/orders/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes
- **Request Body (all fields optional):**
  ```json
  { "status": "shipped", "items": [{ "productId": 1, "quantity": 2 }], "total": 25.00 }
  ```
- **Success Response:**
  - **Status:** `200 OK`
  ```json
  {
    "id": 1,
    "userId": "user_01",
    "items": [{ "productId": 1, "quantity": 2 }],
    "total": 25.00,
    "status": "shipped"
  }
  ```
- **Error Responses:**
  - **Status:** `401 Unauthorized`
  ```json
  { "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
  ```
  - **Status:** `404 Not Found`
  ```json
  { "error": { "code": 404, "message": "Order not found." } }
  ```
  - **Status:** `409 Conflict`
  ```json
  { "error": { "code": 409, "message": "Cannot update a cancelled order." } }
  ```

---

### 5. Delete Order
- **Endpoint:** `/orders/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes
- **Success Response:**
  - **Status:** `204 No Content`
- **Error Responses:**
  - **Status:** `401 Unauthorized`
  ```json
  { "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
  ```
  - **Status:** `404 Not Found`
  ```json
  { "error": { "code": 404, "message": "Order not found." } }
  ```