class TaskList {
  constructor() {
    this.titleInput = document.getElementById("titleInput");
    this.messageInput = document.getElementById("messageField");
    this.addBtn = document.getElementById("inputButton");
    this.scrapsField = document.getElementById("scrapsField");

    this.scraps = [];

    this.registerAddScrapBtnEvent();
  }

  generateScrapId() {
    return this.scraps.length + 1;
  }

  registerAddScrapBtnEvent() {
    this.addBtn.onclick = () => this.addNewScrap();
  }

  setButtonEvent() {
    document.querySelectorAll(".delete-button").forEach((item) => {
      item.onclick = (event) => this.deleteScrap(event);
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
    this.setButtonEvent();
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
    event.path[3].remove();

    const scrapId = event.path[3].getAttribute("id-scrap");

    const scrapIndex = this.scraps.findIndex((item) => {
      return item.id == scrapId;
    });

    this.scraps.splice(scrapIndex, 1);
  }

  insertHtml(html) {
    this.scrapsField.innerHTML += html;
  }

  createScrapCard(id, title, message) {
    return `
      <div class="message-cards card text-white bg-dark m-2 col-3 id-scrap="${id}">
        <div class="card-header font-weight-bold text-center">${title}</div>
        <div class="card-body">
          <p class="card-text">
            ${message}
          </p>
          <div class="w-100 d-flex justify-content-center pr-2 pb-2">
            <button type="button" class="btn btn-primary btn-sm bg-danger delete-button">Excluir</button>
            <button type="button" class="btn btn-secondary btn-sm bg-warning text-dark">Editar</button>
        </div>
        </div>
      </div>
      `;
  }
}
new TaskList();
