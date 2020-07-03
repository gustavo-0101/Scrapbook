let scrapsField = document.getElementById("scrapsField");
let btnInput = document.getElementById("inputButton");
let titleInput = document.getElementById("titleInput");
let messageField = document.getElementById("messageField");

let scraps = [];

function renderScraps() {
  scrapsField.innerHTML = "";

  if (scraps.length === 0) {
    scrapsField.innerHTML = "Todas as tarefas realizadas!";
  }

  for (const scrap of scraps) {
    let cardTitle = document.createTextNode(scrap.title);
    let cardText = document.createTextNode(scrap.message);

    let card = document.createElement("div");
    card.className = "message-cards card text-white bg-dark m-2 col-3";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body p-2";

    let cardHeader = document.createElement("div");
    cardHeader.appendChild(cardTitle);
    cardHeader.className = "card-header font-weight-bold text-center";

    let cardParagraph = document.createElement("p");
    cardParagraph.appendChild(cardText);
    cardParagraph.className = "card-text";

    cardBody.appendChild(cardParagraph);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    scrapsField.appendChild(card);
  }
}

messageField.onkeypress = function (event) {
  if (event.keyCode === 10) {
    createScrap();
  }
};

titleInput.onkeypress = function (event) {
  if (event.keyCode === 13) {
    createScrap();
  }
};

renderScraps();

function createScrap() {
  if (messageField.value === "" || titleInput.value.length > 30) {
    alert("DADOS INVÁLIDOS");
  } else {
    let title = titleInput.value;
    let message = messageField.value;

    scraps.push({ title, message });
    messageField.value = "";
    titleInput.value = "";

    renderScraps();
  }
}

btnInput.onclick = createScrap;
