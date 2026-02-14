# Design Rationale for Simple E-commerce API


**Why these resources?**  
Products, orders, users, and order items represent the core entities needed for a basic e-commerce workflow. Each maps directly to a real-world object or concept, making the API intuitive and extensible.

**Why PUT vs PATCH?**  
PUT is used for full updates (replacing a resource), while PATCH is used for partial updates (modifying only specific fields). PATCH is chosen for orders and order items to allow flexible, minimal updates without requiring the full resource payload.

**How does the API avoid breaking clients?**  
The API uses RESTful conventions, consistent resource naming, and versionless endpoints for stability. Backward compatibility is maintained by not removing or changing existing endpoints or response formats.

**One tradeoff made:**  
The API uses page/limit pagination for simplicity, but this can be less efficient for very large datasets compared to cursor-based pagination.
