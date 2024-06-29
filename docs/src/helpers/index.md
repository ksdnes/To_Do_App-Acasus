# Helpers

This file contains helper functions for generating and verifying tokens, generating random values, and hashing passwords.

## Functions

### `generateToken`

Generates a JWT (JSON Web Token) using the provided user ID.

#### Parameters

- **id**: String. The user ID to include in the token payload.

#### Returns

- String. The generated JWT.

### `verifyToken`

Verifies a JWT and returns the decoded payload if the token is valid.

#### Parameters

- **token**: String. The JWT to verify.

#### Returns

- Object | null. The decoded JWT payload if the token is valid, or `null` if verification fails.

### `random`

Generates a random string of 128 bytes encoded in base64.

#### Returns

- String. A random string.

### `authentication`

Generates a hashed password using a combination of salt and password.

#### Parameters

- **salt**: String. The salt value used for hashing.
- **password**: String. The password to hash.

#### Returns

- String. The hashed password.
