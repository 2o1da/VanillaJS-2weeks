// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const taskInput = document.querySelector("input");
const pendingList = document.querySelector(".pendingList");
const finishedList = document.querySelector(".finishedList");

const P_TASK_KEY = "PENDING";
const F_TASK_KEY = "FINISHED";

let p_tasks = [];
let f_tasks = [];

function deleteTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);

    const clean = p_tasks.filter(function (task) {
        return task.id !== parseInt(li.id); // false > filter
    });

    p_tasks.push(clean);

    saveTask();
}

function finishTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.appendChild(li);

    const clean = f_tasks.filter(function (task) {
        return task.id === parseInt(li.id);
    });

    const span = document.querySelector("span");
    const text = span.innerText;
    console.log(text);
    //    f_tasks = li;

    localStorage.setItem(F_TASK_KEY, JSON.stringify(f_tasks)); //
}

function saveTask() {
    localStorage.setItem(P_TASK_KEY, JSON.stringify(p_tasks));
}

function paint(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");
    const span = document.createElement("span");
    //const newId = tasks.length + 1;
    const newId = Date.now();

    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", deleteTask);

    finishedBtn.innerHTML = "✅";
    finishedBtn.addEventListener("click", finishTask);

    span.innerText = text;

    li.id = newId;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(finishedBtn);

    pendingList.appendChild(li);

    const taskObject = {
        id: newId,
        text: text,
    };
    p_tasks.push(taskObject);

    saveTask();
}

function handleChange(event) {
    event.preventDefault();

    const currentValue = taskInput.value;
    paint(currentValue);
    taskInput.value = "";
}

function loadTask() {
    const loadTasks1 = localStorage.getItem(P_TASK_KEY);

    if (loadTasks1 !== null) {
        const parseTasks = JSON.parse(loadTasks1);
        parseTasks.forEach(function (t) {
            paint(t.text);
        });
    }
}
/*
const init = () => {
    loadTask();
    taskInput.addEventListener("change", handleChange);
};
*/

function init() {
    loadTask();
    taskInput.addEventListener("change", handleChange);
}

init();
