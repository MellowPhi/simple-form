const form = document.getElementById("form");
const inputs = form.querySelectorAll('input');

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

function deleteEntry(index) {
    // Remove the entry using index of the entryList
    const entryList = JSON.parse(localStorage.getItem('entryList')) || [];
    if (index >= 0 && index < entryList.length) {
        entryList.splice(index, 1);
    }
    localStorage.setItem('entryList', JSON.stringify(entryList)); // Update localStorage

    // Trigger the storage event to notify other tabs about the change
    localStorage.setItem('entryListUpdated', Date.now());
}
