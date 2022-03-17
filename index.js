require('dotenv').config();

const server = require("./api/server.js");

const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`\n** Server runing on ${port} **\n`));