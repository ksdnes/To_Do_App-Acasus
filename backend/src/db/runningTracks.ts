import mongoose from "mongoose";
const { Schema } = mongoose;

const RunningTracksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  distance: { type: Number, required: true },
  estimatedDuration: { type: Number, required: true },
  isCompleted: { type: Boolean },
  dateTime: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const RunningTracksModel = mongoose.model(
  "RunningTracks",
  RunningTracksSchema
);

export const getRunningTracks = () => RunningTracksModel.find();
export const getRunningTrackById = (id: string) =>
  RunningTracksModel.findById(id);

export const createRunningTrack = (values: Record<string, any>) => {
  return new RunningTracksModel(values)
    .save()
    .then((runningTrack) => runningTrack.toObject());
};
export const updateRunningTrackById = (
  id: string,
  values: Record<string, any>
) => {
  return RunningTracksModel.findByIdAndUpdate(id, values, { new: true });
};
export const deleteRunningTrackById = (id: string) => {
  const deletedTask = RunningTracksModel.findByIdAndDelete(id);
  console.log("deletedTask", deletedTask);
  return deletedTask;
};
