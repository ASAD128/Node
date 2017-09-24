const {MongoClient, ObjectID} = require('mongodb');

	MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
	if(error)
	{
		return console.log('Failed to connect to db');
	}
	console.log('Connect successfully established to db');

	db.collection('Users').findOneAndUpdate(
	{ _id: new ObjectID('59c5f6d5fb7aca23ef47e826')},
	{
		$set :{
			Age:27
		}
	},
	{
		returnOrignal:false
	}).then((result)=>{
	console.log(result);
	});



	db.close();
	});
