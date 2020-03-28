const express = require('express');
const app = express();
const router = require('./router/routes');
const bodyParser = require('body-parser');

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',router);
app.listen(5000);

console.log("Server up");
