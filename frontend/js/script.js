console.log("Iniciando a script");

const checkForm = {
    nome: false,
    nomeCientifico: false,
    descricao: false,
    latitude: false,
    longitude: false,
    linkImagem: false
};

console.log(checkForm);

document.getElementById("nome").addEventListener("input", function(e) {
    const nome = e.target.value;

    if(nome.length < 1 || nome.length > 50 || /[0-9]/.test(nome)) {
        console.log("Nome deve ter entre 1 e 50 caracteres e não conter números");
        document.getElementById("erro-nome").style.display = "block";
        document.getElementById("nome").style.border = "3px solid red";
        checkForm.nome = false;
    }
    else {
        console.log("Nome válido");
        document.getElementById("erro-nome").style.display = "none";
        document.getElementById("nome").style.border = "2px solid gray";
        checkForm.nome = true;
    }     
    testarBotao();
});

document.getElementById("nomeCientifico").addEventListener("input", function(e) {
    const nomeCientifico = e.target.value;

    if(nomeCientifico.length < 1 ||nomeCientifico.length > 50 || /[0-9]/.test(nomeCientifico)) {
        console.log("Nome científico deve ter entre 1 e 50 caracteres e não conter números");
        document.getElementById("erro-nomeCientifico").style.display = "block";
        document.getElementById("nomeCientifico").style.border = "3px solid red";
        checkForm.nomeCientifico = false;
    }
    else {
        console.log("Nome científico válido");
        document.getElementById("erro-nomeCientifico").style.display = "none";
        document.getElementById("nomeCientifico").style.border = "2px solid gray";
        checkForm.nomeCientifico = true;
    }
    testarBotao();
});

document.getElementById("descricao").addEventListener("input", function(e) {
    const descricao = e.target.value;

    if(descricao.length < 1 || descricao.length > 250) {
        console.log("Descrição deve ter entre 1 e 250 caracteres");
        document.getElementById("erro-descricao").style.display = "block";
        document.getElementById("descricao").style.border = "3px solid red";
        checkForm.descricao = false;
    }
    else {
        console.log("Descrição válida");
        document.getElementById("erro-descricao").style.display = "none";
        document.getElementById("descricao").style.border = "2px solid gray";
        checkForm.descricao = true;
    }
    testarBotao();
});

document.getElementById("latitude").addEventListener("input", function(e) {
    const latitude = parseFloat(e.target.value);

    if(isNaN(latitude) || latitude < -90 || latitude > 90) {
        console.log("A latitude deve ser entre -90 e 90")
        document.getElementById("erro-latitude").style.display = "block";
        document.getElementById("latitude").style.border = "3px solid red";
        checkForm.latitude = false;
    }
    else {
        console.log("Latitude válida");
        document.getElementById("erro-latitude").style.display = "none";
        document.getElementById("latitude").style.border = "2px solid gray";
        checkForm.latitude = true;
    }
    testarBotao();
});

document.getElementById("longitude").addEventListener("input", function(e) {
    const longitude = parseFloat(e.target.value);

    if(isNaN(longitude) || longitude < -180 || longitude > 180) {
        console.log("A longitude deve ser entre -180 e 180")
        document.getElementById("erro-longitude").style.display = "block";
        document.getElementById("longitude").style.border = "3px solid red";
        checkForm.longitude = false;
    }
    else {
        console.log("Longitude válida");
        document.getElementById("erro-longitude").style.display = "none";
        document.getElementById("longitude").style.border = "2px solid gray";
        checkForm.longitude = true;
    }
    testarBotao();
});

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    }
    catch(erro) {
        return false;
    }
}

document.getElementById("linkImagem").addEventListener("input", function(e) {
    const linkImagem = e.target.value;

    if (!isValidUrl(linkImagem)) {
        document.getElementById('erro-linkImagem').style.display = 'block';
        document.getElementById("linkImagem").style.border = "3px solid red";
        checkForm.linkImagem = false;
    }
    else {
        document.getElementById('erro-linkImagem').style.display = 'none';
        document.getElementById("linkImagem").style.border = "2px solid gray";
        checkForm.linkImagem = true;
    }
    testarBotao();
    
})

const testarBotao = () => {
    let enable = true;

    console.log(checkForm);
    
    Object.keys(checkForm).forEach(key => {
        if(!checkForm[key]) {
            enable = false;
        }
    });
    document.getElementById("button").disabled = !enable;
}