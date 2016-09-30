angular.module('todoApp', [])
	.controller('TodoListController', function() {
		var todoList = this;
		todoList.todos = [
		{text:"Learn Angular JS", done:true},
		{text:"Build an Angular app", done:false}];

		//function to add new Todos
		todoList.addTodo = function() {
			todoList.todos.push({text:todoList.todoText, done:false});
			todoList.todoText = '';
		};

		//Function to count remaining todos
		todoList.remaining = function() {
			var cnt = 0;
			todoList.todos.forEach(function(todo) {
				cnt += todo.done?0:1;
			});
			return cnt;
		};

		//Function to delete done todos
		todoList.archive = function() {
			var oldTodos = todoList.todos;
			todoList.todos = [];
			oldTodos.forEach(function(todo) {
				if(!todo.done) todoList.todos.push(todo);
			});
		};
	});