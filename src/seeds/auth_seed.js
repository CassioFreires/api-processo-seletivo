import bcrypt from 'bcrypt';

export async function seed(knex) {
  await knex('user_roles').del();
  await knex('roles_permissions').del();
  await knex('permissions').del();
  await knex('roles').del();
  await knex('users').del();

  const [{ id: adminRoleId }] = await knex('roles')
    .insert({ name: 'admin' })
    .returning('id');

  const [{ id: userRoleId }] = await knex('roles')
    .insert({ name: 'user' })
    .returning('id');

  const [{ id: permCreateId }] = await knex('permissions')
    .insert({ name: 'create_order' })
    .returning('id');

  const [{ id: permReadId }] = await knex('permissions')
    .insert({ name: 'read_order' })
    .returning('id');

  await knex('roles_permissions').insert([
    { role_id: adminRoleId, permission_id: permCreateId },
    { role_id: adminRoleId, permission_id: permReadId },
  ]);

  const password = await bcrypt.hash('password', 10);

  const [{ id: userId }] = await knex('users')
    .insert({ username: 'admin', password })
    .returning('id');

  await knex('user_roles').insert({
    user_id: userId,
    role_id: adminRoleId,
  });
}