const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //console.log(event.target.parentNode);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    }); // ≒forEach(function)
    // filter:array의 모든 item을 통해 함수 실행하고 true인 itme만 가지고 새로운 array 생성
    toDos = cleanToDos; // let
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // LS에 JS의 data 저장할 수 없고 string만 가능
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.id = newId; // <li id="1">
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj); // 배열 추가

    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault(); // event 금지 방지

    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; // input 다시 공백으로 만듦
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); // ???

    if (loadedToDos !== null) {
        const parseToDos = JSON.parse(loadedToDos); // object
        parseToDos.forEach(function (toDo) {
            // forEach:array function
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
