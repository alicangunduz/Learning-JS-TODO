// Global variables
let taskLister = document.getElementById("taskLister") // Task Lister Position
// Data store for task
let taskList = []
if(localStorage.getItem("taskList") !== null){
    taskList = JSON.parse(localStorage.getItem("taskList"))
}
// Processing data from the task data store into the list
reloadTask()
function reloadTask() {
    if(taskList.length === 0){
        let taskHTML = `
        <div class="alert alert-success" role="alert">
          Congratulations, you have no assignments, <b><a onclick="taskAdd(1)">do you want to add new</a></b> ones?
        </div>
                  `
        taskLister.insertAdjacentHTML("beforeend", taskHTML)
    }
    else{
        for (let index in taskList){
           if (taskList[index].check === true){
               let taskHTML = `
     <li class="list-group-item bg-danger">
            <input onclick="check(${taskList[index].id})" class="form-check-input me-1" type="checkbox"  id="${taskList[index].id}" checked>
            <label class="form-check-label" for="${taskList[index].id}"><del>${taskList[index].taskName}</del></label>
            <div class="position-absolute top-50 end-0 translate-middle-y">
                <button onclick="updateTask(${index})" type="button" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i> Update</button>
                <button onclick="deleteTask(${index})" type="button" class="btn btn-dark btn-sm"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
        </li>
    `
               taskLister.insertAdjacentHTML("beforeend", taskHTML)
           }
           else {
               let taskHTML = `
     <li class="list-group-item">
            <input onclick="check(${taskList[index].id})" class="form-check-input me-1" type="checkbox"  id="${taskList[index].id}">
            <label class="form-check-label" for="${taskList[index].id}">${taskList[index].taskName}</label>
            <div class="position-absolute top-50 end-0 translate-middle-y">
                <button onclick="updateTask(${index})" type="button" class="btn btn-warning btn-sm"><i class="fa-solid fa-pen"></i> Update</button>
                <button onclick="deleteTask(${index})" type="button" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
        </li>
    `
               taskLister.insertAdjacentHTML("beforeend", taskHTML)
           }
        }
    }
}
// Add task
    document.getElementById("taskAddBtn").addEventListener("click" , taskAdd)
    document.getElementById("taskInput").addEventListener("keypress" , function (event){
        if (event.key === "Enter"){
            taskAdd()
        }
    })
    function taskAdd(alertControl) {
        let taskInput = document.getElementById("taskInput").value
        if (alertControl === 1){
            document.getElementById("taskInput").focus()
        }
        else if (taskInput === ""){
            alert("Please enter task")
            document.getElementById("taskInput").focus()
        }
        else{
            taskList.push({"id": taskList.length + 1, "taskName": taskInput , "check" : false})
            document.getElementById("taskInput").value = "" // Clear Input
            localStorage.setItem("taskList", JSON.stringify(taskList))
            taskRefresh()
        }
    }

// Refresh task list
function taskRefresh() {
    taskLister.innerHTML=""
    localStorage.setItem("taskList", JSON.stringify(taskList))
    reloadTask()
}
// Delete Task
function deleteTask(index){
    taskList.splice(index, 1)
    taskRefresh()
}
// Update task
function updateTask(index){
    let newTaskName = prompt("Enter new task name")
    if (newTaskName === ""){
        alert("You can't leave it blank")
        updateTask(index)
    }
    else {
        taskList[index].taskName = newTaskName
    }
    taskRefresh()
}
// Clear All Task
function clearAllTask(){
    taskList.splice(0,taskList.length)
    taskRefresh()
}
// Check & Uncheck Task
function check(id){
 const task = taskList.find(task => task.id === id)
    task.check = !task.check
    taskRefresh()
}
// Check & Uncheck All Task
function checkAll(){
    for (let index in taskList){
        taskList[index].check = !taskList[index].check
    }
    taskRefresh()
}
