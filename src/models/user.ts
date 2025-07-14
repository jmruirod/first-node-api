export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRequest = Omit<User, "id">;
