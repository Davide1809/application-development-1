# Refactor Log

## Improvement 1 — Extracted `findProductOr404` and `findOrderOr404` helper functions

**What was changed:**
Both controllers repeated the same pattern of finding a record by ID and returning a 404 if not found. This was extracted into helper functions in each controller.

**Why it improves quality:**
Removes duplicated code. If the 404 response format ever changes, it only needs updating in one place per controller instead of three.

**Before:**
The following pattern appeared 3 times in productsController.js and 2 times in ordersController.js:
```
const product = products.find(p => p.id === parseInt(req.params.id));
if (!product) return res.status(404).json({ error: { code: 404, message: 'Product not found.' } });
```

**After:**
A single helper function handles the lookup and 404 response. Controllers simply call findProductOr404(req.params.id, res) and check if the result is null.

---

## Improvement 2 — Extracted `isNameTaken` helper in productsController

**What was changed:**
The product name uniqueness check was written twice with slightly different conditions — once in createProduct and once in updateProduct. It was extracted into a single helper function called isNameTaken.

**Why it improves quality:**
Eliminates the risk of the two checks drifting out of sync. Makes the uniqueness rule easy to find and change in one place.

**Before:**
```
// in createProduct
if (products.some(p => p.name === name)) { ... }

// in updateProduct
if (products.some(p => p.name === name && p.id !== product.id)) { ... }
```

**After:**
```
function isNameTaken(name, excludeId = null) {
  return products.some(p => p.name === name && p.id !== excludeId);
}
```
Both createProduct and updateProduct now call isNameTaken with the appropriate arguments.

---

## Improvement 3 — Moved order validation into its own middleware

**What was changed:**
Order validation was inline inside the createOrder controller function. It was moved into a dedicated middleware/validateOrder.js file.

**Why it improves quality:**
Keeps controllers focused on business logic only. Makes the codebase consistent — both products and orders now follow the same pattern of using dedicated validation middleware. Easier to find and update validation rules.

**Before:**
Inside ordersController.js createOrder:
```
if (!userId || !Array.isArray(items) || items.length === 0 || total == null) {
  return res.status(400).json({ error: { code: 400, message: 'Invalid order data.' } });
}
```

**After:**
Validation lives in middleware/validateOrder.js and is applied in routes/orders.js:
```
router.post('/', validateApiKey, validateOrder, ordersController.createOrder);
```
The controller no longer contains any validation logic.

---

## Improvement 4 — Improved variable naming in pagination logic

**What was changed:**
In listProducts, the variables start and end were renamed to startIndex and endIndex.

**Why it improves quality:**
start and end are ambiguous and could refer to page numbers, timestamps, or byte offsets. startIndex and endIndex make it immediately clear these are array positions.

**Before:**
```
const start = (page - 1) * limit;
const end = start + limit;
const paginated = products.slice(start, end);
```

**After:**
```
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;
const paginated = products.slice(startIndex, endIndex);
```