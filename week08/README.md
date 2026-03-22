# Products & Orders REST API

## 1. Project Overview

A RESTful API built with Node.js and Express for managing products and orders.

**Target Users:** Developers building e-commerce or inventory management front-ends.

**Core Resources:**
- **Products** — Create, read, update, and delete product listings with name, price, and stock.
- **Orders** — Create and manage customer orders with status tracking.

---

## 2. Setup Instructions

**Requirements:** Node.js v18+

**Install dependencies:**
```bash
npm install
```

**Start the server:**
```bash
node server.js
```

The server runs on `http://localhost:3000` by default.

**Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Port the server listens on |

> Note: The API key is hardcoded as `12345`. Include it as `x-api-key: 12345` in request headers for protected routes.

---

## 3. API Overview

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Retrieve all products (paginated) |
| GET | /products/:id | Retrieve a product by ID |
| POST | /products | Create a new product |
| PATCH | /products/:id | Update a product |
| DELETE | /products/:id | Delete a product |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /orders | Retrieve all orders |
| GET | /orders/:id | Retrieve an order by ID |
| POST | /orders | Create a new order |
| PATCH | /orders/:id | Update an order |
| DELETE | /orders/:id | Delete an order |

---

## 4. Example Requests

### Successful POST — Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: 12345" \
  -d '{"name": "Widget", "price": 9.99, "stock": 100}'
```
**Response `201 Created`:**
```json
{ "id": 1, "name": "Widget", "price": 9.99, "stock": 100 }
```

---

### Validation Error — Missing Fields
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: 12345" \
  -d '{"name": "Widget"}'
```
**Response `400 Bad Request`:**
```json
{ "error": { "code": 400, "message": "Invalid product data." } }
```

---

### 401 Unauthorized — Missing API Key
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 9.99, "stock": 100}'
```
**Response `401 Unauthorized`:**
```json
{ "error": { "code": 401, "message": "Unauthorized. Invalid or missing API key." } }
```

---

## 5. Linting

```bash
npm run lint
```