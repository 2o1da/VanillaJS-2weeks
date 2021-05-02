const nameContainer = document.querySelector(".js-name");

const form = document.querySelector(".js-form"),
    //input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

function paintName(name) {
    nameContainer.innerHTML = "";
    const title = document.createElement("span");
    title.className = "name__text";
    title.innerHTML = `안녕, ${name}!`;
    nameContainer.appendChild(title);
}

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem("username", value);
    paintName(value);
}

function paintInput() {
    const input = document.createElement("input");
    input.placeholder = "너의 이름은 무엇이니?";
    input.type = "text";
    input.className = "name__input";

    const form = document.createElement("form");
    form.addEventListener("submit", handleSubmit);
    form.appendChild(input);
    nameContainer.appendChild(form);
}

function loadName() {
    const name = localStorage.getItem("username");
    if (name === null) {
        paintInput();
    } else {
        paintName(name);
    }
}

const USER_LS = "currentUser_LS",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit2(event) {
    event.preventDefault(); // event 금지(enter 눌러도 아무 반응 일어나지 않음)

    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName2() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
