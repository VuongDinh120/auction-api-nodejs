const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/', function (req, res) {
    res.json({
        message: 'Hello, i am sakila'
    });
})

app.use('/api/actors', require('./routers/actor.route'));
app.use('/api/customers', require('./routers/customer.route'));

app.get('/err', function (req, res) {
    throw new Error('BROKEN');
})

app.use(function (req, res, next) {
    res.status(404).json({
        error_message: 'End-point not found!'
    });
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke!'
    });
})

const PORT = 3000;
app.listen(PORT, function () {
    console.log(`server is running at http://localhost:${PORT}`)
})