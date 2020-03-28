const nodemailer = require('nodemailer');
const props = require('../properties');


const mailer = (userName, emailId, otp) => {
	
	const theatrixEmail = props.offEmailId;
	const theatrixPassword = props.offPassword;
	
	let transporter =  nodemailer.createTransport({
			
		/*auth: {
			type: 'OAuth2',
			user: theatrixEmail,
			clientId: props.offClientId
		  },
		  AgAAAAA-1DpyAAY_NzJ0C7AFv0Hhp6GMk3YpoSs
		  host: "pop.yandex.com",
		  service: 'yandex',
		  port:465,
		  secure:false,
		  tls: {
			 rejectUnauthorized: false
		  }*/
		  
		  service: 'Gmail',
		  secure:true,
		  /*auth: {
			  XOAuth2:{
				user: theatrixEmail,
				clientId: '124685571641-bj58mm26hk5j8u1ot94opf57casq4nvs.apps.googleusercontent.com',
				clientSecret: 'hLp32kuC3mrvxIxZwU3u_IME',
				refreshToken:'1//041yKCbzLRNRkCgYIARAAGAQSNwF-L9Ir72PLd9b1cR5VpjobI1og_84HopJF7-4MZzg5vXogcikUbMgVitaaW8i7JoPOhsKe1vU'
			  }
		  }*/
		  
		  auth:{
			  type: "OAuth2",
			  user: "project9237@gmail.com",
			  clientId: "124685571641-bj58mm26hk5j8u1ot94opf57casq4nvs.apps.googleusercontent.com",
			  clientSecret: 'hLp32kuC3mrvxIxZwU3u_IME',
			  refreshToken: '1//04nF800N-wXH6CgYIARAAGAQSNwF-L9IrihSG3cG4IrPR5bkxDhlHcGWxa9JzEFsnTwVVCPmnE3a0yt_B2wFzPXKL-pVCSYokxMA',
			  accessToken: 'ya29.a0Adw1xeWw7TicJ7FhzSFkvZ9Sf8uhICsYPml3xqfCu7PT3W_HmYM2mEpD4tfSdLazT1iAv4nDnyVAFTyaq-ZpTbkd9yLVmlFfVlmT3wBKLnoy9CgyM8LQzPZ-x3Cp7XZAFNQZ1-70dJ2IdsDkQsutGZI-WfJasVvCFSk',
			  expires: 3599
		  }
		});
	
	
	const mailOptions = {
		  from: theatrixEmail,
		  to: emailId		,
		  subject: 'Sending Email using Node.js',
		  text: 'Hi ' + userName + ' Here is your OTP : ' + otp,
		  html:"<p>Hello</p>"
	}
	
	
	
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
	 
}


exports.mailer = mailer;
