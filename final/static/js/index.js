//const first = document.getElementById("title");
const title = document.querySelector("#title");

title.innerHTML = "PMJ";
// title.style.color = "yellow";
document.title = "Beautiful";

console.dir(document);

// event 객체
function handleResize(event) {
    console.log(event);
    console.log("I've been resized");
}

// handleResize() : 호출 안해도 자동으로 호출 됨
// handleResize : 바로 호출하지 않고
window.addEventListener("resize", handleResize);

const BASE_COLOR = "rgb(255, 255, 255)"; // white
const OTHER_COLOR = "#000000"; // black

/*
function handleClick() {
    const currentColor = first.style.color;
    if (currentColor === BASE_COLOR) {
        first.style.color = OTHER_COLOR;
    } else {
        first.style.color = BASE_COLOR;
    }
}
*/

const CLICKED_CLASS = "clicked";

function handleClick() {
    /*
    //const currentClassName = title.className;
    const hasClass = title.classList.contains(CLICKED_CLASS);

    if (!hasClass) {
        //if (currentClassName !== CLICKED_CLASS) {
        //title.className = CLICKED_CLASS;
        title.classList.add(CLICKED_CLASS);
    } else {
        //title.className = "";
        title.classList.remove(CLICKED_CLASS);
    }
    */
    title.classList.toggle(CLICKED_CLASS); // 클래스가 없으면  add, 있으면 remove
}

function init() {
    //title.style.color = BASE_COLOR;
    title.addEventListener("click", handleClick);
}

init();
