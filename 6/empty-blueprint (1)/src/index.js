// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".c_form");
const inputNumber = document.querySelector(".c_number");
const chosen = document.querySelector(".c_chosen");
const slider = document.querySelector(".c_slider");
const sliderValue = document.querySelector("#value");

function handleValue() {
    sliderValue.innerText = slider.value;
    slider.oninput = function () {
        sliderValue.innerText = this.value;
    };
}

function handleSubmit(event) {
    const userValue = parseInt(inputNumber.value);
    const randomValue = parseInt(Math.floor(Math.random() * slider.value + 1));

    if (inputNumber.value !== "") {
        chosen.innerHTML = `You chose:${userValue}, the machine chose:${randomValue}.<br><br>
        ${userValue === randomValue ? "You won!" : "You lost!"}`;
    }

    event.preventDefault();
}

function init() {
    handleValue();
    form.addEventListener("submit", handleSubmit);
}

init();
