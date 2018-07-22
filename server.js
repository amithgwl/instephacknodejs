var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var Schema = mongoose.Schema;
var mypass='1si12mcA11!';

var app = express();

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
	// 'use strict';
	

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'amithnraus@gmail.com', // generated ethereal user
				pass: mypass // generated ethereal password
			}
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: '"teamenigma 👻" <teamenigma@gmail.com>', // sender address
			to: 'amithnr@hotmail.com, amithnr@gmail.com, chetanniyan@gmail.com', // list of receivers
			subject: 'Your order has been placed', // Subject line
			text: 'Hello world?', // plain text body
			html: '<b>Hello world?</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		});
	});
})






//end



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
