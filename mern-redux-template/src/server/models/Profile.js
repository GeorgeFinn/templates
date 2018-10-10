const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  username: {
    type: String,
    required: true,
    max: 30
  },
  item: {
    type: String,
    required: true
  },
  itemList: {
    type: [String],
    required: true
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
