const URL = "https://crudcrud.com/api/e56f4b59007a405598a9f0677a9bc6b0/arrayJogos";

//puxando os jogos pela API
async function getJogos() {
    const response = await fetch(URL);
    return await response.json();
}

//deletando jogos
async function deletarJogo(id) {
    const response = await fetch(URL + `/${id}`, { method: "DELETE" });
    if (response.status == 200) return "Jogo removido com sucesso!";
    return "Erro - Não foi possível remover o jogo!";
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

    const generoJogo = document.createElement("span");
    generoJogo.innerText = `${jogo.genero}`;

    const anoLancamento = document.createElement("span");
    anoLancamento.innerText = `${jogo.dataLancamento.slice(-4)}`;

    const desenvolvedora = document.createElement("span");
    desenvolvedora.innerText = `${jogo.desenvolvedor}`;

    cardDetails.appendChild(tituloJogo);
    cardDetails.appendChild(generoJogo);
    cardDetails.appendChild(anoLancamento); 
    cardDetails.appendChild(desenvolvedora);

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
            deletarJogo(jogo._id).then(console.log);
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

    const cardTop = document.createElement("div");
    cardTop.className = "card-top";
    cardTop.style.backgroundImage = `url(${jogo.image})`;
    cardTop.appendChild(cardOptions);


    cardJogo.appendChild(cardTop);
    cardJogo.appendChild(cardDetails);

    gameList.appendChild(cardJogo);
}

//primeira execução
gameList.innerHTML = "";
getJogos().then((arrayJogos) => {
    arrayJogos.forEach((jogo) => {
      criarNovoCard(jogo);
    });
  });

//execuções seguintes - a cada 5s
const intervalo = setInterval(() => {
    gameList.innerHTML = "";
    getJogos().then((arrayJogos) => {
      arrayJogos.forEach((jogo) => {
        criarNovoCard(jogo);
      });
    });
  }, 5000);