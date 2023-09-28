const arrayJogos = JSON.parse(localStorage.getItem("arrayJogos")) || [];

arrayJogos.forEach((jogo, index) => {
    const cardJogo = document.createElement("div");
    cardJogo.className = "card-jogo";

    const imagemJogo = document.createElement("img");
    imagemJogo.alt = `Imagem de capa do jogo ${jogo.titulo}`;
    imagemJogo.src = jogo.image;

    const tituloJogo = document.createElement("h2");
    tituloJogo.innerText = `${jogo.titulo}`;

    const cardDetails = document.createElement("div");
    cardDetails.className = "card-details";

    const generoJogo = document.createElement("span");
    generoJogo.innerText = `${jogo.genero}`;

    const anoLancamento = document.createElement("span");
    anoLancamento.innerText = `${jogo.dataLancamento.slice(-4)}`;

    cardDetails.appendChild(generoJogo);
    cardDetails.appendChild(anoLancamento);

    const removeBtn = document.createElement("div");
    removeBtn.className = "remove-btn";
    removeBtn.onclick = `removeGame(${jogo.id})`;
    removeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 32 32">
            <path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"></path>
        </svg>
    `;
    removeBtn.addEventListener("click", () => {
        if (confirm("Deseja remover o jogo da lista?")) {
            arrayJogos.splice(index, 1);
            localStorage.setItem("arrayJogos", JSON.stringify(arrayJogos));
            location.reload();
          }
    });

    cardJogo.appendChild(imagemJogo);
    cardJogo.appendChild(tituloJogo);
    cardJogo.appendChild(cardDetails);
    cardJogo.appendChild(removeBtn);

    gameList.appendChild(cardJogo);
});