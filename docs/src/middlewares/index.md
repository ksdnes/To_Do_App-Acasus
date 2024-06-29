# Authentication Middleware

This file contains middleware functions for authentication and authorization in the application.

## Middleware Functions

### `authenticateToken`

Middleware function to authenticate a user based on the access token in the request cookies.

#### Behavior

- Checks for the presence of an `accessToken` in the request cookies.
- Verifies the token using the `verifyToken` helper function.
- Sets `req.user` to the decoded user information if the token is valid.
- Calls `next()` to proceed to the next middleware or route handler if authentication succeeds.
- Returns a 401 Unauthorized response if the token is missing or invalid.

### `isOwner`

Middleware function to check if the authenticated user is the owner of a resource.

#### Parameters

- **req**: express.Request. The request object.
- **res**: express.Response. The response object.
- **next**: express.NextFunction. The next function to call in the middleware chain.

#### Behavior

- Compares the `id` parameter in the request with `req.user.id` to determine ownership.
- Calls `next()` to proceed to the next middleware or route handler if the user is the owner.
- Returns a 403 Forbidden response if the user is not the owner of the resource.

### `checkOwnership`

Middleware function to verify ownership of a running track by the authenticated user.

#### Parameters

- **req**: express.Request. The request object.
- **res**: express.Response. The response object.
- **next**: express.NextFunction. The next function to call in the middleware chain.

#### Behavior

- Retrieves the `userId` from `req.user.id` and `id` from the request parameters.
- Fetches the running track using `getRunningTrackById`.
- Compares the running track's `user` field with `userId` to ensure ownership.
- Calls `next()` to proceed to the next middleware or route handler if ownership is verified.
- Returns a 403 Forbidden response if the authenticated user does not own the running track.
