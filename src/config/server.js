const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// setting
app.set('port',3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

// middleware

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../../public')))

module.exports = app;
