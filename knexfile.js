/* eslint-disable linebreak-style */
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knex = {
  client: "postgresql",
  connection: {
    database: "desafio",
    user: "postgres",
    password: "5702lav"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};

export default knex;