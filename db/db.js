const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'addis_chat',
    password: '8915code',
    port: 5432,
})

module.exports = pool
