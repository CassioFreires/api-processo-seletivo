export async function seed(knex) {
  await knex('items').del();
  await knex('orders').del();

  await knex('orders').insert({
    orderId: 'v10089015vdb-01',
    value: 10000,
    creationDate: new Date().toISOString(),
  });

  await knex('items').insert([
    {
      orderId: 'v10089015vdb-01',
      productId: '2434',
      quantity: 1,
      price: 1000,
    },
  ]);
}
