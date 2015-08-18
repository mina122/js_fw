exports.get = function(req, res){
	var request = req.request;
	var url = "http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/matas/hobnotropic&client_id=91bf99f6855ea4e6b5169e5d08346e60";
	var fs = req.fs;

	var options = {
	    'url': url,
	    /*'auth': {
	        'user': 'test',
	        'pass': 'test',
	        'sendImmediately': false
	    }*/
	};
	request(options,function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			res.render("curl/curl",{data:"data",test:body});
			console.log(body);
		  }else{
		  	console.log(error);
		  	console.log(response.statusCode);
		  }
	});
	
};

exports.post = function(req, res){
	var request = req.request;
	
	var json = JSON.stringify(req.body);
	var input = JSON.parse(json);
	
	request.post({url:'http://52.10.18.106/db_1/table_1/', form:json}, function(err,httpResponse,body){
		if(httpResponse.statusCode == '201' && !err){
			res.redirect('/curl');
		}else{
			console.log(error);
			console.log(error);
		}
	});
};