# Authorization with Roles and Ownership - Reflection

## What is the difference between authentication and authorization?

**Authentication** is verifying WHO you are (identity verification). The login process checks your email and password to confirm you are a valid user. Once authenticated, the server creates a session to remember you.

**Authorization** is determining WHAT you are allowed to do (permission checking). After the server knows who you are, it decides which resources and actions you can access based on your role or ownership. A regular user is authorized to see their own tasks, but not admin tasks. An admin is authorized to see everything.

Authentication happens first (login), then authorization happens on every protected request.

## Why does /admin return 403 for a regular user instead of 401?

Status code 401 means "not authenticated" — you haven't logged in at all.
Status code 403 means "authenticated but not authorized" — you logged in, but you don't have permission.

When a regular user logs in and tries to access /admin, they have proven their identity (authenticated), but they don't have the admin role (not authorized). The server returns 403 to signal "you ARE logged in, but this action is forbidden for your role."

If the server returned 401, it would be misleading — the user would think they need to log in again, when the real problem is their permission level.

## Why is ownership checking important?

Ownership checking prevents unauthorized access to private resources. Without it, a regular user could access ANY task by guessing task IDs, including tasks belonging to other users.

Example: Without ownership checking, user@example.com could request `GET /tasks/1` and read admin@example.com's private data just because the task exists.

Ownership ensures each user can only access their own data (unless they have admin privileges). This is essential for privacy and data security.

## What is the difference between role-based access and ownership-based access?

**Role-based access** (RBAC) grants permissions based on a user's role in the system.
- Example: Admins have the "admin" role → get access to the /admin route
- One role can grant broad permissions to many resources
- Example: All admins can access all tasks

**Ownership-based access** grants permissions based on who created or owns a specific resource.
- Example: Users can only access tasks they own
- Each user is authorized for the specific resources they created
- Example: user@example.com can access task 2 (theirs), but not task 1 (not theirs)

You can combine both: A regular user can access their own tasks (ownership), and an admin can access *any* task (role-based).

## Why should authorization checks happen on the server instead of the client?

Authorization checks on the client (JavaScript) are just for UX — hiding buttons users shouldn't see. But they're not secure because:

1. **The client is controlled by the user** — They can open DevTools, modify JavaScript, change variables, or use curl to bypass client-side checks.

2. **The server can't trust the client** — Any data sent from the browser could be forged or manipulated.

3. **Only the server is authoritative** — The server is the trusted source of truth about what data exists and who owns it.

If you only check authorization on the client, a malicious user can bypass your checks and access forbidden data by making direct API calls.