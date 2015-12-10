'use strict';

var router = require('express').Router(),
	_ = require('lodash');
var HttpError = require('../../utils/HttpError');
var User = require('./user.model');

var counter = 0;

router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
		console.log(req.body);
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(req.session.userid);
	})
	.then(null, next);
});

router.post('/login', function (req, res, next) {
	User.findOne({email: req.body.email, password: req.body.password})
	.then(function (user) {
		if(user){
				req.session.userid = req.body.email;
			res.status(200).json(req.session.userid);
		}else{
			 res.status(401).send("Aint found")
		}
	})
	.then(null, next);
});

router.post('/logout', function(req, res, next) {
		console.log(req.session.userid);
		req.session.userid = null;
		console.log(req.session.userid);
		res.status(200).end();
});

router.get('/:id', function (req, res, next) {
	req.requestedUser.getStories()
	.then(function (stories) {
		var obj = req.requestedUser.toObject();
		obj.stories = stories;
		res.json(obj);
	})
	.then(null, next);
});

router.get('/auth/me', function(req, res, next) {
		console.log("name of user on connection: ", req.session.userid);
	User.findOne({email: req.session.userid}).then(function( matchUser) {
			res.send(matchUser);
	});
});

router.put('/:id', function (req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;
