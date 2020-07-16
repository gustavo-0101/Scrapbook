"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var scrapsField = document.getElementById("scrapsField");
var addScrapBtn = document.getElementById("inputButton");
var titleInput = document.getElementById("titleInput");
var editTitleInput = document.getElementById("editTitleInput");
var messageField = document.getElementById("messageField");
var editMessageField = document.getElementById("editMessageField");
var btnSaveEdit = document.getElementById("saveEdit");
var scraps = [];

function renderScraps() {
  scrapsField.innerHTML = "";

  if (scraps.length === 0) {
    scrapsField.innerHTML = "Todas as tarefas realizadas!";
  }

  var _iterator = _createForOfIteratorHelper(scraps),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var scrap = _step.value;
      var position = scraps.indexOf(scrap);
      scrapsField.innerHTML += createScrapCard(scrap.title, scrap.message, position);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function addScrap() {
  if (titleInput.value === "" || titleInput.value.length > 100) {
    alert("Insira um título (de até 100 caracteres)");
  } else if (messageField.value === "") {
    alert("Você não pode deixar a aba 'Mensagem' em branco!");
  } else {
    var title = titleInput.value;
    var message = messageField.value;
    scraps.push({
      title: title,
      message: message
    });
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
  return "\n  <div class=\"message-cards card text-white bg-dark m-2 col-3\">\n    <div class=\"card-header font-weight-bold text-center\">".concat(title, "</div>\n    <div class=\"card-body\">\n      <p class=\"card-text\">\n        ").concat(message, "\n      </p>\n      <div class=\"w-100 d-flex justify-content-center pr-2 pb-2\">\n        <button type=\"button\" class=\"btn btn-primary btn-sm bg-danger\" onclick=\"deleteScrap(").concat(position, ")\">Excluir</button>\n        <button type=\"button\" class=\"btn btn-secondary btn-sm bg-warning text-dark\" onclick=\"openEditModal(").concat(position, ")\">Editar</button>\n    </div>\n    </div>\n  </div>\n  ");
}

function openEditModal(position) {
  $("#editModal").modal("toggle");
  editTitleInput.value = scraps[position].title;
  editMessageField.value = scraps[position].message;
  btnSaveEdit.setAttribute("onclick", "saveChanges(".concat(position, ")"));
}

function saveChanges(position) {
  if (editMessageField.value === "") {
    alert("Você não pode deixar a aba 'Mensagem' em branco!");
  } else if (titleInput.value.length > 100) {
    alert("Insira um título (com até 100 caracteres)");
  } else {
    $("#editModal").modal("toggle");
    var title = editTitleInput.value;
    var message = editMessageField.value;
    scraps[position].title = title;
    scraps[position].message = message;
    renderScraps(position);
  }
}

renderScraps();
addScrapBtn.onclick = addScrap;
