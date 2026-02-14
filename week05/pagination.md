# Pagination & Filtering for Simple E-commerce API

## Endpoint Supporting Pagination
- **GET /products** — Retrieve all products (supports pagination)
- **GET /orders** — Retrieve all orders (supports pagination)

## Pagination Method
- Uses `page` and `limit` query parameters (page/limit method)

## Example Query Parameters
- `/products?page=2&limit=20` — Get page 2 of products, 20 products per page
- `/orders?page=1&limit=10&status=processing` — Get first page of orders with status 'processing', 10 orders per page
