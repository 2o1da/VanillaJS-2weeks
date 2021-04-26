// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const taskInput = document.querySelector("input");
const pendingList = document.querySelector(".pendingList");

const TASK_KEY = "task";

let tasks = [];

function deleteTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);

    console.log(tasks.id);
    console.log(li.id);
    const clean = tasks.filter(function (task) {
        return tasks.id !== parseInt(li.id);
    });

    console.log(clean);
    tasks = clean;

    saveTask();
}

function saveTask() {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}

function paint(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = tasks.length + 1;

    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", deleteTask);

    //finishedBtn.innerHTML = "✅";
    //finishedBtn.addEventListener("click", finishTask);

    span.innerText = text;

    li.appendChild(span);
    li.appendChild(deleteBtn);
    //li.appendChild(finishedBtn);
    pendingList.appendChild(li);

    const taskObject = {
        id: newId,
        text: text,
    };
    tasks.push(taskObject);

    saveTask();
}

function handleChange(event) {
    event.preventDefault();

    const currentValue = taskInput.value;
    paint(currentValue);
    taskInput.value = "";
}

function loadTask() {
    const loadTasks = localStorage.getItem(TASK_KEY);

    if (loadTasks !== null) {
        const parseTasks = JSON.parse(loadTasks);
        parseTasks.forEach(function (t) {
            paint(t.text);
        });
    }
}

const init = () => {
    loadTask();
    taskInput.addEventListener("change", handleChange);
};

init();
