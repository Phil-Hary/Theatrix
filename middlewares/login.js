const db = require('../database/dbOperations');
const apiMailer = require('../api/mailer');

const checkUser = (emailId ,password) =>{

	return new Promise((resolve,reject)=>{
		db.validateUser(emailId, password)
			.then((data)=>{
				if(data == 0)
					resolve('User Exists');
			})
			.catch((data)=>{
				if(data == 1)
					reject('User does not exists');
			})
	});
	
}

const regitserNewUser = (name,password,phoneNo,emailId,city) =>{
	
	return new Promise((resolve,reject)=>{
		checkUser(name,password)
			.then((data)=>{
				console.log('User already exists');
				reject('User already exists');
			})
			.catch((data)=>{
				console.log('User does not exist.....hence procedding');
				
				//OTP generation
				
				const otpDigits = '0123456789';
				let otp="";
				
				for(let i=0;i<4;i++){
					otp += otpDigits[Math.floor(Math.random() * 10)];
				}
				
				console.log("Otp generated " + otp);
				
				//Generated OTP is inserted along with user details
				
				db.addUser(name,password,phoneNo,emailId,city,otp)
					.then((data)=>{
						resolve('User registered Successfully');
					})
					.catch((data)=>{
						reject('User registered successfully');
					})
				
				//Send email with generated Otp
				
				apiMailer.mailer(name,emailId,otp);
				
			})
	})
}

const checkOtp = (name,password,otp) =>{
	
	return new Promise((reject,resolve)=>{
		db.validateOtp(name,password,otp)
			.then((data)=>{
				resolve('User registered Successfully');
			})
			.catch((data)=>{
				console.log(data);
				reject('User cannot be vaildated');
			})
	})
}

exports.checkUser = checkUser;
exports.regitserNewUser = regitserNewUser;
exports.checkOtp = checkOtp;