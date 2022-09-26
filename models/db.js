// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database:"test",
//   multipleStatements:true
// });


// module.exports = db

const { Sequelize } = require('sequelize');
const db = new Sequelize('testmvc', 'root', '', {
  host: 'localhost',
  dialect:  'mysql' 
});

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = db;
