const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  database: process.env.databaseName,
  host: process.env.databaseHost,
  password: process.env.databasePassword,
  user: process.env.databaseUser,
  port: process.env.databasePort
})

module.exports = pool
