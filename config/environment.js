exports.environ = function(app,express,helmet,path,compression){
	//app.disable("x-powered-by");
	app.use(helmet.hidePoweredBy({ setTo: "Don't You Even Try | Just Join Us broo.. Send Your CV in join@dragoncapital.center" }));
	app.set('port', process.env.PORT || 4300);
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'ejs');
	app.set('base_url','http://localhost:3030');
	app.set('public',path.join(__dirname, '../public'));
	// app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride("X-HTTP-Method-Override"));
	app.use(compression());
	app.use(express.static(path.join(__dirname, '../public')));
}