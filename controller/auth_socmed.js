exports.get_twitter = function(req, res){
	var app = req.app;
	
	var base_data = {
		'base_url':app.get('base_url'),
		'public':app.get('public')
	}

	// passport //
	var passport = require('passport');

	var TwitterStrategy = require('passport-twitter').Strategy;
	var TWITTER_CONSUMER_KEY = "sigE4wRu4GOThBCkwAvdw";
	var TWITTER_CONSUMER_SECRET = "V4Drt6Ts7rycGD4ArdIpXNyHnSt82qa0Vc5IWTO4vqo";
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});
	// passport //

	passport.use(new TwitterStrategy({
	    consumerKey: TWITTER_CONSUMER_KEY,
	    consumerSecret: TWITTER_CONSUMER_SECRET,
	    callbackURL: "http://127.0.0.1:3030/auth/twitter/callback"
	  },
	  function(token, tokenSecret, profile, done) {
	    // asynchronous verification, for effect...
	    process.nextTick(function () {
	      
	      // To keep the example simple, the user's Twitter profile is returned to
	      // represent the logged-in user.  In a typical application, you would want
	      // to associate the Twitter account with a user record in your database,
	      // and return that user instead.
	      return done(null, profile);
	    });
	  }
	));

	app.use(passport.initialize());
  	app.use(passport.session());

  	res.send("tes");
	
};