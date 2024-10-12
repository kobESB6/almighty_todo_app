// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() { 
    if (nextID === 0) {       // if nextID is in local storage set it to 1
        nextID = 1;             
    } else {                 // else increment nextID by 1
        nextID++;
    }
localStorage.setItem("nextID", JSON.stringify(nextID)); // save nextID to local storage

return nextID; // return nextID
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let taskCard = $(`
     <div class="card task-card mb-3" data-1d="${task.id}">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small>Due: ${task.deadline}</p>
            <button class="btn btn-danger delete-task">Delete</button>"
        </div>
     </div>`);
// Event Listener for delete button
taskCard.find('.delete-task').click(handleDeleteTask);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
