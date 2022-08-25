'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT;
const authRoute = require('./routes/auth');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const internalServerError = require('./error-handlers/500')
const notfound = require('./error-handlers/404')

const app = express();
//db
mongoose
    .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB Connected'))
    .catch((err) => {
        console.log(err)
    });
// middlewar
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes
app.use('/api', authRoute);
app.use(internalServerError)
app.use('*', notfound)
app.listen(port, () => {
    console.log('listening on port ' + port);
})