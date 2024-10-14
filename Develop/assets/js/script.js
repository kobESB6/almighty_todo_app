// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() { 
    if (nextID === null) { // if nextID is null
        nextID = 1; {       // if nextID is in local storage set it to 1
      nextID;  // set id to nextID;             
     nextID++;       // else increment nextID by 1
       
    }
localStorage.setItem("nextID", JSON.stringify(nextID)); // save nextID to local storage

return id; // return nextID
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
return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || []; // Get the task list from local storage or an empty array if no tasks are saved
    //clear the task list
    $('#todo-cards, #in-progress-cards, #done-cards').empty();

    //loop through the task list and render each task
    taskList.forEach(task => {
        let taskCard = createTaskCard(task);

        if (task.status === 'todo') {
            $('#todo-cards').append(taskCard);
        } else if (task.status === 'in-progress') {
           $('#in-progress-cards').append(taskCard);
        } else if (task.status === 'done') {
          $('#done-cards').append(taskCard);  
        } 
        }
    );
// Make task cards draggable
$('.task-card').draggable({
    revert: "invalid",  // revert the card if it is not dropped in a droppable area
    helper: "clone"    // create a clone of the card to drag
});
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault(); // Preventtyhe form from submitting  the traditional way
    // Get task details from the form
    const title = $('#task-title').val();
    const description = $('#task-description').val();
    const deadline = $('#task-deadline').val();

    //Create a new task object
    const newtask = {
        qd: generateTaskId(),
        title: title,
        description: description,
        deadline: deadline,
        status: 'todo'               // New tasks starts in the 'To DO' column
    };

    // Add the new task to the task list
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList)); // Save the task list to local storage

    //Close the modal for and clear the form fields
    $('#formModal').modal('hide');
    $('#task-form')[0].reset()

    //Re Render the task list
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
const taskId = $(enet.target).closest('.task-card').data('id');
// Remove from the task list
taskList = taskList.filter(task => task.id !== taskId);
// Update local storage with the new task list
localStorage.setItem('tasks', JSON.stringify(taskList));
// Re render the task list
renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = $(ui.draggable).data('id');
    const newStatus = $(this).attr('id'); // Get the id of the droppable area
    // Update the status of the task in the task list
    if (task.id === taskId) {
        task.status = newStatus === 'todo-cards' ? 'to-do' :
                      newStatus === 'in-progress-cards' ? 'in-progress' : 'done';
    }
};

//Save the update task list to local storage
localStorage.setItem('tasks', JSON.stringify(taskList));
// Re render the task list
renderTaskList();


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Render the task list
    renderTaskList();

    //add evemt listener to the add task button
    $('task-form').submit(handleAddTask);

    // Make the status lanes droppable
    $('#todo-cards, #in-progress-cards, #done-cards').droppable({
        accept: '.task-card',
        drop: handleDrop            // Call the handleDrop function when a task is dropped
});
// Set up the date picker for the due date field;
});
$(document).ready(function () {
    // Render tasks on page load
    renderTaskList();
  
    // Attach form submit event to add new task
    $('#taskForm').on('submit', handleAddTask);
  
    // Make columns (lanes) droppable
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
  
    // Initialize the date picker
    $('#taskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });
  