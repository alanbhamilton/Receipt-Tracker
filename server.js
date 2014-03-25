var config = require('./config.json'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./app/routes'),
    exphbs = require('express3-handlebars'),
    mongoose = require('mongoose'),
    // seeder = require('./app/seeder'),
    userDirs = require('./lib/userdirs'),
    app = express();

app.set('port', process.env.PORT || config.server.port);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: app.get('views') + '/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-value-here'));
app.use(app.router);
app.use('/', express.static(path.join(__dirname, config.server.public_dir)));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes list
routes.initialize(app);

// connect to the db server
mongoose.connect(config.mongoose.url);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log("\nMongoose connected to: " + config.mongoose.url);

  // boot up the server
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));

    // set up interval checks of user folders for added documents
    setInterval(userDirs.check(config.user_data.folder), 5000);
  });
});
