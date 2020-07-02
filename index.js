let cardField = document.getElementById("scrapsField");
let btnInput = document.getElementById("inputButton");
let titleInput = document.getElementById("titleInput");
let messageField = document.getElementById("messageField");

let tasks = [];

function renderTasks() {
  cardField.innerHTML = "";

  if (tasks.length === 0) {
    cardField.innerHTML = "Todas as tarefas realizadas!";
  }

  for (const task of tasks) {
    let cardTitle = document.createTextNode(task.title);
    let cardText = document.createTextNode(task.message);

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
    cardField.appendChild(card);
  }
}

messageField.onkeypress = function (event) {
  if (event.keyCode === 10) {
    createTask();
  }
};

titleInput.onkeypress = function (event) {
  if (event.keyCode === 13) {
    createTask();
  }
};

renderTasks();

function createTask() {
  if (messageField.value === "" || titleInput.value.length > 30) {
    alert("DADOS INVÁLIDOS");
  } else {
    let title = titleInput.value;
    let message = messageField.value;

    tasks.push({ title, message });
    messageField.value = "";
    titleInput.value = "";

    renderTasks();
  }
}

btnInput.onclick = createTask;
