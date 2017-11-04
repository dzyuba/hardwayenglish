const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = Schema({
	name: { 
		type: String,
		unique: true,
		required: true
	},
	order: Number,
	rule: [{
		type: Schema.Types.ObjectId,
		ref: 'Rule'
	}]
});

module.exports = mongoose.model('Topic', topicSchema);