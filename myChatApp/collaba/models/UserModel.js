var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: String,
	password: String,
	online: Boolean
	/*name: String,
	email: String,
	phone: Number*/
});


UserSchema.methods.getName = function() {
	return this.name;
}

var UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
 