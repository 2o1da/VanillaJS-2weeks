// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const body = document.querySelector("body");
const title = document.querySelector("h2");

function handleResize() {
    title.style.color = "rgb(255,255,255)";
    if (window.innerWidth < 360) {
        body.style.backgroundColor = "rgb(0, 128, 255)";
    } else if (window.innerWidth < 720) {
        body.style.backgroundColor = "rgb(128, 0, 255)";
    } else {
        body.style.backgroundColor = "rgb(255, 208, 0)";
    }
}

function init() {
    window.addEventListener("resize", handleResize);
}

init();
