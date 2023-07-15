const form = document.getElementById("form");
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', function () {
        localStorage.setItem(input.name, input.value);
        // Trigger the storage event
        localStorage.setItem('entryListUpdated', Date.now());
    });
});




function autoFillInputs() {
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        const storedValue = localStorage.getItem(input.name);

        if (storedValue) {
            input.value = storedValue
        }
    });

}

window.addEventListener("load", () => {
    autoFillInputs();
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveFormEntry();
    clearFormFields();
});

function clearFormFields() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = "";
    });
}

function saveFormEntry() {
    const entry = {};

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const name = input.name;
        const value = localStorage.getItem(name);
        entry[name] = value;
    });

    const entryList = JSON.parse(localStorage.getItem('entryList')) || [];
    entryList.push(entry);
    localStorage.setItem('entryList', JSON.stringify(entryList));


}


