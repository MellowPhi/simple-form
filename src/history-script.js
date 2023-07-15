const historyLists = document.getElementById("history-card-lists");
const formFieldOrder = ["first-name", "last-name", "email", "phone", "company", "address"];
const fieldLabels = {
    "first-name": "First Name",
    "last-name": "Last Name",
    "email": "Email",
    "phone": "Phone",
    "company": "Company",
    "address": "Address"
};

window.addEventListener("load", () => {
    const formData = {};

    formFieldOrder.forEach(fieldName => {
        const fieldValue = localStorage.getItem(fieldName);
        formData[fieldName] = fieldValue || "";
    });


    createFormHistoryEntry(formData);
})

window.addEventListener("load", () => {
    const entryList = JSON.parse(localStorage.getItem('entryList')) || [];
    const historyLists = document.getElementById("history-card-lists");
    //const historyContainer = document.getElementById("history-container");

    entryList.forEach(entry => {
        const formEntry = createFormHistoryEntry(entry);
        historyLists.appendChild(formEntry);
    });
});


function createFormHistoryEntry(entry) {
    const listEntry = document.createElement("li");
    listEntry.classList.add("history-card-lists");
    listEntry.setAttribute("id", "history-card-lists");

    const formEntry = document.createElement("div");
    formEntry.setAttribute("class", "submit-history-card");


    formFieldOrder.forEach(fieldName => {
        const fieldLabel = document.createElement("label");
        fieldLabel.textContent = fieldLabels[fieldName];
        formEntry.appendChild(fieldLabel);

        const fieldValue = document.createElement("p");
        fieldValue.textContent = entry[fieldName];
        fieldValue.setAttribute("class", "card-" + fieldName);
        formEntry.appendChild(fieldValue);
    });


    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    formEntry.appendChild(deleteButton);

    return formEntry;
}




