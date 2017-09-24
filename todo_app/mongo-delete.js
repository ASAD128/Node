const {MongoClient, ObjectID} = require('mongodb');

	MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
	if(error)
	{
		return console.log('Failed to connect to db');
	}
	console.log('Connect successfully established to db');

	db.collection('Users').deleteOne({Name: 'Awais'}).then((result)=>{
	console.log(result);
	});

	//db.collection('Users').deleteMany({Name: 'Awais'}).then((result)=>{
	//console.log(result);
	//});

	db.collection('Users').findOneAnddelete({Name: 'Awais'}).then((result)=>{
	console.log(result);
	});

	db.close();
	});
