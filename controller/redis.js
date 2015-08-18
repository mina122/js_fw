exports.redis_get = function(req,res){
    /*var app = req.app;
	var base_data = {
        'base_url':app.get('base_url'),
        'public':app.get('public')
    }*/
    
    var redis = require('redis');
    var host = '127.0.0.1'; 
	var port = '6379';
	var client = redis.createClient(port,host);
    
    client.on('connect', function() {
	    console.log('connect');
	    client.set('jannes', 'Santoso');
		client.get('jannes', function(err, reply) {
		    console.log(reply);
		    res.send(reply);
		});
	});

}