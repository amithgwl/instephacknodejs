var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
	name: String,
	Id: String
});

module.exports = mongoose.model('product', ProductSchema);