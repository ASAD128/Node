var mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
	text:{
	type:String,
	required:true,
	minlenght:1,
        trim:true
	},
	completed:{
	type:Boolean,
	default:false
	},
	completedAt:{
	type:Number,
	required:true
	}

});

var otherTodo= new Todo({
	text:'Eat Dinner',
	completed:false,
	completedAt:123
});

otherTodo.save().then((doc)=>{
console.log(JSON.stringify(doc,undefined,2));
},(e)=>{
console.log('Unable to save to db');
});
