# Code Review Reflection

## 1. What parts of your code were hardest to read?

The `listProducts` function was the most dense. It handled query parsing,
sanitization, pagination calculation, and the response all in one block
with no comments separating the steps, making it hard to scan quickly.

The inline 404 checks repeated across multiple controller functions also
added visual noise — the same 3-line pattern appeared 6+ times across
both controllers.

---

## 2. Where did you duplicate logic?

1. **404 lookup pattern** — `products.find(...)` followed by an identical
   `if (!product) return res.status(404)...` appeared in `getProduct`,
   `updateProduct`, and `deleteProduct`. The same pattern was duplicated
   in the orders controller.

2. **Duplicate name check** — The product name uniqueness check was written
   separately in `createProduct` and `updateProduct` with slightly different
   conditions, making it easy to miss one if the rule changed.

3. **Order validation** — Validation for orders was inside the controller
   while product validation was in middleware. The inconsistency meant
   two different patterns for the same concern.

---

## 3. What naming improvements did you make?

| Before | After | Reason |
|--------|-------|--------|
| `start` | `startIndex` | Clarifies it is an array index, not a page number |
| `end` | `endIndex` | Same reason |
| `next` | `_next` | Signals intentionally unused Express parameter |

---

## 4. What documentation was missing before?

- No README — a new developer would have no idea how to start the server
- No list of endpoints or expected request/response formats
- No mention of the API key requirement or what header to use
- No description of what status codes the API returns
- No explanation of pagination parameters for `GET /products`
- No explanation of what `timingMiddleware.js` measures or why it exists

---

## 5. If another developer inherited this API, what would confuse them?

1. **The API key is hardcoded as `12345`** — there is no `.env` file or
   environment variable. A new developer would get 401 errors with no
   obvious fix.

2. **Data is stored in memory** — `products` and `orders` are plain arrays
   inside the controller files. All data resets when the server restarts.
   This is not obvious and could cause confusion during testing.

3. **`timingMiddleware.js` is in the root folder** — all other middleware
   lives in the `middleware/` directory. The inconsistent location is easy
   to miss.

4. **Orders had no validation middleware** — products used `validateProduct`
   middleware but orders validated inline in the controller. The
   inconsistency was not obvious until reading both files side by side.

5. **PATCH is used instead of PUT** — the routes use `PATCH` for updates
   but this is not documented anywhere. A developer used to `PUT` for
   updates could spend time debugging why their requests fail.