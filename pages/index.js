import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const popupVisible = document.querySelector(".popup_visible");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
    todoCounter.updateTotal(false);
  }
}

const todoCounter = new TodoCounter(
  initialTodos,
  ".counter__text",
  handleCheck,
);

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo); //use addItem method instead
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    todoCounter.updateTotal(true);
    //Move code from existing submission handler to here
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    todosList.append(todo); // use addItem method instead
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

// find the currently opened modal
//addTodoPopup.setEventListeners();
// call sections instance's renderItems method

/* const openModal = (modal) => {
  modal.classList.add("popup_visible");
}; */

/* const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};  */

addTodoPopupEl.addEventListener("click", (evt) => {
  if (evt.target === addTodoPopupEl) {
    addTodoPopup.close();
  }
});

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  handleDelete();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

/* addTodo[CloseBtn.addEventListener("click", () => {
   addTodoPopup.close();
}); */
/*
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo); // use addItem method instead
  newTodoValidator.resetValidation();
  closeModal(addTodoPopupEl);
});
*/
section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
