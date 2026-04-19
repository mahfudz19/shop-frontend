export type UserAuth = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};
