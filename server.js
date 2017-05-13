'use strict';

var app = require('express')();

var http = require('http').Server(app);
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);

//contains 
var config = require('./config.js');

//mongoose
var mongoose = require('mongoose');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error: '));
db.once('open', function(){
    console.log('database connected');
});

// //load schemas
// var message = require('./models/message.js');
// //creating a message
// var messageToSave = new message({
//   user:'dan',
//   message:'whats up?'
// });
// //saving a message
// messageToSave.save(function(err, doc){
//   if(err){
//     console.log(error);
//   }
//   else{
//     console.log("message saved sucessfully");
//   }
// });

// //twillio
// var client = require('twilio')(config.accountSid, config.authToken); 

// //twilio requires bodyParser to view and send text messages 
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));

// //creating a text message
// client.messages.create({    //send text message code
//     to: "+16107419998", 
//     from: "+18148063881", 
//     body: "app has been started ", 
// }, function(err, message) { 
//     console.log(message.sid); 
// });


//socket
var io = require('socket.io')(http);

app.get('/', function (req, res) {
res.sendFile(__dirname+ '/public/index.html');
    console.log('someone loaded homepage');
});
app.get('/*', function (req, res) {
    res.sendFile(__dirname+ '/public/'+req.path);
});

io.on('connection', function(socket) {
    socket.on('disconnect', function() {
        console.log('someone left');
    });
    socket.on('test', function(msg) {
        io.emit('test', msg);
    });
});

var server = http.listen(app.get('port') , function () {
    console.log('listening');
    console.log("Express server listening on port %d ", app.get('port'));
});
