import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function getJogo(id) {
    if (id) {
        indexJogo = arrayJogos.findIndex((jogo) => jogo.id === id);

        if (indexJogo == -1) return;
    
        const jogo = arrayJogos[indexJogo];
        title.value = jogo.titulo;
        genre.value = jogo.genero;
        developer.value = jogo.desenvolvedor;
        publisher.value = jogo.publisher;
        releaseDate.value = jogo.dataLancamento.split("-").reverse().join("-");
        steamLink.value = (jogo.steamLink == "Not Available") ? "" : jogo.steamLink;
        image.value = (jogo.image == "/assets/generic-image.jpg") ? "" : jogo.image;
      }
}

//JS black magic
const arrayJogos = JSON.parse(localStorage.getItem('arrayJogos')) || [];       
let indexJogo;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getJogo(id);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const {
        image: imagem,
        title: titulo,
        genre: genero,
        developer: desenvolvedor,
        publisher,
        releaseDate: dataLancamento,
        steamLink
    } = event.target;

    const novoJogo = {
        id: uuidv4(),
        image: imagem.value,
        titulo: titulo.value,
        genero: genero.value,
        desenvolvedor: desenvolvedor.value,
        publisher: publisher.value,
        dataLancamento: 
            dataLancamento.value.split("-").reverse().join("-"),
        steamLink: steamLink.value
    }

    let invalidForm = false;
    titleErrorMessage.innerText = "";
    genreErrorMessage.innerText = "";
    developerErrorMessage.innerText = "";
    publisherErrorMessage.innerText = "";
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

    if(novoJogo.publisher == "") {
        publisherErrorMessage.innerText = "Publisher Obrigatório";
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

    if(indexJogo != undefined) {
        arrayJogos[indexJogo] = novoJogo;
    } else {
        arrayJogos.push(novoJogo);
    }

    console.log(arrayJogos);

    localStorage.setItem('arrayJogos', JSON.stringify(arrayJogos));

    form.reset();
    window.location = '/index.html';
});