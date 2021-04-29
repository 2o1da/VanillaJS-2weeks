// <⚠️ DONT DELETE THIS ⚠️>
// <⚠️ /DONT DELETE THIS ⚠️>
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingForm = document.querySelector(".js-pendingForm");
const finishedForm = document.querySelector(".js-finishedForm");
const toDoList = pendingForm.querySelector(".js-pendingList");
const toFinishedList = finishedForm.querySelector(".js-finishedList");

const TOADDTASKS_LS = "PENDING";
const TOADDFINISHED_LS = "FINISHED";

let toaddTask = [];
let tofinishedTask = [];

function backToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const task = li.children[0].innerText;
    paintTasks(task);
    toFinishedList.removeChild(li);
    const cleanToDos = tofinishedTask.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    tofinishedTask = cleanToDos;
    savetoTask();
}

function checkToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerText;
    paintFinishedTasks(text);
    toDoList.removeChild(li);
    const cleanToDos = toaddTask.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toaddTask = cleanToDos;
    savetoTask();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toaddTask.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toaddTask = cleanToDos;
    savetoTask();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toFinishedList.removeChild(li);
    const cleanToDos = tofinishedTask.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    tofinishedTask = cleanToDos;
    savetoTask();
}

function savetoTask() {
    localStorage.setItem(TOADDTASKS_LS, JSON.stringify(toaddTask));
    localStorage.setItem(TOADDFINISHED_LS, JSON.stringify(tofinishedTask));
}

function paintFinishedTasks(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinished);
    backBtn.innerText = "↩️";
    backBtn.addEventListener("click", backToDo);
    const span = document.createElement("span");
    const newId = tofinishedTask.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = newId;
    toFinishedList.appendChild(li);
    const taskObj = {
        text: text,
        id: newId,
    };
    tofinishedTask.push(taskObj);
    savetoTask();
}

function paintTasks(text) {
    const li = document.createElement("li");
    const chkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    chkBtn.innerText = "✔️";
    chkBtn.addEventListener("click", checkToDo);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toaddTask.length + 1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(chkBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const taskObj = {
        text: text,
        id: newId,
    };
    toaddTask.push(taskObj);
    savetoTask();
}

function hanbleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTasks(currentValue);
    toDoInput.value = "";
}

function loadAddTask() {
    const toAddTasks = localStorage.getItem(TOADDTASKS_LS);
    const toFinishedTasks = localStorage.getItem(TOADDFINISHED_LS);
    if (toAddTasks !== null) {
        const parsedTask = JSON.parse(toAddTasks);
        parsedTask.forEach(function (toTask) {
            paintTasks(toTask.text);
        });
    }
    if (toFinishedTasks !== null) {
        const parsedFinished = JSON.parse(toFinishedTasks);
        parsedFinished.forEach(function (toFinishedTask) {
            paintFinishedTasks(toFinishedTask.text);
        });
    }
}

function init() {
    loadAddTask();
    toDoForm.addEventListener("submit", hanbleSubmit);
}
function init2() {
    loadAddTask();
    toDoInput.addEventListener("change", function (event) {
        event.preventDefault();

        const currentValue = toDoInput.value;
        paintTasks(currentValue);
        toDoInput.value = "";
    });
}

init2();
