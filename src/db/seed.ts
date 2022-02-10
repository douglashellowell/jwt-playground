import db from './connection';

async function seed() {
  await db.roles.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'moderator' },
      { id: 3, name: 'user' },
    ],
  });

  await db.users.createMany({
    data: [
      { username: 'doug', email: 'doug@hellowell.com', password: 'admin123' },
      { username: 'maryMod', email: 'mary@example.com', password: 'mod123' },
      { username: 'fredUser', email: 'user@example.com', password: 'user123' },
    ],
  });

  await db.users_Roles.createMany({
    data: [
      { user_id: 1, role_id: 1 },
      { user_id: 2, role_id: 2 },
      { user_id: 3, role_id: 3 },
    ],
  });
}

export default seed;
