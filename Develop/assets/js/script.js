// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

function generateTaskId() {
  // if nextId does not exist in localStorage, set it to 1
  if (nextId === null) {
    nextId = 1;
    // otherwise, increment it by 1
  } else {
    nextId++;
  }
  // save nextId to localStorage
  localStorage.setItem('nextId', JSON.stringify(nextId));
  return nextId;
}

function createTaskCard(task) {
  // create card elements
  const taskCard = $('<div>')
    .addClass('card w-75 task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  // set card background color based on due date
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // append card elements
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

function renderTaskList() {
  // if taskList is null, set it to an empty array
  if (!taskList) {
    taskList = [];
  }
  // empty existing task cards
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // loop through tasks and create task cards for each status
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
  // make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // function to clone the card being dragged so that the original card remains in place
    helper: function (e) {
      // check of the target of the drag event is the card itself or a child element if it is the card itself, clone it, otherwise find the parent card and clone that
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}

// function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  // create a new task object
  const task = {
    id: generateTaskId(),
    title: $('#taskTitle').val(),
    description: $('#taskDescription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'to-do',
  };
  // add the new task to the taskList save and render
  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
  $('#taskTitle').val('');
  $('#taskDescription').val('');
  $('#taskDueDate').val('');
}

// function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  // get the task id from the button clicked
  const taskId = $(this).attr('data-task-id');
  // remove the task from the taskList, save and render
  taskList = taskList.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // get the task id and new status from the event
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  for (let task of taskList) {
    // update the task status of the dragged card
    if (task.id === parseInt(taskId)) {
      task.status = newStatus;
    }
  }
  // save and render
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// function that runs when the page loads
$(document).ready(function () {
  // render the task list
  renderTaskList();
  // add event listener
  $('#taskForm').on('click', handleAddTask);
  // make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
  // make due date field a date picker
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
