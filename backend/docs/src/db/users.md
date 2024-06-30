# User Model and Functions

This module defines the user model schema and provides functions to interact with user data.

## User Model Schema

The user model schema defines the structure of user documents in the database.

```javascript
import mongoose from "mongoose";

const USersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    token: { type: String, select: true },
  },
});
```

## Fields

| Field                   | Type   | Required | Selected by Default | Description                                        |
| ----------------------- | ------ | -------- | ------------------- | -------------------------------------------------- |
| username                | String | Yes      | No                  | The username of the user.                          |
| email                   | String | Yes      | No                  | The email address of the user.                     |
| authentication.password | String | Yes      | No                  | Thee hashed password of the user.                  |
| authentication.salt     | String | No       | No                  | The salt used for hashing the password.            |
| authentication.token    | String | No       | Yes                 | The authentication token associated with the user. |

This documentation outlines the schema structure, each operation's purpose, and provides example TypeScript functions for each CRUD operation related to running tracks.
