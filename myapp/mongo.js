//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://db_admin:BR3kpUS1bDft2Mkg@cluster0-ecxk7.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));