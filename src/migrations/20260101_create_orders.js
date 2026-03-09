export function up(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.string('orderId').primary().notNullable();
    table.decimal('value').notNullable();
    table.timestamp('creationDate').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('orders');
}