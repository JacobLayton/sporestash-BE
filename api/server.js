const express = require('express');

const server = express();

server.use('/', (req, res) => {
    res.send('Backend is running.');
});

module.exports = server;