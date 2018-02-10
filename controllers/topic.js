// Dependencies
const mongoose = require('mongoose');
const async    = require('async');

const Topic = mongoose.model('Topic');
const User  = mongoose.model('User');
const Stage = mongoose.model('Stage');

// ------------------------------------------------------------------

module.exports.add = function(req, res) {

	async.waterfall([

		// Create new topic
		function(callback) {

			let new_topic = new Topic({
				name: req.body.topic
			});

			Topic.findOne().sort('-order').exec(function(err, topic){
				if (err) return callback(err, null);
				if (topic == null) new_topic.order = 1;
				else new_topic.order = topic.order + 1;

				callback(null, new_topic);
			});
		}

	// Save new topic	
	], function (err, topic) {
		if (err) return next({message: err});

		topic.save(function(err, topic){
			if (err) return next({message: err});
			res.json({ 
				name : topic.name,
				order : topic.order
			});
		});
	});
};

// ------------------------------------------------------------------

module.exports.update = function(req, res) {
	
	Topic.findOneAndUpdate(
		
		{ name: req.body.old_name },
		{ $set: { name: req.body.new_name} },
		{ new: true },
		
		function(err, topic) {
			if (err) return next({message: err});
			res.json({ 
				name : topic.name,
				order : topic.order
			});
		}
	);
};

// ------------------------------------------------------------------

module.exports.remove = function(req, res) {
	
	Topic.findOneAndRemove({name: req.body.topic})
	.exec(function (err, topic) {
		if (err) return next({message: err});
		if (!topic) if (err) return res.json({error: 'Not Found!' });
		
		res.json({ status: true });
	});
};

// ------------------------------------------------------------------

module.exports.get = function(req, res, next) {

	async.parallel({

		// Find all topics
		all: function(callback) {

			Topic.find().exec(function(err, all){
				if (err) return callback(err, null);
				callback(null, all);
			});

		},

		// Find allowed topics
		user : function(callback) {

			User.findById(req.user._id)
				.populate('waiter.stage')
				.populate('waiter.topic')
				.populate('locked.topic')
				.populate('completed.topic')
				.populate('exam.topic')

			.exec(function(err, user) {
				if (err) return callback(err, null);
				callback(null, user);
			});

		}

	}, function(err, result) {

		if (err) return next({ message: err });

		let user = result.user;
		req.topics = {
			
			waiter: {
				type:"wait",
				name: "Wait",
				timer: true,
				items: user.waiter },

			exam: {
				type:"exam",
				name: "Exam",
				timer: true,
				items: user.exam },

			completed: {
				type:"completed",
				name: "Completed",
				timer: false,
				items: user.completed },

			locked: {
				type:"locked",
				name: "Locked",
				timer: false,
				items: user.locked }
		};
		
		next(); 

	});
};
