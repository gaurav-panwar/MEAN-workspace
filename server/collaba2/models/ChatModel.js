//Chat Schema for storing chats into the Database
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	conversationId:String,
	user1: String,
	user2: String,
	conversation: [{
		sender: String,
		message: String,
		timestamp: { type: Date, default: Date.now }
	}]
	
});


var ChatModel = mongoose.model('ChatModel', ChatSchema);


module.exports = ChatModel;