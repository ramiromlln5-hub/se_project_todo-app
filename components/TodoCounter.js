class TodoCounter {
  constructor(todos, selector, handleCheck) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length; // number of completed todos
    this._total = todos.length;
    this._updateText();
    this._handleCheck = handleCheck;
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
      console.log(increment);
    } else {
      this._completed -= 1;
    }

    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment == true) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
