class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;

    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;

    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  } //
  //HAVING TROUBLE GETTING THE INPUT ERROR TO SHOW
  //
  _showInputError = (inputElement, errorMessage) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);

    console.log(errorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
    console.log(errorElement);
  };

  _hideInputError = (inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        //settings,
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState(inputList, _submitButtonSelector, _inactiveButtonClass) {
    const submitButtonElement = document.querySelector(
      this._submitButtonSelector,
    );
    const inactiveButtonClass = document.querySelector(
      this._inactiveButtonClass,
    );

    if (this._hasInvalidInput(inputList)) {
      submitButtonElement.classList.add(inactiveButtonClass);
      submitButtonElement.disabled = true;
    } else {
      submitButtonElement.classList.remove(inactiveButtonClass);
      submitButtonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );

    this._toggleButtonState(
      inputList,
      this._submitButtonSelector,
      this._formSelector,
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(
          inputList,
          this._submitButtonSelector,
          this._inactiveButtonClass,
        );
      });
    });
  }

  _enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
