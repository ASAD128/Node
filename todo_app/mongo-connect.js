const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,db)=>{
	if(error)
	{
		return console.log('Failed to connect to db');
	}
	console.log('Connect successfully established to db');

	db.collection('Users').insertOne({
		Name:'Asad',
		Ade:25,
		Gender:'Male'
		},(err,result)=>{
		if(err)
		{
		    return console.log('Unable to insert data into db');
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});

	db.close();
	});


