# Middleware Lifecycle Analysis

## Scenario 1: Valid POST /products with Correct API Key

**Request:** `POST /products`  
**Headers:** `x-api-key: 12345`, `Content-Type: application/json`  
**Body:** `{"name": "Laptop", "price": 999, "stock": 5}`

### Execution Order:

1. **timingMiddleware** (app.use)
   - Runs first (declared first in server.js)
   - Records `start = Date.now()`
   - Sets up `res.on('finish')` listener to log timing later
   - Calls `next()` → continues to next middleware

2. **express.json()** (app.use)
   - Parses the JSON request body
   - Makes `req.body` available: `{name, price, stock}`
   - Calls `next()` → continues to next middleware

3. **logger** (app.use)
   - Logs to console: `[2026-03-05T...] POST /products`
   - Calls `next()` → continues to next middleware

4. **validateApiKey** (route middleware on POST)
   - Checks `req.headers['x-api-key']`
   - Value is `12345` ✅ (matches)
   - Calls `next()` → continues to next middleware

5. **validateProduct** (route middleware on POST)
   - Checks `name`, `price`, `stock` are present
   - Checks `price >= 0` and `stock >= 0`
   - All valid ✅
   - Calls `next()` → continues to controller

6. **productsController.createProduct**
   - Controller now executes
   - Checks for duplicate product name
   - No duplicate ✅
   - Creates new product object: `{id: 1, name, price, stock}`
   - Sends response: `res.status(201).json(product)`

7. **Response Sent** (HTTP 201)
   - `res.on('finish')` event fires
   - **timingMiddleware logs:** `[POST /products] completed in 5ms`

### Result: ✅ Product created successfully

---

## Scenario 2: POST /products Without Required Field

**Request:** `POST /products`  
**Headers:** `x-api-key: 12345`, `Content-Type: application/json`  
**Body:** `{"name": "Laptop"}` ← Missing `price` and `stock`

### Execution Order:

1. **timingMiddleware**
   - Runs, records start time
   - Sets up `res.on('finish')` listener
   - Calls `next()`

2. **express.json()**
   - Parses JSON body: `{name: "Laptop"}`
   - Calls `next()`

3. **logger**
   - Logs: `[2026-03-05T...] POST /products`
   - Calls `next()`

4. **validateApiKey**
   - Checks header: `x-api-key: 12345` ✅
   - Valid, calls `next()`

5. **validateProduct** ⛔ **SHORT-CIRCUITS HERE**
   - Checks `name` → present ✅
   - Checks `price` → NULL ❌
   - Validation fails!
   - **Sends response immediately:** HTTP 400
   - ```json
     {
       "error": {
         "code": 400,
         "message": "Invalid product data."
       }
     }
     ```
   - **Does NOT call `next()`** → controller will NOT run

6. **productsController.createProduct**
   - **DOES NOT EXECUTE** ❌
   - Middleware short-circuited the request

7. **Response Sent** (HTTP 400)
   - `res.on('finish')` event fires
   - **timingMiddleware logs:** `[POST /products] completed in 3ms`

### Key Point: The request never reaches the controller because validation failed in middleware
