const form = document.getElementById("form");
const inputs = form.querySelectorAll('input');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
    });
});



inputs.forEach(input => {
    input.addEventListener('input', function () {
        localStorage.setItem(input.name, input.value);
    });
});

window.addEventListener("load", () => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        const storedValue = localStorage.getItem(input.name);

        if (storedValue) {
            input.value = storedValue
        }
    });
});



