//buttons
const addNewTaskBtn = document.getElementById("open-task-form-btn");
const closeBtn = document.getElementById("close-task-form-btn");
const addOrUpdateBtn = document.getElementById("add-or-update-task-btn"); // you should change inner text too
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");

//inputs
const inputTaskTitle = document.getElementById("title-input");
const inputTaskDate = document.getElementById("date-input");
const inputTaskDescription = document.getElementById("description-input");

//elements to handle
const taskForm = document.getElementById("task-form")
const taskContainer = document.getElementById("tasks-container")


/*
default logic

1. click add new task to open taskform :
    - a. add event listener to addTaskBtn / done
    - b. toggle taskForm class hidden / done
    - c. call reset to clear input values in taskForm /done

2. when taskForm opens :        
    - a. add eventlistener to addOrUpdateBtn / done
    - b. add eventlistener to form and prevent default
    - c. add eventlistener to closeBtn
    - d. if this is update, call values from taskContainer with index

    2-1 when click addOrUpdateBtn:
    - a. get values from inputs and make object, save array to localStorage
    - b. add elements tasContainer inner html with 2-1 a, delete, edit button
    - c. toggle ftaskform hidden 
*/
const editTask = (e) => {
    console.log("edit!")
};

const deleteTask = (e) => {
    console.log("delete!")
}

const makeTaskObj = (e) => {
    const taskObj = {
        "title": inputTaskTitle.value,
        "date": inputTaskDate.value,
        "description": inputTaskDescription.value
    }
    //console.log(taskObj)
    const elementHtml = `
        <div class="task">
        <p>Title: ${taskObj.title}</p>
        <p>Date: ${taskObj.date}</p>
        <p>Description: ${taskObj.description}</p>
        <button class="btn" type="button" onclick="editTask(this)">Edit</button>
        <button class="btn" type="button" onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    taskForm.classList.toggle("hidden"); 
    taskContainer.innerHTML += elementHtml;
}

const reset = () => {
    inputTaskTitle.value = "";
    inputTaskDate.value = "";
    inputTaskDescription.value = "";
}

addNewTaskBtn.addEventListener("click",() => {
    taskForm.classList.toggle("hidden"); 
    reset();
})

addOrUpdateBtn.addEventListener("click", makeTaskObj)

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
})
