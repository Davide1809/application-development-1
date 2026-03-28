# API Test Screenshots

Below are screenshots demonstrating the working tasks resource with database integration:

- **GET_tasks.png**: Browser showing successful GET request to `http://localhost:3000/tasks`. Returns JSON array of all tasks from the database with id, title, description, status, and created_at fields.

- **POST_tasks.png**: Terminal showing successful POST request to `/tasks` with required API key header `x-api-key: 12345`. Request body includes title, description, and status. Response shows HTTP 201 Created with the newly inserted task including auto-generated id.

- **PATCH_tasks.png**: Terminal showing successful PATCH request to `/tasks/1` with API key header. Updates the status field from "pending" to "completed". Response shows the full updated task object with the new status value.

- **DELETE_tasks.png**: Terminal showing successful DELETE request to `/tasks/1` with API key header. Returns HTTP 204 No Content (empty response body) confirming the task was deleted from the database.

## Key Features Demonstrated

- **Parameterized Queries**: All database operations use `?` placeholders to prevent SQL injection
- **API Key Validation**: POST, PATCH, DELETE operations require the `x-api-key: 12345` header
- **Public GET**: Retrieve operations (GET) do not require authentication
- **Database Persistence**: Data is stored in MySQL and persists across requests
- **Error Handling**: Proper HTTP status codes (201 Created, 204 No Content, 404 Not Found, 500 errors)

