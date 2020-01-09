// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
  },
  migrations: {
      tableName: 'knex_migrations'
    }
};
