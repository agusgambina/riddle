const dotenv = require("dotenv")

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongoConfig = {
  url: process.env.MONGO_URL,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  dbName: process.env.MONGO_DBNAME,
}

mongoose.connect(mongoConfig.url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: mongoConfig.user,
  pass: mongoConfig.pass,
  dbName: mongoConfig.dbName,
  useFindAndModify: false
})

before(done => {
  mongoose.connection
  .on('open', () => {
    console.log('Mongoose is ready!')
    done()
  })
  .on('error', (error) =>  console.error.bind(console, 'connection error: ', error))
})


beforeEach(done => {
  mongoose.connection.collections.riddles.deleteMany({})
  .then(() => {
    done()
  })
})