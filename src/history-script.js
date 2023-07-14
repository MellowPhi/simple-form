// const formFieldOrder = ["first-name", "last-name", "email", "phone", "company", "address"];
// const fieldLabels = {
//     "first-name": "First Name",
//     "last-name": "Last Name",
//     "email": "Email",
//     "phone": "Phone",
//     "company": "Company",
//     "address": "Address"
// };
// const historyCards = document.getElementsByClassName("submit-history-card");
// window.addEventListener("load", () => {
//     const historyCard = document.createElement("div");
//     historyCard.setAttribute("class", "submit-history-card");
//     formFieldOrder.forEach(key => {
//         const storedValue = localStorage.getItem(key);
//
//         if (storedValue) {
//             console.log(storedValue);
//             const pLabel = document.createElement("label");
//             pLabel.textContent = fieldLabels[key];
//             historyCards[0].appendChild(pLabel);
//
//             const pTag = document.createElement("p");
//             pTag.textContent = storedValue;
//             pTag.setAttribute("class", "card-" + key);
//             historyCards[0].appendChild(pTag);
//         }
//     });
//     const deleteBtn = document.createElement("button");
//     deleteBtn.setAttribute("class", "delete-button");
//     deleteBtn.textContent = "Delete";
//     historyCards[0].appendChild(deleteBtn);
// });


const form = document.getElementById("form");
const historyContainer = document.getElementById("submit-history-card");
const formFieldOrder = ["first-name", "last-name", "email", "phone", "company", "address"];
const fieldLabels = {
    "first-name": "First Name",
    "last-name": "Last Name",
    "email": "Email",
    "phone": "Phone",
    "company": "Company",
    "address": "Address"
};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {};

    formFieldOrder.forEach(fieldName => {
        const fieldValue = localStorage.getItem(fieldName);
        formData[fieldName] = fieldValue || "";
    });

    createFormHistoryEntry(formData);
    clearLocalStorage();
    clearFormFields();
});

function createFormHistoryEntry(formData) {
    const formEntry = document.createElement("div");
    formEntry.classList.add("form-entry");

    formFieldOrder.forEach(fieldName => {
        const fieldLabel = document.createElement("p");
        fieldLabel.textContent = fieldLabels[fieldName];
        formEntry.appendChild(fieldLabel);

        const fieldValue = document.createElement("p");
        fieldValue.textContent = formData[fieldName];
        formEntry.appendChild(fieldValue);
    });

    historyContainer.appendChild(formEntry);
}

function clearLocalStorage() {
    formFieldOrder.forEach(fieldName => {
        localStorage.removeItem(fieldName);
    });
}

function clearFormFields() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = "";
    });
}

window.addEventListener("load", () => {
    const formEntries = document.getElementsByClassName("form-entry");
    Array.from(formEntries).forEach(formEntry => {
        formEntry.remove();
    });
});
