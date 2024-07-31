const express = require("express");
const connexionDB = require("./config/ConexaoBancoDeDados");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h2>Árvores IF</h2>");
});

app.get("/consultaarvore", (req, res) => {
    const sql = "SELECT * FROM arvores";

    connexionDB.query(sql, (erro, resultados) => {
        if(erro) {
            res.send(`<h2>Falha ao exibir árvores: ${erro}</h2>`)
        }
        else {
            res.send(resultados);
        }
    });
});

app.get("/consultaarvore/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM arvores WHERE id = ${id}`;

    connexionDB.query(sql, (erro, resultados) => {
        if(erro) {
            res.send(`<h2>Falha ao exibir árvores: ${erro}</h2>`)
        }
        else {
            res.send(resultados);
        }
    });
});

app.get("/deletaarvore/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM arvores WHERE id = ${id}`;

    connexionDB.query(sql, (erro, resultados) => {
        if(erro) {
            res.send(`<h2>Falha ao deletar árvores: ${erro}</h2>`)
        }
        else {
            res.send(`<h2>Registro deletado com sucesso</h2>`);
        }
    });
});

app.post("/gravaarvore", (req, res) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    const sql = `INSERT INTO arvores(nome, descricao, latitude, longitude)
    VALUES('${nome}', '${descricao}', '${latitude}', '${longitude}')`;

    connexionDB.query(sql, (erro, resultados) => {
        if(erro) {
            res.send(`<h2>Falha ao inserir registro: ${erro}</h2>`)
        }
        else {
            res.send(`<h2>Registro inserido com sucesso</h2>`);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando com express na porta ${port}`);
});