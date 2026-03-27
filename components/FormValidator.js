class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;

    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;

    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }
  _showInputError = (_formElement, _inputElement, _errorClass) => {
    const errorElementId = `#${_inputElement.id}-error`;
    const errorElement = _formElement.querySelector(errorElementId);
    errorElement.classList.add(this._inputErrorClass);
    this._inputErrorClass.textContent = errorMessage;
  };

  _hideInputError = (_formElement, _inputElement) => {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage,
        //settings,
      );
    } else {
      this._hideInputError(_formElement, _inputElement, settings);
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
