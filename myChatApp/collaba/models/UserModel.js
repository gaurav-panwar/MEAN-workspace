var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	uName: String,
	password: String,
	/*name: String,
	email: String,
	phone: Number*/
});


UserSchema.methods.getName = function() {
	return this.name;
}

var UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
 