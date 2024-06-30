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
export const UserModel = mongoose.model("User", USersSchema);
export const getUserByToken = async (token: string) => {
  const user = await UserModel.findOne({
    "authentication.token": token,
  });
  return user;
};
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => {
  new UserModel(values).save().then((user) => user.toObject());
};
export const updateUserById = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
