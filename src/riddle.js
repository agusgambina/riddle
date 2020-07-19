const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const riddleSchema = new Schema({
  title: { type: String, unique : true, required : true},
  question: String,
  answer: String,
  tags: [String],
});

const Riddle = mongoose.model('riddle', riddleSchema)

module.exports = Riddle