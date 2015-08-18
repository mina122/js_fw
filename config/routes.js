exports.rerute = function(app,path_controller,csrf){
	var app = app;
	var path_controller = path_controller;
	var csrfProtection = csrf({ cookie: true })

	var customers = require(path_controller+'customers');
	var mongo = require(path_controller+'mongo');
	var form_upload = require(path_controller+'form_upload');
	var json_get = require(path_controller+'json_get');
	var controller_curl = require(path_controller+'controller_curl');
	var controller_socket = require(path_controller+'socket');
	var controller_token = require(path_controller+'token');
	var controller_redis = require(path_controller+'redis');
	var controller_mail = require(path_controller+'mail');
	var controller_authsocmed = require(path_controller+'auth_socmed');
	var index = require(path_controller+'index');
	
	app.get('/', index.index);
	app.get('/customers', customers.list);
	app.get('/customers/add', csrfProtection, customers.add);
	app.post('/customers/add', /*parseForm, csrfProtection,*/ customers.save);
	app.get('/customers/delete/:id', customers.delete_customer);
	app.get('/customers/edit/:id', csrfProtection, customers.edit);
	app.post('/customers/edit/:id', /*parseForm, csrfProtection,*/ customers.save_edit);

	app.get('/mongo',mongo.list);
	app.get('/mongo/add',mongo.add);
	app.post('/mongo/add',mongo.post);
	app.get('/mongo/edit/:id([0-9a-f]{24})',mongo.edit);
	app.post('/mongo/edit',mongo.update);
	app.get('/mongo/delete/:id([0-9a-f]{24})',mongo.remove);
	app.get('/mongo/list_json',mongo.list_json);

	app.get('/form_upload/form',form_upload.form);
	app.post('/form_upload/upload',form_upload.upload);

	app.get('/json',json_get.list);

	app.get('/curl',controller_curl.get);
	app.post('/curl_post',controller_curl.post);

	app.get('/socket',controller_socket.get_socket);
	app.get('/socket2',controller_socket.get_socket2);
	app.get('/store_session',controller_socket.store_session);
	app.get('/get_session',controller_socket.list);

	app.get('/token',controller_token.token_get);
	app.get('/token/decode',controller_token.token_decode);

	app.get('/redis',controller_redis.redis_get);

	app.get('/mail',controller_mail.mail_get);

	app.get('/twitter',controller_authsocmed.get_twitter);
  
}
