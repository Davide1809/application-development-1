# Middleware Order Experiment

## Objective
Demonstrate that middleware **order matters** and that placing middleware in the wrong location breaks functionality.

---

## The Experiment: Moving express.json() to After Routes

### What We Changed
Moved `app.use(express.json())` from its correct position (before routes) to **after the routes**.

**Original (Correct) Order:**
```javascript
app.use(timingMiddleware);
app.use(express.json());  // ✅ BEFORE routes
app.use(logger);
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
```

**Broken Order:**
```javascript
app.use(timingMiddleware);
app.use(logger);
app.use('/products', require('./routes/products'));  // Routes run BEFORE json parser
app.use('/orders', require('./routes/orders'));
app.use(express.json());  // ❌ AFTER routes (too late!)
```

---

## What Broke

### Test 1: GET /products (Still works)
- **Request:** `GET http://localhost:3000/products`
- **Result:** ✅ **Works fine**
- **Why:** GET requests don't have a body, so JSON parsing isn't needed

### Test 2: POST /products with API Key (BREAKS)
- **Request:** `POST /products` with `x-api-key: 12345`
- **Body:** `{"name": "Mouse", "price": 25, "stock": 50}`
- **Result:** ❌ **FAILS - 500 Internal Server Error**
- **Response:** 
```json
{
  "error": {
    "code": 500,
    "message": "Cannot destructure property 'name' of 'req.body' as it is undefined."
  }
}
```
- **Why it breaks:** `req.body` is `undefined` because `express.json()` hasn't run yet!
  - The validation middleware tries to destructure: `const { name, price, stock } = req.body;`
  - Since body is undefined (not parsed), the destructuring fails
  - Returns 500 error instead of 201

---

## Why It Broke

### Execution Flow (Broken):

```
1. Request arrives: POST /products with JSON body
2. timingMiddleware runs (doesn't parse body)
3. logger runs (doesn't parse body)
4. routes execute IMMEDIATELY
   → validateApiKey runs (checks headers ✅)
   → validateProduct runs 
     → req.body === undefined (never parsed!)
     → Checks: if (!name || price == null || stock == null)
     → price = req.body.price = undefined
     → Validation fails! ❌
   → Returns 400 error
5. express.json() runs (too late, request already processed)
```

### Why This Matters

**Middleware order is critical because:**
1. Only ONE response can be sent per request
2. Once a response is sent, remaining middleware doesn't execute
3. Each middleware builds on what the previous one did
4. The request-response cycle has a specific order:
   - Parse body first (express.json)
   - Log the request (logger)  
   - Validate the request (validateApiKey, validateProduct)
   - Execute controller (createProduct)
   - Send response

---

## The Error

HTTP Status: **500 Internal Server Error**
```json
{
  "error": {
    "code": 500,
