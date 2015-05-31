var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('./config/mongoose');
// var chats = [];
// var users = [];
var http = require('http');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./config/routes')(app);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'), function(){
    console.log("cool stuff on "+ app.get('port'));
});
// var server = app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + server.address().port);
// });

// var io = require('socket.io').listen(server);


// io.sockets.on('connection', function (socket){
//     socket.emit('chat_history', chats);
//     socket.on('set_username', function(name){
//         var new_user = 
//         {   id : socket.id,
//             name : name     };
//         users.push(new_user);
//         // chats = [];
//         io.emit("users_in_chat", users);
//         socket.emit("join", chats);
//         socket.broadcast.emit('user_joined', name);
//     });
//     socket.on('new_message', function(data){
//         chats.push(data);
//         io.emit("chat_history", chats);
//     })
//     socket.on('disconnect', function(){
//         for(var i=0; i<users.length; i++){
//             if(users[i] && socket.id === users[i].id){
//                 users.splice(i,1);
//                 io.emit("users_in_chat", users);
//             }
//         }
//     });



// })