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

function backTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);

    const task = li.children[0].innerText;
    paint(task);

    const clean = f_tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    f_tasks = clean;
    saveTask();
}

function checkTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerText;
    pendingList.removeChild(li);

    paintFinished(text);
    const clean = p_tasks.filter(function (t) {
        return t.id !== parseInt(li.id);
    });
    p_tasks = clean;
    saveTask();
}

function deleteTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);

    const clean = p_tasks.filter(function (task) {
        return task.id !== parseInt(li.id); // false > filter
    });

    p_tasks = clean;
    saveTask();
}

function deleteFinishedTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);

    const clean = f_tasks.filter(function (t) {
        return t.id !== parseInt(li.id);
    });

    f_tasks = clean;
    saveTask();
}
/*
function finishTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const className = li.parentNode.className;
    const value = li.id;

    const span = document.querySelector("span");
    const text = span.innerText;

    if (className === "pendingList") {
        target = document.getElementsByClassName("finishList");
        btn.innerText = "◀";

        p_tasks.splice(p_tasks.indexOf(value), 0);
        f_tasks.push({
            id: value,
            text: text,
        });

        const clean = p_tasks.filter(function (t) {
            return t.id !== li.id;
        });
        p_tasks = clean;
        saveTask();
    } else {
        target = document.getElementsByClassName("pendingList");
        btn.innerText = "✔";

        f_tasks.splice(f_tasks.indexOf(value), 0);
        p_tasks.push({
            id: value,
            text: text,
        });

        const clean = f_tasks.filter(function (t) {
            return t.id !== li.id;
        });

        f_tasks = clean;
        saveTask();
    }

    li.remove();
}
*/

function saveTask() {
    localStorage.setItem(P_TASK_KEY, JSON.stringify(p_tasks));
    localStorage.setItem(F_TASK_KEY, JSON.stringify(f_tasks));
}

function paint(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");
    const newId = p_tasks.length + 1;
    //const newId = Math.random().toPrecision(21);
    li.id = newId;

    span.innerText = text;

    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", deleteTask);

    finishedBtn.innerHTML = "✅";
    finishedBtn.addEventListener("click", checkTask);

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

function paintFinished(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const newId = f_tasks.length + 1;
    //const newId = Math.random().toPrecision(21);
    li.id = newId;

    span.innerText = text;

    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteFinishedTask);

    backBtn.innerText = "◀";
    backBtn.addEventListener("click", backTask);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(backBtn);

    finishedList.appendChild(li);

    const taskObject = {
        id: newId,
        text: text,
    };

    f_tasks.push(taskObject);
    saveTask();
}

function loadTask() {
    const loadPTasks = localStorage.getItem(P_TASK_KEY);
    const loadFTasks = localStorage.getItem(F_TASK_KEY);

    if (loadPTasks !== null) {
        const parseTasks = JSON.parse(loadPTasks);
        parseTasks.forEach(function (t) {
            paint(t.text);
        });
    }
    if (loadFTasks !== null) {
        const parseTasks = JSON.parse(loadFTasks);
        parseTasks.forEach(function (t) {
            paintFinished(t.text);
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
    taskInput.addEventListener("change", function (event) {
        event.preventDefault();

        const currentValue = taskInput.value;
        paint(currentValue);
        taskInput.value = "";
    });
}

init();
