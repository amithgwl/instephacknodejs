const express = require('express'),
	http = require('http'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	nodemailer = require('nodemailer'),
	socketIo = require('socket.io'),
	app = express(),
	server = http.Server(app);


var Schema = mongoose.Schema;
var mypass = '1si12mcA11!';

const io = socketIo(server);

var productsSchema = new Schema({}, {
	collection: 'products'
});

var productsModel = mongoose.model('productsModel', productsSchema);


var vehiclesSchema = new Schema({}, {
	collection: 'vehicles'
});

var vehiclesModel = mongoose.model('vehiclesModel', vehiclesSchema);


var usersSchema = new Schema({}, {
	collection: 'users'
});

var usersModel = mongoose.model('usersModel', usersSchema);


var ordersSchema = new Schema({}, {
	collection: 'orders'
});

var ordersModel = mongoose.model('ordersModel', ordersSchema);


var pharmacySchema = new Schema({}, {
	collection: 'pharmacy'
});

var pharmacyModel = mongoose.model('pharmacyModel', pharmacySchema);

var recipesSchema = new Schema({}, {
	collection: 'recipes'
});

var recipesModel = mongoose.model('recipesModel', recipesSchema);

mongoose.connect('mongodb://admin:password123@ds235711.mlab.com:35711/instephack');

app.get('/getproducts', cors(), function (req, res) {
	console.log(JSON.stringify(req.query));
	productsModel.find({ $and: [req.query] }, function (err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	}).sort({ 'rating': -1 })
})

app.get('/getrecipes', cors(), function (req, res) {
	recipesModel.find({ $and: [req.query] }, function (err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	}).sort({ 'rating': -1 })
})





//placeOrder post api which sends email
app.post('/placeorder', cors(), function (req, res) {

	productsModel.find({ '_id': '5b4ded6ae7179a6b73f2f427'}, function (err, result) {
		if (err) throw err;
		if (result) {
			nodemailer.createTestAccount((err, account) => {
				let transporter = nodemailer.createTransport({
					host: 'smtp.gmail.com',
					port: 587,
					secure: false,
					auth: {
						user: 'amithnraus@gmail.com', 
						pass: mypass 
					}
				});
		
				let mailOptions = {
					from: '"TeamEnigma - InStepHacks" <amithnraus@gmail.com>', // sender address
					to: 'amithnr@hotmail.com, chetanniyan@gmail.com', // list of receivers 
					subject: 'Your order has been placed. Please Review.', // Subject line
					text: '', // plain text body
					html: '<h2>InStepHacks Infosys</h2><br><h3>Product Details</h3><br><img src=\'https://res.cloudinary.com/driksqrrv/image/upload/v1531896133/1_lml1kg.jpg\' height=\'100\' width=\'100\'><br><b>color: </b> pink <br><b>Store: </b>amazon warehouse manhattan <br><b>Quantity: </b>3<br><b>Brand: </b>adidas'
					};
		
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					res.send({
						success: 'true',
						message: 'Email Sent'
					})
				});
			});
		} else {
			res.send(JSON.stringify({
				error: 'Error'
			}))
		}
	})



	
})


app.get('/getalexa', cors(), function (req, res) {
	io.emit('alexacall', req.param('url'));
	res.send({
		success: 'true',
		message: 'Please check you app'
	})
})

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

server.listen(8080);
