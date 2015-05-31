var users = require('./../server/controllers/users.js');
module.exports = function Routes(app, io){
 app.get('/', function(req,res) { users.index(req,res) });

  app.get('/users/new_user', function(req, res){ 
 	users.new_user(req,res) 
 })

 app.get('/users/:id', function(req,res) { 
 	users.show(req,res) 
 })

 app.get('/profile/:id', function(req,res) { 
 	users.profile(req,res) 
 })
 
 app.get('/users/logout', function(req,res) { 
 	users.logout(req,res) 
 })
 // app.get('/users', function(req,res) { users.index(req,res) });
 
 app.post('/users/help_me', function(req,res){
 	console.log('in the login route');
 	users.help_me(req, res)
 })


 app.post('/users/create', function(req,res) { 
 	 
 	users.create(req,res) 
 })
 
 app.post('/users/add_like', function (req, res) { 
 	console.log(req.body) 
 })

 app.post('/users/askQuestions', function (req, res) { 
 	users.askQuestions (req, res) 
 })
 // app.get('/users', function(req,res) { users.index(req,res) });
 // app.get('/users/index.json', function(req,res) { users.index_json(req,res) });
 // app.post('/users', function(req,res) { users.create(req,res) });
 // app.get('/users/:id', function(req,res) { users.show(req,res) });
 // app.get('/users/:id/edit', function(req,res) { users.edit(req,res) });
 // app.post('/users/newUser_json', function(req,res) { users.newUser_json(req,res) });
};