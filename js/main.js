const toggleButton = document.getElementById("mode-toggle");
const bodyElement = document.body;

// Check localStorage for saved mode preference
const currentMode = localStorage.getItem("theme");

if (currentMode === "dark") {
  bodyElement.classList.add("dark-mode");
  toggleButton.textContent = " Light Mode";
}

// Toggle function for switching between dark and light modes
toggleButton.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-mode");

  if (bodyElement.classList.contains("dark-mode")) {
    toggleButton.textContent = " Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = " Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let allTasks = document.getElementById("allTasks");
let emtyTask = document.getElementById("emtyTask");
let span = document.querySelector("span");
let deleteAll = document.getElementById("deleteAll");
let cardBody = document.getElementsByClassName("card-body");
let checkedNumber = document.getElementsByClassName("checkedNumber");
let taskCounter = 1;

// checked Empty Tasks

let checkEmptyTasks = () => {
  if (allTasks.children.length == 0) {
    emtyTask.classList.remove("none");
    deleteAll.classList.add("none");
    checkedNumber.classList.add("d-none");
  } else {
    emtyTask.classList.add("none");
    deleteAll.classList.remove("none");
    checkedNumber.classList.remove("d-none");
    updateCounts();
  }
};

let addTask = (e) => {
  let taskValue = taskInput.value;

  if (taskValue.trim() == "") {
    span.classList.remove("none");
    taskInput.classList.add("invalid");
  } else {
    span.classList.add("none");
    taskInput.classList.remove("invalid");
    emtyTask.classList.add("none");
    deleteAll.classList.remove("none");
    const alertClasses = [
      "alert-primary",
      "alert-secondary",
      "alert-success",
      "alert-danger",
      "alert-warning",
      "alert-info",
      "alert-light",
      "alert-dark",
    ];
    const randomIndex = Math.floor(Math.random() * alertClasses.length);
    allTasks.innerHTML += `
          <div class="task border alert  ${alertClasses[randomIndex]}">${taskCounter}. ${taskValue}
          <i class="fa-solid delete  fa-trash-can text-danger float-end"></i>
          </div>
          `;
    updateCounts();
    taskCounter++;
    taskValue.value = "";
    checkemptytasks();
    Empty2();
  }
};

function checkNameTask() {
  var regexName = /^\w{3,20}$/;
  var resultName = regexName.test(taskInput.value);
  if (resultName == true) {
    document.getElementById("alertName").style.display = "none";
  } else {
    document.getElementById("alertName").style.display = "block";
  }
}

addTaskBtn.addEventListener("click", addTask);
// delete

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    checkEmptyTasks();
  }
});

// delete all

let DeleteAll = () => {
  allTasks.innerHTML = "";
  checkEmptyTasks();
};
deleteAll.addEventListener("click", DeleteAll);

// checked

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("checked");
    checkEmptyTasks();
    updateCounts();
  }
});
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("Done");
    updateCounts();
  }
});

function updateCounts() {
  const allTasks = document.querySelectorAll(".task");
  const DoneTasks = document.querySelectorAll(".task.Done");

  const DoneCount = DoneTasks.length;
  const pendingCount = allTasks.length - DoneCount;

  document.querySelector(".checkedNumber .Done").textContent = `Done: ${DoneCount}`;
  document.querySelector(
    ".checkedNumber .pending"
  ).textContent = `Pending: ${pendingCount}`;
}
updateCounts();

function Empty2() {
  if (document.querySelectorAll(".task").length === 0) {
    document.querySelector(".checkedNumber .Done").textContent = "Done: 0";
    document.querySelector(".checkedNumber .pending").textContent = "Pending: 0";
  }
}
