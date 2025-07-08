export let users = [
  { id: 1, name: "Juan Pérez", email: "juan.perez@email.com" },
  { id: 2, name: "María García", email: "maria.garcia@email.com" },
  { id: 3, name: "Carlos López", email: "carlos.lopez@email.com" },
  { id: 4, name: "Ana Martínez", email: "ana.martinez@email.com" },
  { id: 5, name: "Luis Rodríguez", email: "luis.rodriguez@email.com" },
];

export const generateId = () => {
  const maxId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
  return maxId + 1;
};
