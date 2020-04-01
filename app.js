'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

var app = express();

var APIKeys = {
    appId           : '40eb91d1-b18a-4648-b260-d37d87b9a2fb',
    clientId        : '16rne6pbteqrl980mzbckh0e',
    clientSecret    : 'CuKfVcy0A1ILbFAyHcEDLZC6',
    appSignature    : 'n4C6s0pEF4lA1ePrhFRHRXRfNBO_INV9S9Cnl_Jnpl5-E8B7C6f8wre7Wx5PJk5oCOsLWhQgW2dJ46qNtKcvWV_HSqusOxNWOkyYiYUSWv3tzxs39oZp0LgCCEE5dX99H2SYNh5fREIVtusZEHg8rwvK88qysk5wJOAkleaVJsRCV1FDRXSRNjqNPJa5TDw5Cqh0b1s_cbrICeHf1oXsy18H8KJQ4adDlnBjEGQXnrwcKRLMQIztMz_ePLUsJQ2',
    authUrl         : 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
};



// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.raw({type: 'application/jwt'}));
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
