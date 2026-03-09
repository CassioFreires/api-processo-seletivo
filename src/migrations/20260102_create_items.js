export function up(knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('orderId').notNullable();
    table.string('productId').notNullable();
    table.integer('quantity').notNullable();
    table.decimal('price').notNullable();
    table
      .foreign('orderId')
      .references('orderId')
      .inTable('orders')
      .onDelete('CASCADE');
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('items');
}