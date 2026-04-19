export type UserAuthReg = {
  id: string;
  email: string;
  name: string;
};

export type UserAuth = UserAuthReg & { role: "user" | "admin" };

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};
