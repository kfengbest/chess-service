const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('config');
const port = config.get('server.port');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Listening on port => ${port}`);
});

module.exports = app;