# Resources for Simple E-commerce API

**Resource:** products  
**Endpoint:** /products/{productId}  
**Related:** /products/{productId}/orders (orders containing this product)


**Resource:** orders  
**Endpoint:** /orders/{orderId}  
**Related:** /orders/{orderId}/products (products in this order)


**Resource:** users  
**Endpoint:** /users/{userId}  
**Related:** /users/{userId}/orders (orders placed by this user)


**Resource:** order items  
**Endpoint:** /orders/{orderId}/items/{itemId}  
**Related:** /orders/{orderId}/items (all items in an order)
