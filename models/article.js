var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Articleschema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true //we want unique titles. 
	},
	link: {
		type: String,
		required: true,
		unique: true //we want unique links. 
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

Articleschema.index({title: "text"});

var Article  = mongoose.model("Article", Articleschema);
module.exports = Article;