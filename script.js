const board = document.getElementById("board");
const statuss = document.getElementById("status");
const restart = document.getElementById("restart");

const symbols = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍍", "🥝", "🍓"];
let cards = [];
let flipped = [];
let matched = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createBoard() {
  board.innerHTML = "";
  statuss.textContent = "Match all the pairs!";
  flipped = [];
  matched = [];

  cards = [...symbols, ...symbols];
  shuffle(cards).forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = "❓";

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = symbol;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    card.addEventListener("click", () => flip(card));
    board.appendChild(card);
  });
}

function flip(card) {
  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    flipped.length === 2
  )
    return;

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [a, b] = flipped;

  if (a.dataset.symbol === b.dataset.symbol) {
    a.classList.add("matched");
    b.classList.add("matched");
    matched.push(a, b);

    if (matched.length === cards.length) {
      statuss.textContent = "🎉 You Win!";
    }
  } else {
    a.classList.remove("flipped");
    b.classList.remove("flipped");
  }

  flipped = [];
}

restart.addEventListener("click", createBoard);

createBoard();
