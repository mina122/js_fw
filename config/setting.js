exports.setting = function(app,express,helmet,io,busboy,hpp,fileupload,mysql,connection,fs,xssFilters,validator,jwt,http,https){
	var app = app;

	app.configure(function(){
	  app.use(express.cookieParser());
		app.use(express.session({
			secret:"jannes_santoso_secret_786858123",
	    key:"jannes_santoso_sessionID",
	    cookie:{
	      httpOnly:true,
	      secure:true,
	    },
			resave: true,
			saveUninitialized: true,
			maxAge: 60000,
			expires: true
		}));

	  app.use(helmet.csp({
	    'default-src': ["'self'"],
	    'connect-src': [
	      "'self'" , "blob:",
	      'wss:',
	      'websocket.domain',
	    ],
	    'font-src': ["'self'",'https://*.amazonaws.com',"https://*.ciayo.com"],
	    'img-src': ["'self'", 'data:'],
	    'style-src': ["'self'","maxcdn.bootstrapcdn.com",'https://*.amazonaws.com',"'unsafe-inline'"],
	    'script-src': ["'self'","'unsafe-inline'","'unsafe-eval'",'blob:','https://*.amazonaws.com'],
	    reportOnly: false,
	    setAllHeaders: false,
	    safari5: false
	  }));

	  io.on('connection', function(socket){
	     socket.on('chat message', function(msg){
	       io.emit('chat message', msg);
	     });
	  });

	  io.on('connection', function(socket){
	     socket.on('chat2', function(msg){
	       io.emit('chat2', msg);
	     });
	  });

	  app.use(busboy());
	  app.use(function(req,res,next){
	    req.fs = fs;
	    next();
	  });
	  
	   app.use(function(req,res,next){
	    req.xssFilters = xssFilters;
	    next();
	  });

	  app.use(function(req,res,next){
	    req.validator = validator;
	    next();
	  });
	   
	  app.use(hpp());

	  app.use(function(req,res,next){
	    req.jwt = jwt;
	    next();
	  });

	  app.use(function(req,res,next){
	    req.app = app;
	      next();
	  });

	});


	// app use for mongodb //
	/*app.use(function(req,res,next){
	    req.db = db;
	    next();
	});*/
	// app use for mongodb //

	// app use phplike //
	/*app.use(phplike);*/
	// app use phplike //

	// app use fileuplod //
	app.use(fileupload);
	// app use fileuplod //

	// http //
	app.use(function(req,res,next){
	    req.http = http;
	    next();
	});
	// http //

	// request //
	app.use(function(req,res,next){
	    req.request = request;
	    next();
	});
	// request //

	// mysql //
	app.use(
	    connection(mysql,{
	        host: 'localhost',
	        user: 'root',
	        password : 'Admin123!',
	        port : 3306, //port mysql
	        database:'nodejs'
	    },'pool') //or single, request
	);
	// mysql //

	// router //
	app.use(app.router);
	// router //

	app.use(function(req, res, next){
	  res.status(404);
	  if (req.accepts('html')) {
	    res.render('404', { url: req.url });
	    return;
	  }
	  if (req.accepts('json')) {
	    res.send({ error: 'Not found' });
	    return;
	  }
	  res.type('txt').send('Not found');
	});

	// socketio //;
	app.use(function(req,res,next){
		req.io = io;
	    next();
	});
	// socketio //

	// development only //
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	// development only //
}