let scrapsField = document.getElementById("scrapsField");
let addScrapBtn = document.getElementById("inputButton");
let titleInput = document.getElementById("titleInput");
let messageField = document.getElementById("messageField");

let scraps = [];

function renderScraps() {
  scrapsField.innerHTML = "";

  if (scraps.length === 0) {
    scrapsField.innerHTML = "Todas as tarefas realizadas!";
  }

  for (const scrap of scraps) {
    let position = scraps.indexOf(scrap);
    scrapsField.innerHTML += createScrapCard(
      scrap.title,
      scrap.message,
      position
    );
  }
}

function addScrap() {
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

messageField.onkeypress = function (event) {
  if (event.keyCode === 10) {
    addScrap();
  }
};

titleInput.onkeypress = function (event) {
  if (event.keyCode === 13) {
    addScrap();
  }
};



function createScrapCard(title, message, position) {
  return `
  <div class="message-cards card text-white bg-dark m-2 col-3">
    <div class="card-header font-weight-bold text-center">${title}</div>
    <div class="card-body">
      <p class="card-text">
        ${message}
      </p>
    </div>
  </div>
  `;
}

renderScraps();
addScrapBtn.onclick = addScrap;
