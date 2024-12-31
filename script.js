const cardContainer = document.querySelector(".card-container");
let cards = [];
let flippedCards = [];
let gameWon = false;
let numberOfMoves = 0;
let usedIcons = [];

const cardFaces = [
  "bobrossparrot.gif",
  "explodyparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "revertitparrot.gif",
  "tripletsparrot.gif",
  "unicornparrot.gif",
];

function createCards(numCards) {
  const icons = [];

  for (let i = 0; i < numCards / 2; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * cardFaces.length);
    } while (usedIcons.includes(cardFaces[randomIndex]));

    icons.push(cardFaces[randomIndex]);
    icons.push(cardFaces[randomIndex]);
    usedIcons.push(cardFaces[randomIndex]);
  }

  const shuffledCards = icons.sort(() => 0.5 - Math.random());

  shuffledCards.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.innerHTML = `
      <div class="front">
        <img src="assets/back.png" alt="Card Back">
      </div>
      <div class="back">
        <img src="assets/${icon}" alt="${icon}">
      </div>
    `;
    cardContainer.appendChild(card);
    cards.push(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flip")) return;
  this.classList.toggle("flip");
  numberOfMoves++;

  flippedCards.push(this);

  if (flippedCards.length === 2) {
    const icon1 = flippedCards[0].dataset.icon;
    const icon2 = flippedCards[1].dataset.icon;

    if (icon1 !== icon2) {
      setTimeout(() => {
        flippedCards.forEach((card) => card.classList.toggle("flip"));
        flippedCards = [];
      }, 1000);
    } else {
      flippedCards = [];
      if (cards.every((card) => card.classList.contains("flip"))) {
        gameWon = true;
        setTimeout(() => {
          alert(`Você ganhou em ${numberOfMoves} jogadas!`);
        }, 1000);
      }
    }
  }
}

function startGame() {
  let numCards;

  do {
    numCards = parseInt(
      prompt(
        "Com quantas cartas você quer jogar (escolha um número par de 4 a 14)? "
      )
    );

    if (
      numCards < 4 ||
      numCards > 14 ||
      isNaN(numCards) ||
      numCards % 2 !== 0
    ) {
      alert(
        "Número de cartas inválido. Por favor, escolha um número par de 4 a 14."
      );
    }
  } while (
    numCards < 4 ||
    numCards > 14 ||
    isNaN(numCards) ||
    numCards % 2 !== 0
  );

  cardContainer.innerHTML = "";
  cards = [];
  flippedCards = [];
  numberOfMoves = 0;
  usedIcons = []; // Limpa o array de ícones usados
  createCards(numCards);

  cards.forEach((card) => card.addEventListener("click", flipCard));
}

startGame();
