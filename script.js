// Vent med at udføre koden, indtil DOM'en er indlæst
document.addEventListener("DOMContentLoaded", () => {
  // Funktion til at hente DOM-elementer baseret på ID
  const getElement = (id) => document.getElementById(id);

  // Hent referencer til de vigtigste DOM-elementer
  const todoList = getElement("todo-list");
  const doneList = getElement("done-list");
  const taskDescription = getElement("task-description");
  const taskQuantity = getElement("task-quantity");
  const addTaskButton = getElement("add-task");
  const taskList = getElement("task-list");

  // Funktion til at oprette et nyt opgaveelement (li)
  const createTaskElement = (id, description, quantity, isDone) => {
    const li = document.createElement("li");
    li.textContent = `${description} (${quantity})`;
    taskList.style.display = "flex";

    // Opret en knap afhængigt af om opgaven er markeret som færdig eller ej
    const actionButton = document.createElement("button");
    actionButton.textContent = isDone ? "Slet" : "Færdig";
    actionButton.setAttribute("data-id", id);
    actionButton.classList.add(isDone ? "delete-button" : "done-button");

    // Tilføj en eventlistener til knappen baseret på dens handling (færdig eller slet)
    actionButton.addEventListener("click", () => {
      isDone ? deleteTask(id) : markTaskDone(id);
    });

    li.appendChild(actionButton);
    return li;
  };

  const createUndoButton = (id) => {
    const undoButton = document.createElement("button");
    undoButton.textContent = "Fortryd";
    undoButton.setAttribute("data-id", id);
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", () => {
      undoTask(id);
    });

    return undoButton;
  };
  // Funktion til at fortryde en gennemført opgave og flytte den til "Aktiv"
  const undoTask = (id) => {
    const taskElement = document.querySelector(`button.undo-button[data-id="${id}"]`).parentNode;
    if (doneList.children.length === 0) taskList.style.display = "none";

    todoList.appendChild(createTaskElement(id, taskElement.firstChild.textContent.split(" ")[0], taskElement.firstChild.textContent.match(/\(([^)]+)\)/)[1], false));

    taskElement.remove();
  };

  // Funktion til at tilføje en ny opgave til "Todo" listen
  const addTask = () => {
    const description = taskDescription.value.trim();
    const quantity = taskQuantity.value || 1;
    taskList.style.display = "flex";

    if (description) {
      const id = Date.now();
      const taskElement = createTaskElement(id, description, quantity, false);
      todoList.appendChild(taskElement);
      taskDescription.value = "";
      taskQuantity.value = "";
    }
  };

  // Funktion til at markere en opgave som "Færdig"
  const markTaskDone = (id) => {
    const taskElement = document.querySelector(`button.done-button[data-id="${id}"]`).parentNode;
    if (todoList.children.length === 0 && doneList.children.length === 0) taskList.style.display = "none";

    doneList.appendChild(createTaskElement(id, taskElement.firstChild.textContent.split(" ")[0], taskElement.firstChild.textContent.match(/\(([^)]+)\)/)[1], true));
    doneList.lastChild.appendChild(createUndoButton(id));

    taskElement.remove();
  };

  // Funktion til at slette en opgave
  const deleteTask = (id) => {
    const taskElement = document.querySelector(`button.delete-button[data-id="${id}"]`).parentNode;
    taskElement.remove();
    if (todoList.children.length === 0) taskList.style.display = "none";
  };

  // Tilføj en eventlistener til knappen for at tilføje opgaver
  addTaskButton.addEventListener("click", addTask);
});
