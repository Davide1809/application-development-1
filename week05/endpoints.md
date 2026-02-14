# Endpoints for Simple E-commerce API


## Products
- **GET /products** — Retrieve all products. Returns: 200 OK
- **GET /products/{productId}** — Retrieve a single product by ID. Returns: 200 OK
- **POST /products** — Create a new product. Returns: 201 Created
- **PUT /products/{productId}** — Update an existing product. Returns: 200 OK
- **DELETE /products/{productId}** — Delete a product. Returns: 204 No Content


## Orders
- **GET /orders** — Retrieve all orders. Returns: 200 OK
- **GET /orders/{orderId}** — Retrieve a single order by ID. Returns: 200 OK
- **POST /orders** — Create a new order. Returns: 201 Created
- **PATCH /orders/{orderId}** — Update an order (e.g., status). Returns: 200 OK
- **DELETE /orders/{orderId}** — Delete an order. Returns: 204 No Content


## Users
- **GET /users** — Retrieve all users. Returns: 200 OK
- **GET /users/{userId}** — Retrieve a single user by ID. Returns: 200 OK
- **POST /users** — Create a new user. Returns: 201 Created
- **PUT /users/{userId}** — Update a user. Returns: 200 OK
- **DELETE /users/{userId}** — Delete a user. Returns: 204 No Content


## Order Items
- **GET /orders/{orderId}/items** — Retrieve all items in an order. Returns: 200 OK
- **GET /orders/{orderId}/items/{itemId}** — Retrieve a single item in an order. Returns: 200 OK
- **POST /orders/{orderId}/items** — Add an item to an order. Returns: 201 Created
- **PATCH /orders/{orderId}/items/{itemId}** — Update an item in an order. Returns: 200 OK
- **DELETE /orders/{orderId}/items/{itemId}** — Remove an item from an order. Returns: 204 No Content
