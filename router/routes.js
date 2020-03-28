const express = require('express');
const router = express.Router();
const login = require('../middlewares/login');
const bodyParser = require('body-parser');

/*router.use('/',(req,res)=>{
	res.send("Hi");
});*/



router.post('/user/checkUser',(req,res)=>{
	
	const emailId = req.body.emailId;
	const password = req.body.password;
	
	console.log(req.body.emailId);
	
	login.checkUser(emailId, password)
		.then((data)=>{
			console.log(data);
			res.send("You can proceed");
		})
		.catch((data)=>{
			console.log(data);
			res.send("Forget it");
		});
	
});

router.post('/user/addUser',(req,res)=>{
	const name = req.body.name;
	const password = req.body.password;
	const phoneNo = req.body.phoneNo;
	const emailId = req.body.emailId;
	const city = req.body.city;
	
	login.regitserNewUser(name,password,phoneNo,emailId,city)
		.then((data)=>{
			console.log(data);
			res.send('Registered');
		})
		.catch((data)=>{
			console.log(data);
			res.send('User exists I guess');
		});
});

router.post('/user/checkOtp/',(req,res)=>{
	
	const emailId = req.body.emailId;
	const otp = req.body.otp;
	
	login.checkOtp(emailId,otp)
		.then((data)=>{
			res.send("Verified");
		})
		.catch((data)=>{
			res.send("Verification failed");
		})
	
	
});

module.exports = router;

