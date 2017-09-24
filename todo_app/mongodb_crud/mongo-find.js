const {MongoClient, ObjectID} = require('mongodb');

	MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
	if(error)
	{
		return console.log('Failed to connect to db');
	}
	console.log('Connect successfully established to db');

	db.collection('Users').find({_id: new ObjectID('59c5f682e1334923c57d644c')}).toArray().then((docs)=>{
	console.log(JSON.stringify(docs));
	},(err)=>{
		return console.log('Unable to insert data into db');
	});

	db.close();
	});
