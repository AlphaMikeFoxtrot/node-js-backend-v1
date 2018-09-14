const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const products = require("./api/routes/products");
const orders = require("./api/routes/orders");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:admin-password@node-js-api-rflau.mongodb.net/test?retryWrites=true")

app.use("/products", products);
app.use("/orders", orders);

app.use((req, res, next) => {
	const error = new Error("Page not found!");
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	})
})

app
	.use(express.static("public"))
	.listen(port, function() {
		console.log("listening for requests on port: " + port);
	})
