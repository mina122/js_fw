exports.mail_get = function(req, res){
	var app = req.app;
	
	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}

	var nodemailer = require('nodemailer');

	/*var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'jannessantoso@gmail.com',
	        pass: 'pass'
	    }
	});

	var mailOptions = {
	    from: 'Jannes Santoso ✔ <jannessantoso@gmail.com>', // sender address
	    to: 'jannes_santoso12@yahoo.com, jannes@dragoncapital.center', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});*/

	var transporter = nodemailer.createTransport({
	    host: 'smtp.mandrillapp.com',
	    port: 587,
	    auth: {
	        user: 'ali@dragoncapital.center',
	        pass: 'g0fu49dAZNcZMzxwA1XqpA'
	    }
	});

	var mailOptions = {
	    from: 'Jannes Santoso ✔ <jannessantoso@gmail.com>', // sender address
	    to: 'jannes_santoso12@yahoo.com, jannes@dragoncapital.center', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world ✔', // plaintext body
	    html: '<b>Hello world ✔</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
	
	res.send('OK');

	/*MAIL_DRIVER=smtp

	MAIL_HOST=smtp.mandrillapp.com

	MAIL_PORT=587

	MAIL_USERNAME=ali@dragoncapital.center

	MAIL_PASSWORD=g0fu49dAZNcZMzxwA1XqpA*/
};