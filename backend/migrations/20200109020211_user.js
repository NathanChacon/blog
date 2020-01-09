
exports.up = async function(knex) {
    await knex.schema.createTable('user', table => {
    table.string('id').primary();
    table.string('name').unique().notNullable();
    table.string('password').notNullable();
    table.string('roll').defaultTo('u');
  });
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user');
};