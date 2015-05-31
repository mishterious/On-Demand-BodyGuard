var User = require('./../models/user');
var watson = require('watson-developer-cloud-alpha');
var Twitter = require('twitter');
var threeTapsClient = require('3taps');

module.exports = (function() {
  return {
    index: function (req, res) {
      res.render('index');
    },

    new_user: function(req,res){
        console.log('112312321');
        res.render('new_user');
    },

    create: function (req, res) {
        console.log(req.body);
        if (req.body.password === req.body.confirm_password){
        	var user = User.findOne({ email_address: req.body.email_address }, function (err, user) {
        		if(user === null) {
        			user = new User(req.body);
                    user.text_analysis = req.body.about+" "+req.body.hobbies1+" "+req.body.hobbies2+" "+req.body.hobbies3+" "+req.body.hobbies4; 
        			user.created_at = new Date();

                    var user_modeling = watson.user_modeling({
                        username: 'ac7eeb81-13d6-45b3-ab09-2112c23d8d31',
                        password: '7EduDrdA6JZs',
                        version: 'v2'
                    });

                    user_modeling.profile({
                        text: user.text_analysis }, 
                        function (err, response) {
                            console.log('test');
                            if (err) {
                                console.log('error', err);
                            }
                            else {
                                console.log('found');
                                user.consc = response.tree.children[0].children[0].percentage;
                                user.excite = response.tree.children[1].children[0].percentage;
                                user.self = response.tree.children[2].children[0].percentage;
                                console.log(user,"this is the user");
                                user.save(function (err, results){
                                    if(err){
                                        console.log(err);
                                    }
                                    else {
                                        res.redirect('/users/'+user._id);
                                    }
                                });
                            }
                        });
                }
        		else {
        			console.log('login');
        			res.redirect('/');
        		}
        	});          
        }else {
            res.redirect('/');
        }
    },


    help_me: function(req,res){
            var close_users=[];
            res.render('listings', { users: close_users });
    },

    show: function (req, res) {
        // var client = new threeTapsClient({auth_token : '2ac73425ca4c16f4610dee6315283052'});
        //   options = {
        //     body : 'fixie',
        //     'location.city' : 'USA-SFO-SNF'
        //   },
         
        // threeTapsClient.search(
        //   options,
        //   function (err, data) {
        //     console.log(data, "hello");
        //     console.log(err, "error message, api");
        //   });
        console.log("BACK IN SHOW");

    	var users = {};
        var close_users=[];
    	User.findOne({ _id: req.params.id }, function (err, user) {
    		users.me = user;
    		User.find({}, function (err, all_users) {
                for(var i in all_users){
                    console.log(all_users);
                    console.log("BREAAAKKKKK");
                    console.log(users.me);
                    // if(Math.abs(all_users[i].consc-users.me.consc)<0.3 && all_users[i].email_address!= users.me.email_address){
                    //     if(Math.abs(all_users[i].excite-users.me.excite)<0.3 && all_users[i].email_address!= users.me.email_address){
                    //         close_users.push(all_users[i]);
                    //     }
                    // // }
                }
    			console.log(all_users);
    			res.render('listings', { users: close_users });
    		});
    	});
    },

    profile: function (req, res) {
        res.render('profile', {user: req.body});
    },

    logout: function (req, res) {
        res.redirect('/users');
    },

    askQuestions: function (req, res) {
    	console.log('test', req.body);
    	// var client = new Twitter({
    	// 	consumer_key: "lvkLsjQeEdG6rc79UYxWU2If0",
    	// 	consumer_secret: "UjGxFYq6uW6yT8P9mKjCecTh7Z5nSTyZJt627iHzFjo0rQhNkw",
    	// 	access_token: "477984503-qL6CsibDDG4ZhBVDG58rvh8vEFUlP7xtOHyDAFqN",
    	// 	access_secret: "cnikg67hRcA9mbO0h5n6BHJAh9mDPgry9rIQyHX503Drr"
    	// });

    	// var params = { screen_name: req.body.email_address };
    	// var my_tweets = client.get('statuses/users_timeline', params, function (error, tweets, response) {
    	// 	// console.log('ERROR', error);
    	// 	// console.log('tweets', tweets);
    	// 	// console.log('response', response);
    	// 	if (!error) {
    	// 		console.log(tweets);
    	// 		return tweets;
    	// 	}
    	// });

        var info = req.body.about + req.body.hobbies1 + req.body.hobbies2 + req.body.hobbies3 + req.body.hobbies4;
        console.log(info);

    	var user_modeling = watson.user_modeling({
    		username: 'ac7eeb81-13d6-45b3-ab09-2112c23d8d31',
       		password: '7EduDrdA6JZs',
    		version: 'v2'
    	});

    	user_modeling.profile({
    		text: info }, 
    		function (err, response) {
                console.log('test');
    			if (err) {
    				console.log('error', err);
    			}
    			else {
                    console.log(response.tree.children[0].children[0].percentage);
    				User.findOne({ email_address: req.body.email_address }, function (err, user) {
                        console.log('found');
    					user.consc = response.tree.children[0].children[0].percentage;
    					user.excite = response.tree.children[1].children[0].percentage;
    					user.self = response.tree.children[2].children[0].percentage;
                        console.log(user);
    					user.save(function (err) {
    						console.log('success');
    						res.redirect('/users/' + user._id);
    					})
    				})
    			}
    	});
    }

  }
})();