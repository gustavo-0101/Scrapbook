import api from "./services/api";

async function teste() {
  const response = await api.get("/scraps");

  console.log(response);
}

teste();

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

    this.getScraps();

    this.registerAddScrapBtnEvent();
  }

  async getScraps() {
    const { data: scraps } = await api.get("/scraps");

    this.scraps = scraps;
    this.renderScraps();
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

  async addNewScrap() {
    if (this.titleInput.value === "" || this.titleInput.value.length > 100) {
      alert("Insira um título (de até 100 caracteres)");
    } else if (this.messageInput.value === "") {
      alert("Você não pode deixar a aba 'Mensagem' em branco!");
    } else {
      const newTitle = this.titleInput.value;
      const newMessage = this.messageInput.value;

      this.titleInput.value = "";
      this.messageInput.value = "";

      const {
        data: { id, title, message },
      } = await api.post("/scraps", {
        title: newTitle,
        message: newMessage,
      });

      this.scraps.push({ id, title, message });

      this.renderScraps();
    }
  }

  async deleteScrap(event) {
    event.path[2].remove();

    const scrapId = event.path[2].getAttribute("id-scrap");

    await api.delete(`/scraps/${scrapId}`);

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

    this.btnSaveEdit.onclick = () => this.saveChanges(scrapIndex, scrapId);
  }

  async saveChanges(scrapIndex, scrapId) {
    if (this.editMessageField.value === "") {
      alert("Você não pode deixar a aba 'Mensagem' em branco!");
    } else if (
      this.editTitleInput.value === "" ||
      this.editTitleInput.value.length > 100
    ) {
      alert("Insira um título (com até 100 caracteres)");
    } else {
      let title = this.editTitleInput.value;
      let message = this.editMessageField.value;

      const { data: scrap } = await api.put(`/scraps/${scrapId}`, {
        title,
        message,
      });

      this.scraps[scrapIndex] = scrap;
      this.renderScraps();
      $("#editModal").modal("hide");
    }
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
