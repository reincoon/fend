import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");



window.addEventListener("DOMContentLoaded", () => {
    const buttonSubmit = document.getElementById("submit-button");
    buttonSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        let logger = document.getElementById("logger");
        console.log("::: Form Submitted :::");
        buttonSubmit.disabled = true;
        logger.innerText = "Working...";
        handleSubmit();
    });
});

export { checkForName, handleSubmit };
