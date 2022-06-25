const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const emailRoutes = require('./routes/emailRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const server = express();

// Logger
server.use(logger('short'));

// Cors
const whitelist = [process.env.CLIENT_ORIGIN_URL];
const corsOptions = {
	origin: function (origin, cb) {
		if (!origin) return cb(null, true);

		if (whitelist.indexOf(origin) !== -1) {
			return cb(null, true);
		} else {
			return cb(new Error('Not allowed by CORS'));
		}
	},
};

server.use(cors(corsOptions));

server.use('/payment/webhook', express.raw({ type: '*/*' }));
server.use(express.json());

// Routes
server.use('/items', itemRoutes);
server.use('/orders', orderRoutes);
server.use('/customers', customerRoutes);
server.use('/email', emailRoutes);
server.use('/payment', paymentRoutes);

server.use('/', (req, res) => {
	res.send('Backend is running.');
});

module.exports = server;
