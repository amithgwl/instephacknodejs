var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

var productsSchema = new Schema({}, {
		collection: 'products'
	});

var productsModel = mongoose.model('productsModel',productsSchema);


var vehiclesSchema = new Schema({}, {
	collection: 'vehicles'
});

var vehiclesModel = mongoose.model('vehiclesModel',vehiclesSchema);


var usersSchema = new Schema({}, {
	collection: 'users'
});

var usersModel = mongoose.model('usersModel',usersSchema);


var ordersSchema = new Schema({}, {
	collection: 'orders'
});

var ordersModel = mongoose.model('ordersModel',ordersSchema);


var pharmacySchema = new Schema({}, {
	collection: 'pharmacy'
});

var pharmacyModel = mongoose.model('pharmacyModel',pharmacySchema);

var recipesSchema = new Schema({}, {
	collection: 'recipes'
});

var recipesModel = mongoose.model('recipesModel',recipesSchema);

mongoose.connect('mongodb://admin:password123@ds235711.mlab.com:35711/instephack');

app.get('/getproducts', cors(), function (req, res) {
	console.log(JSON.stringify(req.query));
	productsModel.find({$and:[req.query]}, function (err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	}).sort({'rating':-1})
})

app.get('/getrecipes', cors(), function (req, res) {
		recipesModel.find({$and:[req.query]},function (err, result) {
			if (err) throw err;
			if (result) {
				res.json(result)
			} else {
				res.send(JSON.stringify({
					error: 'Error'
				}))
			}
		}).sort({'rating':-1})
	})





var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('Node.js listening on port ' + port);
});


app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});
