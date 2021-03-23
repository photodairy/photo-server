const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String} ,
    pwd: { type: String}
  })



module.exports = mongoose.model('users', userSchema);