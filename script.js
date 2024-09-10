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

// function to edit task
const editTask = (el) => {    
    console.log("edit!", el.parentElement.id)
};

// function to delete task
const deleteTask = (el) => {    
    const taskList = JSON.parse(localStorage.getItem("data"));
    taskList.splice(taskList.findIndex((item) => item.id === el.parentElement.id), 1);
    localStorage.setItem("data", JSON.stringify(taskList));    
    el.parentElement.remove(); // or call renderHtml();
};

// function to render task list html
const renderHtml = () => {
    taskContainer.innerHTML = "";
    // get date from localStorage
    const taskList = JSON.parse(localStorage.getItem("data"));
    //console.log("tasklist", taskList)
    // convert to html element and render.
    const elementHtml = taskList.forEach( ({id, title, date, description}) => {
        taskContainer.innerHTML +=
        `
        <div class="task" id="${id}">
            <p>Title: ${title}</p>
            <p>Date: ${date}</p>
            <p>Description: ${description}</p>
            <button class="btn" type="button" onclick="editTask(this)">Edit</button>
            <button class="btn" type="button" onclick="deleteTask(this)">Delete</button>
        </div>
    `        
    });
}

// function to makeTaksObj and save to localStorage
const makeTaskObj = (e) => {
    // get data from localStorage
    const taskList = JSON.parse(localStorage.getItem("data")) || []; 
    //console.log("tasklist length", taskList.length)
    // make object and push to taskList
    const taskObj = {
        "id": `${inputTaskTitle.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        "title": inputTaskTitle.value,
        "date": inputTaskDate.value,
        "description": inputTaskDescription.value
    }
    taskList.push(taskObj);
    console.log(taskList);    
    // psave data to localStorage
    localStorage.setItem("data", JSON.stringify(taskList))
    //console.log(taskObj)
    taskForm.classList.toggle("hidden");
    renderHtml();
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
