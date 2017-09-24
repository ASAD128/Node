const {MongoClient, ObjectID} = require('mongodb');

	MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
	if(error)
	{
		return console.log('Failed to connect to db');
	}
	console.log('Connect successfully established to db');

	db.collection('Users').findOneAndUpdate(
	{ _id: new ObjectID('59c5f70b4c30e524338e81ca')},
	{
		$set :{
			Age:26
		}
	},
	{
		returnOrignal:false
	}).then((result)=>{
	console.log(result);
	});



	db.close();
	});
