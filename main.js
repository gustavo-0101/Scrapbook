class TaskList {
  constructor() {
    this.titleInput = document.getElementById("titleInput");
    this.messageInput = document.getElementById("messageField");
    this.addBtn = document.getElementById("inputButton");
    this.scrapsField = document.getElementById("scrapsField");
    this.editTitleInput = document.getElementById("editTitleInput");
    this.editMessageField = document.getElementById("editMessageField");
    this.btnSaveEdit = document.getElementById("saveEdit");

    this.scraps = [];

    this.registerAddScrapBtnEvent();
  }

  generateScrapId() {
    return this.scraps.length + 1;
  }

  registerAddScrapBtnEvent() {
    this.addBtn.onclick = () => this.addNewScrap();
  }

  setButtonsEvents() {
    document.querySelectorAll(".delete-button").forEach((item) => {
      item.onclick = (event) => this.deleteScrap(event);
    });
    document.querySelectorAll(".edit-button").forEach((item) => {
      item.onclick = (event) => this.openEditModal(event);
    });
  }

  renderScraps() {
    this.scrapsField.innerHTML = "";

    for (const scrap of this.scraps) {
      const cardHtml = this.createScrapCard(
        scrap.id,
        scrap.title,
        scrap.message
      );
      this.insertHtml(cardHtml);
    }
    this.setButtonsEvents();
  }

  addNewScrap() {
    const id = this.generateScrapId();
    const title = this.titleInput.value;
    const message = this.messageInput.value;

    this.titleInput.value = "";
    this.messageInput.value = "";

    this.scraps.push({ id, title, message });

    this.renderScraps();
  }

  deleteScrap(event) {
    event.path[2].remove();

    const scrapId = event.path[2].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((item) => {
      return item.id == scrapId;
    });

    this.scraps.splice(scrapIndex, 1);
  }

  openEditModal(event) {
    $("#editModal").modal("toggle");

    const scrapId = event.path[2].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((item) => {
      return item.id == scrapId;
    });

    this.editTitleInput.value = this.scraps[scrapIndex].title;
    this.editMessageField.value = this.scraps[scrapIndex].message;

    this.btnSaveEdit.onclick = () => this.saveChanges(scrapIndex);
  }

  saveChanges(scrapIndex) {
    let title = this.editTitleInput.value;
    let message = this.editMessageField.value;

    this.scraps[scrapIndex] = { title, message };
    this.renderScraps();
    $("#editModal").modal("hide");
  }

  insertHtml(html) {
    1;
    this.scrapsField.innerHTML += html;
  }

  createScrapCard(id, title, message) {
    return `
      <div class="message-cards card text-white bg-dark m-2 col-3" id-scrap="${id}">
        <div class="card-header font-weight-bold text-center">${title}</div>
          <p class="card-text">
            ${message}
          </p>
          <div class="w-100 d-flex justify-content-center pr-2 pb-2">
            <button type="button" class="btn btn-primary btn-sm bg-danger delete-button">Excluir</button>
            <button type="button" class="btn btn-secondary btn-sm bg-warning text-dark edit-button">Editar</button>
        </div>
      </div>
      `;
  }
}
new TaskList();
