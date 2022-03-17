const pg = require('pg');

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: {
    directory: './data/migrations',
  },
  seeds: {directory: './data/seeds'},
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: 'postgres://localhost/sporestash?sslmode=disable',
    useNullAsDefault: true
  },

  // These will need to be changed later
  // In the example they were both the same as development
  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    useNullAsDefault: true
  }

};