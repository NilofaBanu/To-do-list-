const inputBox = document.getElementById("input-box") as HTMLInputElement;
const listContainer = document.getElementById("list-container") as HTMLUListElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;

function addTask(): void {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        const li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7"; // multiplication sign
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

addButton.addEventListener("click", addTask);

listContainer.addEventListener("click", (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    } else if (target.tagName === "SPAN") {
        const parent = target.parentElement;
        if (parent) {
            parent.remove();
            saveData();
        }
    }
});

function saveData(): void {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(): void {
    const saved = localStorage.getItem("data");
    if (saved) {
        listContainer.innerHTML = saved;
    }
}

showTask();
