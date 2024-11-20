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
                        <div class='buttons'>
                            <button onclick='deletaArvore(${arvore.id})'>Deletar</button>
                            <a href='#form'><button onclick='editaArvore(${arvore.id})'>Editar</button></a>
                        </div>
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

const deletaArvore = (id) => {
    const decisao = confirm("Você realmente deseja apagar essa arvore?");

    if(decisao) {
        const api = `http://localhost:5000/api/arvores/${id}`;
        fetch(api, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer your-token-here',
            }
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
        })
        .then((data) => {
            console.log('Sucesso:', data);
            carregaArvores();

            document.getElementById("deleta-sucess").style.display = "flex";
            setTimeout(() => {
                document.getElementById("deleta-sucess").style.display = "none";
            }, 2500);
        })
        .catch((error) => {
            console.error('Erro:', error);
            carregaArvores();

            document.getElementById("deleta-falha").style.display = "flex";
            setTimeout(() => {
                document.getElementById("deleta-falha").style.display = "none";
            }, 2500);
        });
    }
};

const editaArvore = (id) => {
    const api = `http://localhost:5000/api/arvores/${id}`;
    fetch(api)
    .then(resposta => {
        return resposta.json();
    })
    .then(resposta => {
        document.getElementById("id-arvore").value = id;
        document.getElementById("nome").value = resposta[0].nome;
        document.getElementById("nomeCientifico").value = resposta[0].nomeCientifico;
        document.getElementById("descricao").value = resposta[0].descricao;
        document.getElementById("latitude").value = resposta[0].latitude;
        document.getElementById("longitude").value = resposta[0].longitude;
        document.getElementById("linkImagem").value = resposta[0].imagem;

        document.getElementById("button").style.display = "none";
        document.getElementById("button-editar").style.display = "block";
    })
    .catch(erro => {
        console.log(erro);
    });
}

const atualizaArvore = () => {
    const id = document.getElementById('id-arvore').value;
    const dados = {
        nome: document.getElementById('nome').value,
        nomeCientifico: document.getElementById('nomeCientifico').value,
        descricao: document.getElementById('descricao').value,
        latitude: document.getElementById('latitude').value,
        longitude: document.getElementById('longitude').value,
        linkImagem: document.getElementById('linkImagem').value,
    };
    const api = `http://localhost:5000/api/arvores/${id}`;
    fetch(api, {
        method: 'PUT',
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
        document.getElementById("button").style.display = "block";
        document.getElementById("button-editar").style.display = "none";

        document.getElementById("edita-sucess").style.display = "flex";
        setTimeout(() => {
            document.getElementById("edita-sucess").style.display = "none";
        }, 2500);
    })
    .catch((error) => {
        console.error('Erro:', error);
        carregaArvores();
        document.getElementById("edita-falha").style.display = "flex";
        setTimeout(() => {
            document.getElementById("edita-falha").style.display = "none";
        }, 2500);
    });
}