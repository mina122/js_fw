exports.mail_get = function(req, res){
	var app = req.app;
	
	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}

	var transporter = nodemailer.createTransport({
	    host: 'smtp.mandrillapp.com',
	    port: 587,
	    auth: {
	        user: 'YOUR USER',
	        pass: 'YOUR PASS'
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
};