if(!localStorage.getItem("arrayJogos")){
    let arrayJogos = []
    localStorage.setItem("arrayJogos", JSON.stringify(arrayJogos));
}

const arrayJogos = JSON.parse(localStorage.getItem("arrayJogos"));

//deletando jogos
function deletarJogo(id) {
    try {
      const index = arrayJogos.findIndex(jogo => jogo.id === id);
      arrayJogos.splice(index, 1);
      localStorage.setItem("arrayJogos", JSON.stringify(arrayJogos));
    } catch (error) {
      console.log(error)
      alert("Something went wrong - Check Console!");
    }
}

function criarNovoCard(jogo) {
    const cardJogo = document.createElement("div");
    cardJogo.className = "card-jogo";

    const linkSteam = document.createElement("a");
    linkSteam.innerText = `${jogo.titulo}`;
    linkSteam.href = `${jogo.steamLink}`;
    linkSteam.target = "_blank";

    const tituloJogo = document.createElement("h2");
    tituloJogo.appendChild(linkSteam);

    const cardDetails = document.createElement("div");
    cardDetails.className = "card-details";

    const mainInfo = document.createElement("div");
    mainInfo.className = "main-info";

    const generoJogoDiv = document.createElement("div");
    const generoJogoLabel = document.createElement("span");
    const generoJogo = document.createElement("span");
    generoJogoLabel.innerText = "Gênero:";
    generoJogo.innerText = `${jogo.genero}`;
    generoJogoDiv.appendChild(generoJogoLabel);
    generoJogoDiv.appendChild(generoJogo);

    const dataLancamentoDiv = document.createElement("div");
    const dataLancamentoLabel = document.createElement("span");
    const dataLancamento = document.createElement("span");
    dataLancamentoLabel.innerText = "Lançamento:";
    dataLancamento.innerText = `${convertDateFormat(jogo.dataLancamento)}`;
    dataLancamentoDiv.appendChild(dataLancamentoLabel);
    dataLancamentoDiv.appendChild(dataLancamento);

    const desenvolvedoraDiv = document.createElement("div");
    const desenvolvedoraLabel = document.createElement("span");
    const desenvolvedora = document.createElement("span");
    desenvolvedoraLabel.innerText = "Desenvolvedor:";
    desenvolvedora.innerText = `${jogo.desenvolvedor}`;
    desenvolvedoraDiv.appendChild(desenvolvedoraLabel);
    desenvolvedoraDiv.appendChild(desenvolvedora);

    cardDetails.appendChild(tituloJogo);
    cardDetails.appendChild(generoJogoDiv);
    cardDetails.appendChild(dataLancamentoDiv); 
    cardDetails.appendChild(desenvolvedoraDiv);

    const editBtn = document.createElement("a");
    editBtn.className = "edit-btn";
    editBtn.href = `/cadastro.html?id=${jogo._id}`;

    const editIcon = document.createElement("img");
    editIcon.src = "/assets/icons/icons8-edit.svg"
    editBtn.appendChild(editIcon);

    const removeBtn = document.createElement("img");
    removeBtn.className = "remove-btn";
    removeBtn.src = "/assets/icons/icons8-delete.svg"
    removeBtn.addEventListener("click", () => {
        if (confirm("Deseja remover o jogo da lista?")) {
            console.log(jogo)
            deletarJogo(jogo._id);
            location.reload();
        }
    });

    const steamBtn = document.createElement("a");
    steamBtn.href = `${jogo.steamLink}`;
    steamBtn.target = "_blank";

    const steamIcon = document.createElement("img");
    steamIcon.src = "/assets/icons/icons8-steam.svg";

    steamBtn.appendChild(steamIcon);

    const cardOptions = document.createElement("div");
    cardOptions.className = "card-options";
    cardOptions.appendChild(editBtn);
    cardOptions.appendChild(removeBtn);
    cardOptions.appendChild(steamBtn);

    const cardImg = document.createElement("div");
    cardImg.className = "card-img";
    cardImg.style.backgroundImage = `url(${jogo.image})`;
    
    cardJogo.appendChild(cardImg);
    cardJogo.appendChild(cardDetails);
    cardJogo.appendChild(cardOptions);

    gameList.appendChild(cardJogo);
}

function convertDateFormat(date) {
  const parts = date.split('-');
  const month = parts[0];
  const day = parts[1];
  const year = parts[2];

  return `${day}/${month}/${year}`;
}

//primeira execução
gameList.innerHTML = "";
console.log("foo1");
arrayJogos.forEach((jogo) => { criarNovoCard(jogo); });