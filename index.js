const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { authorRouter } = require('./authors');
const { bookRouter } = require('./books');

const app = express();
const server = http.createServer(app);
const port = 3200;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Index route
router.get('/', (req, res) => {
    res.status(200).send({
        message: 'Library API 1.0.0'
    })
});

// Authors Route
app.use('/authors', authorRouter(express.Router()));

// Books Route
app.use('/books', bookRouter(express.Router()));

// Routes not provisioned in the App
router.all('*', (req, res) => {
    res.status(404).send({
        message: 'Invalid route'
    });
});

app.use(router);

server.listen(port, (err) => {
    if (!err) return console.log(`App started on http://localhost:${port}`);
});

module.exports = app;