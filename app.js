/**
 * Created By : Jannes Santoso
 * NodeJS : ExpressJS + EJS + Package Modifier Modular + Non Blocking IO Programming + Cluster Apps
 * FrontEnd Development
 * V.1.2
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var cluster = require('cluster');

if (cluster.isMaster) {
  var numCPUs = require('os').cpus().length;

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function() {
    console.log('A worker process died, restarting...');
    cluster.fork();
  });
} else {


/* S:Module dependencies. */
var http = require('http');
var https = require('https');
// var ports = seaport.connect('localhost',4300);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var controller = require('./controller');
var path = require('path');
var request = require('request');

// security //
var methodOverride = require('method-override');
var csrf = require('csurf');
var parseForm = bodyParser.urlencoded({ extended: false })
var xssFilters = require('xss-filters');
var validator = require('validator');
var hpp = require('hpp');
var helmet = require('helmet');
var jwt = require('jsonwebtoken');
// security //

// mongo connection //
/*var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');*/
// mongo connection //

// phplike //
var phplike = require('phplike');
// phplike //

// fileupload //
var fileupload = require('fileupload').createFileUpload('/uploads').middleware;
// fileupload //

// mysql //
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// mysql //

// socket io //
var io = require('socket.io')(server);
// socket io //

// busboy //
var busboy = require('connect-busboy');
// busboy //

// compression //
var compression = require('compression');
// compression //

// HTTP //
// var server = http.createServer(app);
// HTTPS //
var options = {
    key: fs.readFileSync('/etc/nginx/ssl/server.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/server.crt'),
    // key: fs.readFileSync('C:/cygwin64/home/jannes/node/apps/master/server.key'),
    // cert: fs.readFileSync('C:/cygwin64/home/jannes/node/apps/master/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
var server = https.createServer(options, app);
/* E:Module dependencies */

/* S:Environment */
var environment = require("./config/environment");
environment.environ(app,express,helmet,path,compression);
/* E:Environment */

/* S:Settings */
var settings = require("./config/setting");
settings.setting(app,express,helmet,io,busboy,hpp,fileupload,mysql,connection,fs,xssFilters,validator,jwt,http,https);
/* E:Settings */

/* S:Router */
var routes = require('./config/routes');
var path_controller = path.join(__dirname, 'controller/');
routes.rerute(app,path_controller,csrf);
/* E:Router */

var launcher = require('./launcher');
launcher.execute(app,server);

}