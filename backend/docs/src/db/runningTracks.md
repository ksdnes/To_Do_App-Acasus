# Running Tracks API

This file defines the MongoDB schema and operations for managing running tracks in the application.

## Schema

The `RunningTracks` schema defines the structure of each running track stored in the database.

### RunningTracks Schema

```typescript
import mongoose from "mongoose";
const { Schema } = mongoose;

const RunningTracksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedDuration: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const RunningTracksModel = mongoose.model(
  "RunningTracks",
  RunningTracksSchema
);
```

## Fields

| Field             | Type                  | Required | Description                                              |
| ----------------- | --------------------- | -------- | -------------------------------------------------------- |
| name              | String                | Yes      | The name of the running track.                           |
| location          | String                | Yes      | The location of the running track.                       |
| distance          | Number                | Yes      | The distance covered in the running track, in meters.    |
| estimatedDuration | Number                | Yes      | The estimated duration of the running track, in minutes. |
| dateTime          | Date                  | Yes      | The date and time when the running track took place.     |
| user              | Schema.Types.ObjectId | Yes      | Refers to the user who recorded the running track.       |

This documentation outlines the schema structure, each operation's purpose, and provides example TypeScript functions for each CRUD operation related to running tracks.
