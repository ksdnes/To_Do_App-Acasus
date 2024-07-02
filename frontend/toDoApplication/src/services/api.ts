import { IUser } from "@/types";
import axiosInstance, { TOKEN_NAME, saveToken } from "./config";

type RegisterUserTypes = IUser;

export const registerUser = async ({
  email,
  username,
  password,
}: RegisterUserTypes) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      email: email,
      password: password,
      username: username,
    });
    return response.data.user;
  } catch (error) {
    console.log("error in registerUser", error);
    throw error;
  }
};

type LoginUserTypes = Omit<IUser, "username">;
export const loginUser = async ({ email, password }: LoginUserTypes) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    console.log("token", token);
    axiosInstance.defaults.headers.common["authorization"] = token;
    await saveToken(TOKEN_NAME, token);
    console.log("Successfully logged in" + token);
    console.log("responseDataUser" + response.data.user);
    return response.data.user;
  } catch (error) {
    console.log("Error in loginUser", error);
    throw error;
  }
};
