/** @format */

interface User {
  userID: string;
  name: string;
  birthDay: string;
  jobName: string;
  username: string;
  active: boolean;
  password?: string;
  gender: "male" | "female" | "lgbt";
  code: string;
  createAt: string;
  activeAt: string;
  role: "user" | "admin";
}

interface UpdateUser {
  name?: string;
  birthDay?: string;
  phone?: number;
  gender?: "male" | "female" | "lgbt";
}

export { User, UpdateUser };
