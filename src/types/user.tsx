export type UserAuthReg = {
  id: string;
  email: string;
  name: string;
};

export type UserAuth = UserAuthReg & { role: UserRole };

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type UserRole = "user" | "admin";
export type UserStatus = "active" | "inactive";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};
