import App from "./App.js";

M.Sidenav.init(document.querySelectorAll(".sidenav"));
const app = new App();
(async () => {
  await app.fetchTodos();
  app.renderTodos();
})();

/****************************
 ******** Da Listener *******
 ****************************/

//TODO: mb redo this with cases?
const todoList = document.getElementById("todos-grid");
todoList.addEventListener("click", async (e) => {
  //Delete
  if (e.target && e.target.matches("button.delete-todo-btn")) {
    e.stopPropagation();
    // console.log(e.target);
    await app.deleteTodo(e.target.dataset.id);
    app.renderTodos();
  } else if (e.target && e.target.matches("button.update-todo-btn")) {
    e.stopPropagation();
    app.renderTodos();
    const todo = app.getTodoById(e.target.dataset.id);
    const activeCard = document.getElementById(todo.id);
    const updateFormCard = document.createElement("div");
    updateFormCard.classList = `card lime lighten-3 darken-1 hoverable todo-card`;
    updateFormCard.innerHTML = `
      <div class="card-content white-text">
        <input type="text" id="update-title-input" name="title" class="white-text active" value="${todo.title}">
        <textarea id="update-description-input" name="description" class=" white-text materialize-textarea">${todo.description}</textarea>
      </div>
      <div class="card-action">
        <button type="button" class="waves-effect waves-light btn-small orange darken-4 cancel-update-btn"> Cancel </button>
        <button type="button" class="waves-effect waves-light btn-small green update-todo-button" data-id= ${todo.id} >Update </button>
      </div>
    `;
    document
      .getElementById("todos-grid")
      .replaceChild(updateFormCard, activeCard);
    console.log(activeCard);
  } else if (e.target && e.target.matches("button.toggle-todo-btn")) {
    e.stopPropagation();
    const todo = app.getTodoById(e.target.dataset.id);
    const data = {
      completed: !todo.completed,
    };
    await app.updateTodo(todo.id, data);
    app.renderTodos();
  } else if (e.target && e.target.matches("button.cancel-update-btn")) {
    e.stopPropagation();
    app.renderTodos();
  } else if (e.target && e.target.matches("button.update-todo-button")) {
    e.stopPropagation();
    const todo = app.getTodoById(e.target.dataset.id);
    const data = {
      title: document.getElementById("update-title-input").value,
      description: document.getElementById("update-description-input").value,
    };
    await app.updateTodo(todo.id, data);
    app.renderTodos();
  }
});

const newTodoForm = document.getElementById("new-todo-form");
newTodoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(newTodoForm);
  const data = Object.fromEntries(formData);
  data.completed = false;
  console.log("data", data);
  await app.addTodo(data);
  app.renderTodos();
});
