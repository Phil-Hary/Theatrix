const config = require('./connection');
const sms = require('../api/sms');
const db = config.db;

//Validates user by checking username and password
const validateUser = (emailId, password) => {
	const db = config.db;
	const collection = db.collection('users');
	
	console.log(emailId+" "+password);
	
	return new Promise((resolve,reject)=>{
		collection.find({$and:[{"emailId":emailId},{"password":password}]}).toArray((err,data)=>{
			if(data.length == 1){
				console.log(data);
				resolve(0);
			}
			
			else{
				console.log("error occurred");
				reject(1);
			}
		})
	});
	
}

//Used to register a new user, here the otp is formed dynamically and added to
//the db
const addUser = (name,password,phoneNo,emailId,city,otp)=>{
	const db = config.db;
	const collection = db.collection('users');
	
	return new Promise((resolve,reject)=>{
				
		/*const from = 'Theatrix';
		const to = '919841604230';
		const text = 'Hello from Nexmo';

		sms.nexmo.message.sendSms(from, to, text);*/
		
		collection.insert({
			"userName":name,
			"password":password,
			"phoneNo":phoneNo,
			"emailId":emailId,
			"city":city,
			"otp":otp,
			"verified":"No"
		},(err,data)=>{
			if(err)
				reject("Can't add user");
			else{
				resolve("User added");
			}
		});
	});
}

//Here the otp is validated, and if valid verified field is updated
// in the db
const validateOtp = (emailId,otp) => {
	const db = config.db;
	const collection = db.collection('users');
	
	return new Promise((resolve,reject)=>{
		collection.find({
			'emailId':emailId,
			'otp':otp
		},(err,data)=>{
			if(err)
				reject('Wrong Otp');
			else{
				console.log('Correct Otp');
				collection.update({
					'emailId':emailId,
				},
				{
					$set:{
						'verified':'Yes',
						'otp':null
					}
				},(err,data)=>{
					if(err){
						console.log("User not verified");
						reject("User verification failed");
					}
					else{
						console.log("User verified");
						resolve("Verified");
					}
				});
			}
		})
	});
}

exports.validateUser = validateUser;
exports.addUser = addUser;
exports.validateOtp = validateOtp;
