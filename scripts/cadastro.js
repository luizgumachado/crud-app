const URL = "https://crudcrud.com/api/e56f4b59007a405598a9f0677a9bc6b0/arrayJogos";

async function getJogo(id) {
    if (id) {
        const response = await fetch(URL + `/${id}`);
        const jogo = await response.json();

        title.value = jogo.titulo;
        genre.value = jogo.genero;
        developer.value = jogo.desenvolvedor;
        releaseDate.value = jogo.dataLancamento.split("-").reverse().join("-");
        steamLink.value = (jogo.steamLink == "Not Available") ? "" : jogo.steamLink;
        image.value = (jogo.image == "/assets/generic-image.jpg") ? "" : jogo.image;
      }
}

async function addJogo(jogo) {
    const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(jogo),
        headers: { 'Content-Type': 'application/json' }
    });

    return await response.json();
}

async function editJogo(id, jogo) {
    const response = await fetch(URL + `/${id}`, {
      method: "PUT",
      body: JSON.stringify(jogo),
      headers: { 'Content-Type': 'application/json' }
    });
    
    return await response;
}

//data de hoje
const dataAtual = (new Date()).toISOString().split("T")[0];
releaseDate.max = dataAtual;

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
        steamLink: steamLink.value
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

    if(id) {
        editJogo(id, novoJogo).then(console.log);
    } else {
        addJogo(novoJogo).then((data) => console.log(data));
    }

    form.reset();
    window.location = '/index.html';
});