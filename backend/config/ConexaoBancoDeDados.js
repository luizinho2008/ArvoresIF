const mysql = require("mysql");

const host = "localhost";
const database = "meioambiente";
const user = "root";
const password = "";

const connexionDB = mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
});

connexionDB.connect((erro) => {
    if(erro) {
        console.log("Falha ao se conectar com o banco de dados" ,erro);
    }
    else {
        console.log("Conexão com banco de dados feita com sucesso");
    }
});

module.exports = connexionDB;