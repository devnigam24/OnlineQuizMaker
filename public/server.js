var express = require('express');
var mongoose = require('mongoose');

var app = express();
const port = 8081;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
}).listen(port, function() {
    console.log('\033[2J');
    console.log('Express listenng in ' + port);
});

app.get('/', function(req, res) {
    res.send('Server Succefully Started');
});

app.get('/api/', function(req, res) {
    res.send('Working');
});

app.get('/api/getOneUser', function(req, res) {
    const signUpUserSchema = new mongoose.Schema({
        'test': 'string'
    });
    const dataReturnedFromDb = createMongoConnection('quiz1').model('allRegisteredUsers', signUpUserSchema);
    dataReturnedFromDb.find(function(error, success) {
        if (error) return console.error("error");
        console.log("success");
        //mongoose.connection.close();
        res.send(success);
    });
});

function createMongoConnection(db) {
    const connection = mongoose.createConnection("mongodb://localhost/" + db, function(error, success) {
        if (error) {
            console.log("Error connecting to database: \n" + error);
        } else {
            console.log('Connected to Database');
        }
    });

    if (connection)
        return connection;
}
