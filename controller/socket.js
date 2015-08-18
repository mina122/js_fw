exports.get_socket = function(req, res){
	var app = req.app;

	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}

	res.render("socket/get",{base_data:base_data});
};

exports.get_socket2 = function(req, res){
	var app = req.app;

	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}

	res.render("socket/get2",{base_data:base_data});
};

exports.store_session = function(req, res){
	var sess = req.session;
	sess.name = "Ali TON"
	res.end("ok");
};

exports.list = function(req, res){
	var sess = req.session;
	
	res.send(sess);
};