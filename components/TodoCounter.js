class TodoCounter {
  constructor(todos, selector, handleCheck) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length; // number of completed todos
    this._total = todos.length;
    this._updateText();
    this._handleCheck = handleCheck;
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    // if increment is true, add 1 to this._completed. Otherwise,
    // subtract 1. In either case, call the method to update
    // the text content
    if (increment) {
      this._completed += 1;
      console.log(increment);
    } else {
      this._completed -= 1;
    }

    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    // if increment is true, add 1 to this._total. Otherwise,
    // subtract 1. In either case, call the method to update the
    // text content.
    if (increment == true) {
      this._total += 1;
    } else {
      this._total -= 1;
    }
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
