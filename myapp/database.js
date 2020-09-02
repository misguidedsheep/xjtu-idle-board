var mysql = require('mysql')
function Database(){
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Zhh5101806.',
        database: 'hello'
    });
};

Database.prototype.connect = function(){
    this.connection.connect(function(err){
        if(err){
            console.log('ERROR: Database connection: ' + err.stack);
            return;
        }
    });
    console.log('Connected to Database: ' + this.connection.host)
};

Database.prototype.end = function(){
    this.connection.end();
};

var database = new Database();

module.exports = database;


 
// connection.query('SELECT * FROM ITEM_INFO WHERE ITEM_ID=1', function(err, rows, fields){
//     if (err) throw err;
//     console.log(rows[0].item_id) 
// })
