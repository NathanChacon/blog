
exports.up = async function(knex) {
    await knex.schema.createTable('article', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('content').notNullable();
    table.integer('categoryId').unsigned().references('id').inTable('category')
  });
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('article');
};
