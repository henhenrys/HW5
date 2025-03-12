// function logSubmit(event) {
//     event.preventDefault()
//     const fname = document.getElementById("fname");
//     const email = document.getElementById("email");
//     const comments = document.getElementById("comments")
//     form.elements["info"].value = "Successfully submitted"
// }

// const form = document.getElementById("contact_form")
// form.addEventListener("submit", logSubmit);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("togglebutton").hidden = false;
    setSavedTheme();
    const form = document.getElementById("contact_form");
    const nameInput = document.getElementById("fname");
    const emailInput = document.getElementById("email");
    const commentsInput = document.getElementById("comments");
    const errorOutput = document.querySelector("output[name='form-error']");
    const infoOutput = document.querySelector("output[name='form-info']");
    let formErrors = [];
    let com = 0;
    let nam = false;
    let ema = false;

    function logError(message) {
        errorOutput.textContent = message;
        errorOutput.style.color = "red";
        setTimeout(() => {
            errorOutput.textContent = "";
        }, 3000);
    }

    nameInput.addEventListener("input", (e) => {
        const validPattern = /^[A-Za-z ]{3,50}$/;
        if (!validPattern.test(e.target.value)) {
            e.target.classList.add("flash-error");
            nam = false;
            logError("Invalid full name");
            validateBeforeSubmit();
        } else {
            e.target.setCustomValidity("");
            nam = true;
            validateBeforeSubmit();
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    emailInput.addEventListener("input", () => {
        if (!isValidEmail(emailInput.value)) {
            ema = false;
            validateBeforeSubmit();
            logError("Invalid email format.")
        } else {
            emailInput.setCustomValidity("");
            ema = true;
            validateBeforeSubmit();
        }
    });

    const charLimit = 500;
    const commentRegex = /^[a-zA-Z0-9 .,!?'"()\-]*$/;

    commentsInput.addEventListener("input", () => {
        const remaining = charLimit - commentsInput.value.length;
        infoOutput.style.color = remaining <= 0 ? "red" : "black";
        infoOutput.textContent = remaining <= 0 ? "" : `Characters left: ${remaining}`;
        errorOutput.textContent = remaining <= 0 ? "Over the character limit" : "";
        if (!commentRegex.test(commentsInput.value)) {
            com = 2;
            logError("Invalid characters in comment.");
        }
        if (remaining >= charLimit) {
            com = 0;
            validateBeforeSubmit();
            logError("No comments recorded.")
        } else if (remaining < 0) {
            com = 1;
            validateBeforeSubmit();
            logError("Comment exceeds character limit.")
        } else {
            commentsInput.setCustomValidity("");
            com = 3;
            validateBeforeSubmit();
        }
    });

    function validateBeforeSubmit() {
        formErrors = [];
        if (ema == false) formErrors.push("Invalid email format.");
        if (nam == false) formErrors.push("Invalid full name");
        if (com === 0) formErrors.push("No comments recorded.");
        if (com === 1) formErrors.push("Comment exceeds character limit.");
        if (com === 2) formErrors.push("Invalid characters in comment.");
        if(formErrors.length == 0) {
            document.getElementById("confor").hidden = false
        }
    }

    form.addEventListener("submit", (e) => {
        const errorField = document.createElement("input");
        errorField.type = "hidden";
        errorField.name = "form-errors";
        errorField.value = JSON.stringify(formErrors);
        form.appendChild(errorField);
    });
    setSavedTheme();
});

function setTheme(theme) {
    const root = document.documentElement;
    const toggle = document.getElementById("togglebutton")
    const colo = document.getElementById("color")
    const bg_colo = document.getElementById("bg_color")
    const fon = document.getElementById("font")
    if (theme === 'evil'){
        root.style.setProperty('background', 'rgb(46, 43, 43)');
        root.style.setProperty('color', 'white');
        toggle.innerText = "Light Mode";
    }
    else if (theme === 'good'){
        root.style.setProperty('background', 'white');
        root.style.setProperty('color', 'black');
        toggle.innerText = "Night Mode";
    }
    else {
        if(localStorage.getItem('bgtheme')) {
            console.log("do we get here")
            console.log(localStorage.getItem('bgtheme'))
            console.log(localStorage.getItem('fonttheme'))
            console.log(localStorage.getItem('theme'))
            root.style.setProperty('background', localStorage.getItem('bgtheme'));
            root.style.setProperty('color', localStorage.getItem('theme'));
            root.style.setProperty('font-family', localStorage.getItem('fonttheme'));
            toggle.innerText = "Light Mode";
        }
        else {
            root.style.setProperty('background', bg_colo.value);
            root.style.setProperty('color', colo.value);
            root.style.setProperty('font-family', fon.value);
            toggle.innerText = "Light Mode";
        }
    }
}

function setFunTheme() {
    const colo = document.getElementById("color")
    const bg_colo = document.getElementById("bg_color")
    const fon = document.getElementById("font")
    localStorage.setItem('theme', colo.value);
    localStorage.setItem('bgtheme', bg_colo.value);
    localStorage.setItem('fonttheme', fon.value);
    setTheme(colo.value)
}

document.getElementById("themeSelect").addEventListener("submit", function(event){
    event.preventDefault()
    setFunTheme();
  });

function toggleTheme() {
    const currTheme = localStorage.getItem('theme') || 'good';
    const newTheme = currTheme === 'good'? 'evil': 'good';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
}

function setSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) {
        setTheme(savedTheme);
        if(savedTheme == 'evil') {
            document.getElementById('themeToggle').checked = (savedTheme === 'evil');
        }
    }
}
