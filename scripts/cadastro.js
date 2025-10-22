import config from './secrets.js';

const API_KEY = config.API_KEY;

if(!localStorage.getItem("arrayJogos")){
    let arrayJogos = []
    localStorage.setItem("arrayJogos", JSON.stringify(arrayJogos));
}

const arrayJogos = JSON.parse(localStorage.getItem("arrayJogos"));

function getJogo(id) {
    try {
        const jogo = arrayJogos.find(jogoObj => jogoObj.id == id);
        return jogo;
    } catch (error) {
        console.log(error);
        window.alert("Something went wrong - Check console!");
    }
}

function addJogo(jogo) {
    try {
        arrayJogos.push(jogo);
        localStorage.setItem("arrayJogos", JSON.stringify(arrayJogos));
        console.log(arrayJogos);
    } catch (error) {
        console.log(error);
        window.alert("Something went wrong - Check console!");
    }
}

function editJogo(id, jogo) {
    try {
        let currJogo = arrayJogos.find(jogoObj => jogoObj.id === id);
        currJogo = jogo;
        localStorage.setItem("arrayJogos", JSON.stringify(arrayJogos));
    } catch (error) {
        console.log(error);
        window.alert("Something went wrong - Check console!");
    }
}

//data de hoje
const dataAtual = (new Date()).toISOString().split("T")[0];
releaseDate.max = dataAtual;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const {
        image: imagem,
        title: titulo,
        genre: genero,
        developer: desenvolvedor,
        releaseDate: dataLancamento,
        steamLink
    } = event.target;

    const novoJogo = {
        image: imagem.value,
        titulo: titulo.value,
        genero: genero.value,
        desenvolvedor: desenvolvedor.value,
        dataLancamento: 
            dataLancamento.value.split("-").reverse().join("-"),
        steamLink: steamLink.value,
        id: crypto.randomUUID()
    }

    let invalidForm = false;
    titleErrorMessage.innerText = "";
    genreErrorMessage.innerText = "";
    developerErrorMessage.innerText = "";
    releaseDateErrorMessage.innerText = "";

    if(novoJogo.image == "") {
        novoJogo.image = "/assets/generic-image.jpg";
    }

    if(novoJogo.titulo == "") {
        titleErrorMessage.innerText = "Título Obrigatório";
        invalidForm = true;
    }

    if(novoJogo.genero == "") {
        genreErrorMessage.innerText = "Gênero Obrigatório";
        invalidForm = true;
    }

    if(novoJogo.desenvolvedor == "") {
        developerErrorMessage.innerText = "Desenvolvedor Obrigatório";
        invalidForm = true;
    }

    if(novoJogo.dataLancamento == "") {
        releaseDateErrorMessage.innerText = "Data de Lançamento Obrigatória";
        invalidForm = true;
    }

    if(invalidForm === true){
        return;
    }

    if(novoJogo.steamLink == "") {
        novoJogo.steamLink = "Not Available"
    }

    addJogo(novoJogo);
    form.reset();
    window.location = '/index.html';
});