import { generateId, users } from "~/db/users";
import { User, UserRequest } from "~/models/user";

export const userService = {
  getAll: () => users,

  getById: (id: number) => users.find((user) => user.id === id),

  create: (userRequest: UserRequest) => {
    const id = generateId();
    const user: User = { id, ...userRequest };
    users.push(user);

    return user;
  },

  update: (userRequest: UserRequest, id: number) => {
    const index = users.findIndex((user) => user.id === id);
    const user: User = { id, ...userRequest };
    users[index] = user;
    return user;
  },

  remove: (id: number) => {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
  },
};
