const express = require("express");
const connexionDB = require("./config/ConexaoBancoDeDados");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send("<h2>Árvores IF</h2>");
});

app.get("/api/arvores", (req, res) => {
    const sql = "SELECT * FROM arvores";

    connexionDB.query(sql, (erro, resultados) => {
        if(erro) {
            res.send(`<h2>Falha ao exibir árvores: ${erro}</h2>`)
        }
        else {
            res.send(resultados);
        }
    });
})

app.listen(port, () => {
    console.log(`Servidor rodando com express na porta ${port}`);
});