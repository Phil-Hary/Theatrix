const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://phil:1234@messenger-vjyku.mongodb.net/test?retryWrites=true&w=majority';

const dbName = 'Theatrix';

MongoClient.connect(url,{ useUnifiedTopology: true },(err,client)=>{
	assert.equal(null,err);
	console.log("Connected Successfully");
	exports.db = client.db(dbName);
});
