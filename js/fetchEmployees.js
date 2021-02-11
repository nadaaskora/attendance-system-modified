let users;
users=fetch('../data/users.json')
.then((res) => res.json());
export {users}