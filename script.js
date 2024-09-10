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

//task object and array
let currentObj = {}
const taskList = JSON.parse(localStorage.getItem("data"))||[];

//elements to handle
const taskForm = document.getElementById("task-form")
const taskContainer = document.getElementById("tasks-container")
const closeDialog = document.getElementById("confirm-close-dialog")

/*
default logic

1. click add new task to open taskform :
    - a. add event listener to addTaskBtn / done
    - b. toggle taskForm class hidden / done
    - c. call reset to clear input values in taskForm /done    


2. when taskForm opens :        
    - a. add eventlistener to addOrUpdateBtn / done
    - b. add eventlistener to form and prevent default /done
    - c. add eventlistener to closeBtn /done
    - d. if this is update, call values from taskContainer with index

    2-1 (need to renew) when click addOrUpdateBtn:
    - a. get values from inputs and make object, save array to localStorage / done
    - b. add elements tasContainer inner html with 2-1 a, delete, edit button / done
    - c. toggle ftaskform hidden / done
    - d. (new) if innerText was update, get elment id, find object, update object.

    2-2 (new) when click closeBtn / done
    - a. showModal / done
    - b. if click discard, do thing and close modal, toggle taskForm hidden, call reset / done
    - c. if click cancel, close modal / done


3. when click delete /done
    - a. get data from localStorage /done
    - b. delete object using element ID and save data to localstorage /done
    - c. remove parentElement from html /done


4. when click Edit
    - a. toggle taskform hidden / done
    - b. change innertext of addOrUpdateBtn to update / done
    - c. get data from localStorage
    - d. get input value from object and display in input fields
    - e. if input value is changed, update object and save data to localstorage
*/


// function to delete task
const deleteTask = (el) => {
    taskList.splice(taskList.findIndex((item) => item.id === el.parentElement.id), 1);
    localStorage.setItem("data", JSON.stringify(taskList));    
    el.parentElement.remove(); // or call renderHtml();
};

// function to edit task
const editTask = (el) => {   
     // change addOrUpdate btn inner text to update and toggle taskform
     addOrUpdateBtn.innerText = "Update Task";
     taskForm.classList.toggle("hidden");
     // get data from localStorage, find object to edit using id and findIndex     
     currentObj = taskList[taskList.findIndex((item) => item.id === el.parentElement.id)]
    //set input values from object
    inputTaskTitle.value = currentObj.title;
    inputTaskDate.value = currentObj.date;
    inputTaskDescription.value = currentObj.description;
};


// function to makeTaksObj and save to localStorage
const makeTaskObj = () => {              
    //console.log("tasklist length", taskList.length)
    // make object and push to taskList
    const taskObj = {
        "id": `${inputTaskTitle.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        "title": inputTaskTitle.value,
        "date": inputTaskDate.value,
        "description": inputTaskDescription.value
    }
    taskList.push(taskObj);    
    // psave data to localStorage
    localStorage.setItem("data", JSON.stringify(taskList))
    //console.log(taskObj)
    taskForm.classList.toggle("hidden");
    renderHtml();
}


// function to render task list html
const renderHtml = () => {
    taskContainer.innerHTML = "";            
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


//function reset
const reset = () => {
    // empty every input value
    inputTaskTitle.value = "";
    inputTaskDate.value = "";
    inputTaskDescription.value = "";
    currentTask = {};
}


//event listeners
addNewTaskBtn.addEventListener("click",() => {
    addOrUpdateBtn.innerText = "Add Task"
    taskForm.classList.toggle("hidden"); 
    reset();
})

addOrUpdateBtn.addEventListener("click", makeTaskObj)

taskForm.addEventListener("submit", (e) => e.preventDefault())

closeBtn.addEventListener("click", () => {
    closeDialog.showModal()
    }
)

cancelBtn.addEventListener("click", () => closeDialog.close());
discardBtn.addEventListener("click", () => {
    closeDialog.close();
    reset();
    taskForm.classList.toggle("hidden");     
});