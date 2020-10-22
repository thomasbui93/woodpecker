const { config } = require('dotenv')

config()

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
      "build/entity/**/*.js"
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
