// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const COUNTRY_KEY_LS = "country";

const select = document.querySelector("select");

function saveCountry() {
    console.log("saveCountry()");
    const option = select.options[select.selectedIndex].value;
    localStorage.setItem(COUNTRY_KEY_LS, option);
}

function showCountry() {
    console.log("showCountry()");
    const currentValue = localStorage.getItem(COUNTRY_KEY_LS);
    if (currentValue === null) {
    } else {
        select.value = currentValue;
    }
}

// 새로고침할 때마다 호출
function init() {
    select.addEventListener("change", saveCountry);
    showCountry();
}

init();
