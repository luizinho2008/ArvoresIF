const express = require("express");
const connexionDB = require("./config/conexaodb");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.set('json spaces', 2);

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
});

app.post("/api/arvores", (req, res) => {
    const sql = `INSERT INTO arvores(nome, nomecientifico, descricao, latitude, longitude, imagem)
    VALUES('${req.body.nome}', '${req.body.nomeCientifico}', '${req.body.descricao}',
    '${req.body.latitude}', '${req.body.longitude}', '${req.body.linkImagem}')`;

    connexionDB.query(sql, (erro, resultados) => {
        if(erro) {
            res.send(`<h2>Ocorreu um problema na gravação do banco de dados: ${erro}</h2>`);
        }
        else {
          res.send(resultados);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando com express na porta ${port}`);
});