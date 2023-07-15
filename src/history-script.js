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
    renderEntries();
})


historyLists.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-button")) {
        // Call the deleteEntry function
        deleteEntry(event.target.getAttribute("id"));
    }
    renderEntries();

})

function deleteEntry(index) {
    // Remove the entry using index of the entryList
    const entryList = JSON.parse(localStorage.getItem('entryList'));
    if (index >= 0 && index < entryList.length) {
        entryList.splice(index, 1);
    }

    // Update the local storage entryList
    localStorage.setItem('entryList', JSON.stringify(entryList));

    // Trigger the storage event
    localStorage.setItem('entryListUpdated', Date.now());

}

window.addEventListener("storage", function(event) {
    if (event.key === 'entryListUpdated') {
        renderEntries();
    }
})


function renderEntries() {
    const entryList = JSON.parse(localStorage.getItem('entryList')) || [];
    //const historyContainer = document.getElementById("history-container");
    // Clear existing entries
    historyLists.innerHTML = "";

    // TO DEBUG
    console.log(entryList);
    entryList.forEach((entry, index) => {
        const formEntry = createFormHistoryEntry(entry, index);
        historyLists.appendChild(formEntry);
    });
}

function createFormHistoryEntry(entry, index) {
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
    deleteButton.setAttribute("id", index);
    deleteButton.textContent = "Delete";
    formEntry.appendChild(deleteButton);

    return formEntry;
}
