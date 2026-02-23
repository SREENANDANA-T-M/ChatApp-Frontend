import { BASE_URL } from "./serverURL";
import { commonAPI } from "./commonAPI";

export const getMessagesAPI = async (user1, user2) => {
  return await commonAPI(
    "GET",
    `${BASE_URL}/messages/${user1}/${user2}`
  );
};
// ṛegister api
export const registerAPI = async (data) => {
  return await commonAPI("POST", `${BASE_URL}/register`, data);
};
// login api
export const loginAPI = async (data) => {
  return await commonAPI("POST", `${BASE_URL}/login`, data);
};

// get users
export const getUsersAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/users`);
};
