var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log('Connected to Database.');
});


var Schema = mongoose.Schema;

var personSchema = new Schema({
	name: String,
	age: Number
});

//Adding a method to the schema
personSchema.methods.display = function() {
	var res = this.name + ", " + this.age;
	console.log("The Person Details : " + res);
}

var employee = mongoose.model('employee', personSchema);

var emp1 = new employee({name:"Gaurav", age:"22"});

console.log(emp1.name + "," + emp1.age);

var emp2 = new employee({name:"Divya"});

console.log(emp2.name + "," + emp2.age);
//console.log(emp2);//gives unique id automatically

emp1.save(function(err, emp1) {
	if(err) return console.error(err);
	console.log("Person Saved");
	emp1.display();
});

emp2.save(function(err, emp2) {
	if(err) return console.error(err);
	console.log("Person Saved");
	emp2.display();
});

employee.find({name:"Gaurav"}, function(err, emp) {
	if(err) return console.error(err);
	console.log(emp);
});