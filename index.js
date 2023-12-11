import {
    
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
   
  } from './firebase.js';

 
const taskForm = document.getElementById('task-form') 
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">

      <div style="display: inline-block;">
      <label for="career-${task.idCareer}" style="color: aqua;">idCareer:</label>
      <span id="career-${task.idCareer}" style="color: white;">${task.idCareer}</span>
    </div>

    <div style="display: inline-block;">
    <label for="career-${task.name}" style="color: aqua;">Name:</label>
    <span id="career-${task.name}" style="color: white;">${task.name}</span>
  </div>

  <div style="display: inline-block;">
  <label for="career-${task.duration}" style="color: aqua;">Duration:</label>
  <span id="career-${task.duration}" style="color: white;">${task.duration}</span>
</div>


<div style="display: inline-block;">
<label for="career-${task.description}" style="color: aqua;">Description:</label>
<span id="career-${task.description}" style="color: white;">${task.description}</span>
</div>


<div style="display: inline-block;">
<label for="career-${task.status}" style="color: aqua;">Status:</label>
<span id="career-${task.status}" style="color: white;">${task.status}</span>
</div>

<div style="display: flex;">
  <button class="btn btn-primary btn-sm btn-delete" data-id="${doc.id}" style="margin-right: 5px;">
    🗑 Delete
  </button>
  <button class="btn btn-light btn-sm btn-edit" data-id="${doc.id}">
    🖉 Edit
  </button>
</div>



    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteTask(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          taskForm["task-idCareer"].value = task.idCareer;
          taskForm["task-name"].value = task.name;
          taskForm["task-duration"].value = task.duration;
          taskForm["task-description"].value = task.description;
          taskForm["task-status"].value = task.status;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const idCareer = taskForm["task-idCareer"];
  const name = taskForm["task-name"];
  const duration = taskForm["task-duration"];
  const description = taskForm["task-description"];
  const status = taskForm["task-status"];

  try {
    if (!editStatus) {
      await saveTask(idCareer.value,name.value,duration.value,description.value,status.value);
    } else {
      await updateTask(id, {
        idCareer: idCareer.value,
        name: name.value,
        duration: duration.value,
        description: description.value,
        status: status.value,
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    idCareer.focus();
  } catch (error) {
    console.log(error);
  }


  
  
});