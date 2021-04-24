//import "./styles.css";

const clickTitle = document.querySelector("h2");

// You're gonna need this
function getTime() {
    // Don't delete this.

    const now = new Date();
    const xmasDay = new Date("2021-12-24:00:00:00+0900");

    const elapsed = xmasDay.getTime() - now.getTime();

    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    clickTitle.innerHTML = `${days}d ${hours < 10 ? `0${hours}` : hours}h ${minutes < 10 ? `0${minutes}` : minutes}m ${
        seconds < 10 ? `0${seconds}` : seconds
    }s`;

    return;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
    return;
}

init();
