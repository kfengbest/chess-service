const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('config');
const port = config.get('server.port');
const dbUrl = config.get('mongodb.url');

const routes = require('./routes');
const mongoose = require('mongoose');


mongoose.connect(dbUrl, { useNewUrlParser: true})
        .then(() => {
            console.log('mongodb connected.');

            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use('/api', routes);
            
            app.listen(port, () => {
                console.log(`Listening on port => ${port}`);
            });
        })

module.exports = app;