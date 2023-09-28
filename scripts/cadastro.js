import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


//JS black magic
const arrayJogos = JSON.parse(localStorage.getItem('arrayJogos')) || [];       
let indexJogo;

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
        novoJogo.image = "/assets/generic-image.jpg"
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

    if(indexJogo) {
        arrayJogos[jogoIndex] = novoJogo;
    } else {
        arrayJogos.push(novoJogo);
    }

    console.log(arrayJogos);

    localStorage.setItem('arrayJogos', JSON.stringify(arrayJogos));

    form.reset();
    window.location = '/index.html';
});