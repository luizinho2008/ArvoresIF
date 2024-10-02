const carregaArvores = () => {
    const api = "http://localhost:5000/api/arvores";
    fetch(api)
    .then(resposta => {
        return resposta.json();
    })
    .then(resposta => {
        console.log(`Dados recebidos: ${resposta}`);
        exibeArvores(resposta);
    })
    .catch(erro => {
        console.log(erro);
        document.getElementById("arvores-container").innerHTML = "<h2 class='center corverde'>Falha ao fazer a consulta no MySQL</h2>";
    });
}

const exibeArvores = (resposta) => {
    let html = "";
    resposta.map(arvore => {
        html += `<div class='arvore-container'>
                    <img src='${arvore.imagem}' class='arvore-img' alt='imagem arvore'>
                    <h2 class='arvore-info corbranca'>(Nome: ${arvore.nome})
                        (Nome científico: ${arvore.nomeCientifico}) (Descrição: ${arvore.descricao})
                        (Latitude: ${arvore.latitude}) (Longitude: ${arvore.longitude}). <br> <br>
                    </h2>
                </div>`;
    });
    document.getElementById("arvores-container").innerHTML = html;
}

const gravaArvore = (event) => {
    event.preventDefault();
    const dados = {
        nome: document.getElementById('nome').value,
        nomeCientifico: document.getElementById('nomeCientifico').value,
        descricao: document.getElementById('descricao').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        linkImagem: document.getElementById('linkImagem').value,
    };
    const api = 'http://localhost:5000/api/arvores';
    fetch(api, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your-token-here',
        },
        body: JSON.stringify(dados),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error('Erro na requisição');
    }
    return response.json();
    })
    .then((data) => {
        console.log('Sucesso:', data);
        document.getElementById("form").reset();
        carregaArvores();
        document.getElementById("grava-sucess").style.display = "flex";
        setTimeout(() => {
            document.getElementById("grava-sucess").style.display = "none";
        }, 2500);
    })
    .catch((error) => {
        console.error('Erro:', error);
        carregaArvores();
        document.getElementById("grava-falha").style.display = "flex";
        setTimeout(() => {
            document.getElementById("grava-falha").style.display = "none";
        }, 2500);
    });
};