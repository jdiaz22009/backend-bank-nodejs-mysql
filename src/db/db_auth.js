module.exports = {
  db: {
    database: process.env.DB_NAME || 'bank',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
  },
  serve: {
    port: process.env.BANKPORT || 3001,
    env: process.env.ENVIROMENT || 'dev'
  }
}