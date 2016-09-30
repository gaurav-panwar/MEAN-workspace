var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: String,
	password: String,
	name: String,
	phone: Number
});

var UserModel = mongoose.model('UserModel', UserSchema);


module.exports = UserModel;