function toggleTaskDetails() {
    const taskDetails = document.querySelector('.taskdetails');
    taskDetails.classList.toggle('show'); // Toggle the 'show' class for transition
}

const submitBtn = document.getElementById("submitButton");
const lists = document.getElementsByClassName("list-container");
const todoListContainer = document.querySelector(".todo .list-container");
const doneListContainer = document.querySelector(".done .list-container2");

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("tasktitle");
    const description = document.getElementById("Description");
    const dueDateInput = document.getElementById("dueDate");
    const dueTimeInput = document.getElementById("dueTime");

    const totalTasksCount = document.getElementById("totalTasksCount");
    const doneTasksCount = document.getElementById("doneTasksCount");
    if (title.value === "" || description.value === "") {
        alert("You can't leave title or description empty");
    } else {
        const todoWrapper = document.createElement("div");
        const todoItem = `
            <div class="task">
            <input type="checkbox" class="ckeckbox">
            <p class="title">${title.value}</p>
            <span class="editbutton" onclick="myFunction()"></span>
            <span class="deletebutton"></span>
            <div class="details">
            <p class="description">${description.value}</p>
            <p class="due-date">${dueDateInput.value}</p>
            <p class="due-time">${dueTimeInput.value}</p>
            </div>
        </div>
        `;
        todoWrapper.innerHTML = todoItem;
        lists[0].appendChild(todoWrapper); // Append to the first element in the lists collection
        title.value = "";
        description.value = "";
        dueDateInput.value = "";
        dueTimeInput.value = "";
        toggleTaskDetails();
        const checkBox = todoWrapper.querySelector(".ckeckbox");
        const toDoText = todoWrapper.querySelector(".title");
        const toDoDescription = todoWrapper.querySelector(".description");
        const toDoDueDate = todoWrapper.querySelector(".due-date");
        const toDoDueTime = todoWrapper.querySelector(".due-time");

        totalTasksCount.textContent = todoListContainer.children.length + doneListContainer.children.length;
        checkBox.addEventListener("change", () => {
            // Logic
            if (checkBox.checked) {
                toDoText.classList.add("completed");
                toDoDescription.classList.add("completed");
                toDoDueDate.classList.add("completed");
                toDoDueTime.classList.add("completed");
                doneListContainer.appendChild(todoWrapper);
                todoWrapper.querySelector(".editbutton").disabled = true;
                todoWrapper.querySelector(".deletebutton").disabled = true;
                doneTasksCount.textContent = doneListContainer.children.length;
            } else {
                toDoText.classList.remove("completed");
                toDoDescription.classList.remove("completed");
                toDoDueDate.classList.remove("completed");
                toDoDueTime.classList.remove("completed");
                todoListContainer.appendChild(todoWrapper);
                doneTasksCount.textContent = doneListContainer.children.length;
            }
        });

        //delete
        const deletebtn = todoWrapper.querySelector(".deletebutton");
        deletebtn.addEventListener("click", () => {
            lists[0].removeChild(todoWrapper);
            totalTasksCount.textContent = todoListContainer.children.length + doneListContainer.children.length;
        });

        const editButton = todoWrapper.querySelector(".editbutton");
        editButton.addEventListener("click", () => {
            // Populate task details form with existing data
            title.value = toDoText.textContent;
            description.value = toDoDescription.textContent;
            dueDateInput.value = toDoDueDate.textContent;
            dueTimeInput.value = toDoDueTime.textContent;
            
            // Store task index for later reference
            todoWrapper.dataset.index = Array.from(lists[0].children).indexOf(todoWrapper);
            // Show the edit div
            const editDiv = document.createElement("div");
            editDiv.classList.add("edit-div");
            editDiv.innerHTML = `
            <div class = "edit-panel">
            <h3>TASK Update</h3>
            <label for="">Task Title :</label> <br>
                <input type="text" value="${toDoText.textContent}">
                <br> <br>
            <label for="">Task Description :</label>
                <textarea>${toDoDescription.textContent}</textarea>
                <br> <br>
            <label for="">Due Date :</label>
                <input type="date" value="${toDoDueDate.textContent}">
                <br> <br>
            <label for="">Due Time :</label>
                <input type="time" value="${toDoDueTime.textContent}">  <br><br>
                <button class="btn btn-primary" id="save-changes">Save Changes</button>
                <button class="btn btn-danger" id="discard-changes">Discard Changes</button>
            </div>
            `;
            todoWrapper.appendChild(editDiv);
            title.value = "";
            description.value = "";
            dueDateInput.value = "";
            dueTimeInput.value = "";
            // Add event listener to save changes
            const saveChangesButton = editDiv.querySelector("#save-changes");
            saveChangesButton.addEventListener("click", () => {
                const newTitle = editDiv.querySelector("input").value;
                const newDescription = editDiv.querySelector("textarea").value;
                const newDueDate = editDiv.querySelector('[type="date"]').value;
                const newDueTime = editDiv.querySelector('[type="time"]').value;
                toDoText.textContent = newTitle;
                toDoDescription.textContent = newDescription;
                toDoDueDate.textContent = newDueDate;
                toDoDueTime.textContent = newDueTime;
                editDiv.remove();
            });
            // Add event listener to discard changes
            const discardChangesButton = editDiv.querySelector("#discard-changes");
            discardChangesButton.addEventListener("click", () => {
                editDiv.remove();
            });
        });
    }
});