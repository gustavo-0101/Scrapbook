let scrapsField = document.getElementById("scrapsField");
let addScrapBtn = document.getElementById("inputButton");
let titleInput = document.getElementById("titleInput");
let editTitleInput = document.getElementById("editTitleInput");
let messageField = document.getElementById("messageField");
let editMessageField = document.getElementById("editMessageField");
let btnSaveEdit = document.getElementById("saveEdit");

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
  if (messageField.value === "" || titleInput.value.length > 60) {
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

function deleteScrap(position) {
  scraps.splice(position, 1);
  renderScraps();
}

function createScrapCard(title, message, position) {
  return `
  <div class="message-cards card text-white bg-dark m-2 col-3">
    <div class="card-header font-weight-bold text-center">${title}</div>
    <div class="card-body">
      <p class="card-text">
        ${message}
      </p>
      <div class="w-100 d-flex justify-content-center pr-2 pb-2">
        <button type="button" class="btn btn-primary btn-sm bg-danger" onclick="deleteScrap(${position})">Excluir</button>
        <button type="button" class="btn btn-secondary btn-sm bg-warning text-dark" onclick="openEditModal(${position})">Editar</button>
    </div>
    </div>
  </div>
  `;
}

function openEditModal(position) {
  $("#editModal").modal("toggle");
  editTitleInput.value = scraps[position].title;
  editMessageField.value = scraps[position].message;
  btnSaveEdit.setAttribute("onclick", `saveChanges(${position})`);
}

function saveChanges(position) {
  $("#editModal").modal("toggle");
  let title = editTitleInput.value;
  let message = editMessageField.value;
  scraps[position].title = title;
  scraps[position].message = message;
  renderScraps(position);
}

renderScraps();
addScrapBtn.onclick = addScrap;
