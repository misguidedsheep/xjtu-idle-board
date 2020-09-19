var mysql = require('mysql');
const constant = require('./private/constant');
function Database(){
    this.connection = mysql.createConnection({
        host: constant.DBHost,
        user: constant.DBUser,
        password: constant.DBKey,
        database: constant.DBdatabase
    });
};

Database.prototype.connect = function(){
    this.connection.connect(function(err){
        if(err){
            console.log('ERROR: Database connection: ' + err.stack);
            return;
        }
    });
    console.log('Connected to Database')
};

Database.prototype.end = function(){
    this.connection.end();
};

var database = new Database();

module.exports = database;
