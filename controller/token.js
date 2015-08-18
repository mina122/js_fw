exports.token_get = function(req, res){
	var app = req.app;
	var jwt = req.jwt;

	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}
	var token = jwt.sign({key:'Jannes Santoso'},'jannes_santoso_token_key');
	
	console.log(token);
	res.send(token);
};

exports.token_decode = function(req,res){
	var app = req.app;
	var jwt = req.jwt;
	var request = req.request;

	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}

	/*var enc = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJKYW5uZXMgU2FudG9zbyIsImlhdCI6MTQzOTI2NTIwM30.-00mi7s7L2XaDMKK6jqAH5g4S42EQAjTUYZMC2k9E0c";
	var decoded = jwt.verify(enc,"jannes_santoso_token_key");
	console.log(decoded);*/

	var url = "https://192.168.204.100";
	var key_jwt = "authenticate";
	var username = "SuperAdmin";
	var password = "superadmin";
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		try{
			var decoded = jwt.verify(body, key_jwt);
			res.send(decoded.key)
		}catch(err){
			console.log(1);
			console.log(err);
			console.log(body);
		}
	  }else{
	  	console.log(22);
	  	console.log(error);
	  	console.log(response.statusCode);
	  }
	}).auth(username,password);



	


	
};