# Session Authentication Reflection

## What is a session?

A session is a way for the server to remember information about a specific client across multiple requests. Instead of sending credentials with every request, the server creates a session ID that the client stores in a cookie. Each time the client sends a request, it includes this session ID, allowing the server to look up and recall stored information about that user.

## What does the server store?

The server stores session data on the database or in memory (in this case, in memory). In our example, the server stores:
- The session ID
- The user information: `email` and `name`

This data is associated with a unique session ID that lives on the server.

## What does the client store?

The client (browser or Postman) stores the **session ID in a cookie**. The cookie is automatically sent with every request. The client doesn't store the user's actual credentials or personal data—just the session ID that links back to data stored on the server.

## Why does /profile fail before login?

Before login, `req.session.user` is undefined because no session has been created yet. The `requireLogin` middleware checks `if (!req.session.user)` and rejects the request with a 401 error. The client has no session cookie, so the server has nothing to look up.

## Why does /profile work after login?

After login, the POST /login route sets `req.session.user` with the user's email and name. This creates a session on the server and sends a session cookie to the client. When the client makes a GET request to /profile, it automatically includes the session cookie. The server recognizes the session ID, finds the user data, and allows the request to proceed.

## Why does /profile fail again after logout?

The POST /logout route calls `req.session.destroy()`, which deletes the session data from the server and removes the session cookie from the client. On the next request to /profile, the client has no valid session cookie to send. The server finds no session, so `req.session.user` is undefined again, and the `requireLogin` middleware rejects the request with a 401 error.
