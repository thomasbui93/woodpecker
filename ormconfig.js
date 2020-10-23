const { config } = require('dotenv')

config()

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
   "type": process.env.SQL_TYPE,
   "host": process.env.SQL_HOST,
   "port": process.env.SQL_PORT,
   "username": process.env.SQL_USER,
   "password": process.env.SQL_PASSWORD,
   "database": process.env.SQL_DB,
   "synchronize": true,
   "logging": false,
   "entities": [
      //isProd ? "src/entity/**/*.ts": "build/entity/**/*.js"
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "build/migrations/**/*.js"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
