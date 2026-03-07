# Postman API Test Screenshots

Below are descriptions for each screenshot included in this folder:

- **Timing Middleware.png**: Terminal showing Node server with timing logs. Demonstrates the timing middleware logging each request with the format `[METHOD /path] completed in Xms`.

- **POST Missing Required Field (400 Error).png**: POST request to /products with missing `price` field and correct `x-api-key: 12345` header. Shows the validateProduct middleware returning 400 Bad Request error with message "Invalid product data."

- **POST with All Required Fields (201 Created).png**: POST request to /products with complete data (name, price, stock) and correct `x-api-key: 12345` header. Shows successful product creation with 201 Created response including the generated product ID.

- **GET Request (No API Key Needed - 200 OK).png**: GET request to /products without any API key header. Demonstrates that GET requests bypass API key validation and return 200 OK with the products list.

- **POST Without API Key (401 Unauthorized).png**: POST request to /products with valid product data but missing `x-api-key` header. Shows validateApiKey middleware returning 401 Unauthorized error. The request is blocked before reaching the controller.

- **POST With Wrong API Key (401 Unauthorized).png**: POST request to /products with valid product data but incorrect `x-api-key` value. Shows that the API key must match exactly `12345`. Returns 401 Unauthorized.

- **PATCH Without API Key (401 Unauthorized).png**: PATCH request to /products/:id without `x-api-key` header. Demonstrates that PATCH operations also require API key validation, returning 401 Unauthorized.

- **DELETE Without API Key (401 Unauthorized).png**: DELETE request to /products/:id without `x-api-key` header. Shows that DELETE operations require API key validation, returning 401 Unauthorized.

- **PATCH With Correct API Key (200 OK).png**: PATCH request to /products/:id with correct `x-api-key: 12345` header and update data. Shows successful product update with 200 OK response returning the modified product.

- **DELETE With Correct API Key (204 No Content).png**: DELETE request to /products/:id with correct `x-api-key: 12345` header. Shows successful deletion with 204 No Content response (empty body).
