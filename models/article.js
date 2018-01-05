var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Articles = new Schema({
	title: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	issaved: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

Articles.index({title: "text"});

var Article  = mongoose.model("Article", Articles);
module.exports = Article;