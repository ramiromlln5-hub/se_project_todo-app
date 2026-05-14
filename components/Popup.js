class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseEl = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._popupCloseEl);
      console.log(this.close);
    }
  }
  setEventListeners() {
    this._popupCloseEl.addEventListener("click", () => {
      this.close(this._popupElement);
    });
  }
}

export default Popup;
