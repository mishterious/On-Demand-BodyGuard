var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email_address:  String,
  password:  String,
  open_to_roommates: String,
  about: String,
  text_analysis: String,
  location: String,
  budget: Number,
  consc: Number,
  excite: Number,
  self: Number,
  url: String,
  created_at: Date
});

module.exports = mongoose.model('User', UserSchema);