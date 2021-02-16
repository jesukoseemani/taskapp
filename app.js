const form = document.querySelector('.form-input');
const textInput = document.querySelector('#text-input');
const filterText = document.querySelector('#filter-text');
const taskList = document.querySelector('.ul-collection');
const filterSubmit = document.querySelector('#filter-submit');
const select = document.querySelector('.select');
const all = document.querySelector('.all');
const completed = document.querySelector('.completed');
const Uncompleted = document.querySelector('.Uncompleted');

loadAlleventListener();

function loadAlleventListener(){
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", checkedTask);
  taskList.addEventListener("click", delTask);
  filterSubmit.addEventListener("click", clearTasks);
  filterText.addEventListener("keyup", filterTask);
  select.addEventListener("click", selectThroughTask);
  document.addEventListener("DOMContentLoaded", showTaskInLS);
};

function showTaskInLS(){
let tasks;
if(localStorage.getItem("tasks") === null){
  tasks = [];

}else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function(task){
const li = document.createElement("li");
li.className = "ul-collection-list";

const p = document.createElement("p");
p.className = "ul-col-p";
p.appendChild(document.createTextNode(task));

li.appendChild(p);

const aOne = document.createElement("a");
aOne.className = "ul-link-mark";
aOne.innerHTML = '<ion-icon name="checkmark-done-outline"></ion-icon>';

li.appendChild(aOne);

const aTwo = document.createElement("a");
aTwo.className = "ul-link-delete";
aTwo.innerHTML = '<ion-icon name="archive-outline" class="ctr"></ion-icon>';

li.appendChild(aTwo);

taskList.appendChild(li);
});

};


function addTask(e){
if(textInput.value === ''){
  errorMessage("Enter Something in the input box", "rgb(133, 0, 0)"); 
  aTwo.innerHTML = '';
  aOne.innerHTML = '';
};

const li = document.createElement("li");
li.className = "ul-collection-list";

const p = document.createElement("p");
p.className = "ul-col-p";
p.appendChild(document.createTextNode(textInput.value));

li.appendChild(p);

const aOne = document.createElement("a");
aOne.className = "ul-link-mark";
aOne.innerHTML = '<ion-icon name="checkmark-done-outline"></ion-icon>';

li.appendChild(aOne);

const aTwo = document.createElement("a");
aTwo.className = "ul-link-delete";
aTwo.innerHTML = '<ion-icon name="archive-outline" class="ctr"></ion-icon>';

li.appendChild(aTwo);

taskList.appendChild(li);

storeTaskInLocalStorage(textInput.value);

textInput.value = '';


console.log(taskList);


e.preventDefault();
}

function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem("tasks") === null){
  tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
tasks.push(task);

localStorage.setItem("tasks", JSON.stringify(tasks));
}

function errorMessage(msg,color){
 const errMessage = document.createElement("div");
 errMessage.className = "input-err";
 errMessage.appendChild(document.createTextNode(msg));
 errMessage.style.color = color;

 const head = document.querySelector(".container-header");
 const tail = document.querySelector(".form-body");
 
 head.insertBefore(errMessage,tail);

 setTimeout(function(){
  errMessage.remove();
},2000)
 

}

function checkedTask(e){
if(e.target.parentElement.classList.contains('ul-link-mark')){
  e.target.parentElement.parentElement.classList.add('completed');
  checkedTaskInLocalStorage(e.target.parentElement.parentElement);
}
 
 console.log(e.target.parentElement.parentElement.firstElementChild);


};

function checkTaskInLocalStorage(checked){
  let tasks;
if(localStorage.getItem("tasks") === null){
  tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function(task){
checked.classList.add("completed");

});

localStorage.setItem("tasks", JSON.stringify(tasks));
};



function delTask(e){
  if(e.target.parentElement.classList.contains('ul-link-delete')){
    if(confirm("Are You Sure??")){
      const anime = e.target.parentElement.parentElement;
      anime.classList.add('transformation');
      anime.addEventListener("transitionend", function(e){
        anime.remove();
        
      });
      deleteInLocalStorage(e.target.parentElement.parentElement);
      };
    //anime.remove();
    };
};

function deleteInLocalStorage(del){
  let tasks;
if(localStorage.getItem("tasks") === null){
  tasks = [];
}else{
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function(task,index){
if(del.textContent === task){
 tasks.splice(index, 1);
}

});

localStorage.setItem("tasks", JSON.stringify(tasks));
};

function clearTasks(){
  
  taskList.innerHTML = '';

  clearTaskInLocalStorage();

};

function clearTaskInLocalStorage(){
  localStorage.clear();
}

function filterTask(e){
  const text = e.target.value.toLowerCase();
  const lists = document.querySelectorAll(".ul-collection-list");
  
   lists.forEach(function(list){

    const item = list.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      list.style.display = "flex";
    }else{
      list.style.display = "none";
    }
    
   })

  
};

function selectThroughTask(e){
  const listitems = document.querySelectorAll(".ul-collection-list");

  listitems.forEach(function(item){
      switch(e.target.value){
           case "All":
           item.style.display = "flex";
           break;
           
           case "Completed":
            if (item.classList.contains("completed")) {
              item.style.display = "flex";
            } else {
              item.style.display = "none";
            }
           
           break;

           case "Uncompleted":
           if(!item.classList.contains("completed")){
              item.style.display = "flex";
             }else{
              item.style.display = "none";
              }
              break;




      }
  });
};