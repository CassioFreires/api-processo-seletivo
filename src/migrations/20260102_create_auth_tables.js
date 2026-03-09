export function up(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable(); // hashed
    })
    .createTable('roles', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    })
    .createTable('permissions', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
    })
    .createTable('roles_permissions', (table) => {
      table.increments('id').primary();
      table.integer('role_id').unsigned().notNullable();
      table.integer('permission_id').unsigned().notNullable();
      table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
      table
        .foreign('permission_id')
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE');
      table.unique(['role_id', 'permission_id']);
    })
    .createTable('user_roles', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('role_id').unsigned().notNullable();
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .foreign('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
      table.unique(['user_id', 'role_id']);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('user_roles')
    .dropTableIfExists('roles_permissions')
    .dropTableIfExists('permissions')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
}