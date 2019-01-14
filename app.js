var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config/config');




//importing routes
var apiUserRoutes = require('./routes/apiUserRoutes');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.use('/I/Want/', apiUserRoutes);




app.listen(process.env.port || config.serverPort, () => {
    console.log('Server is listening on port ' + config.serverPort || process.env.port);
})

module.exports = app;
