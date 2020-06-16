const submit=document.querySelector('.todo-button');
const filterOption=document.querySelector('.filter');
document.addEventListener('DOMContentLoaded',getDatafromStorage);
submit.addEventListener('click',()=>{
    const input=document.getElementById('input-task').value;
    let isValid=true;
    validInput(input);
    function validInput(input){
        const error=document.querySelector('.error');
         if(input === '')
         {
             error.innerHTML="<p>Please enter a task.</p>";
             isValid=false;
         }
         setTimeout(function(){
            error.innerHTML='';
          }, 2000);
    }
    if(isValid==true){
        addTodo();
       
       function addTodo(){
           const todoUl=document.querySelector('.todo-list');
           const todoDiv=document.createElement('div');
           todoDiv.classList.add('todo');
           const todoLi=document.createElement('li');
           todoLi.innerText=input;
           todoLi.classList.add('todo-item');
           todoDiv.appendChild(todoLi);
                saveLocal(input);
           const completeButton=document.createElement('button');
           completeButton.innerHTML='<i class="fas fa-check"></i>'
           completeButton.classList.add('complete-button');
           todoDiv.appendChild(completeButton);
           const deleteButton=document.createElement('button');
           deleteButton.innerHTML='<i class="fas fa-trash"></i>'
           deleteButton.classList.add('delete-button');
           todoDiv.appendChild(deleteButton);
           todoUl.appendChild(todoDiv);

           document.getElementById('input-task').value='';
           
           deleteButton.addEventListener('click', () =>{
               todoDiv.classList.add('drop');
               removeDatafromStorage(todoDiv);
                 todoDiv.addEventListener('transitionend',()=>{
                    todoDiv.remove();
                 })
           }) 
           completeButton.addEventListener('click', () =>{
               todoDiv.classList.toggle('completed');
           })

           filterOption.addEventListener('click',filter(todoUl, todoDiv));
       }
    }
})

function saveLocal(todo)
{
    let todos;
     if(localStorage.getItem('todos')===null)
      todos=[];
      else
      {
        todos=JSON.parse(localStorage.getItem('todos'));
      }
      todos.push(todo);
      localStorage.setItem('todos',JSON.stringify(todos));
}

function getDatafromStorage()
{
    let todos;
    if(localStorage.getItem('todos')===null)
     todos=[];
     else
     {
       todos=JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
        const todoUl=document.querySelector('.todo-list');
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        const todoLi=document.createElement('li');
           todoLi.innerText=todo; 
           todoLi.classList.add('todo-item');
           todoDiv.appendChild(todoLi);
           const completeButton=document.createElement('button');
           completeButton.innerHTML='<i class="fas fa-check"></i>'
           completeButton.classList.add('complete-button');
           todoDiv.appendChild(completeButton);
           const deleteButton=document.createElement('button');
           deleteButton.innerHTML='<i class="fas fa-trash"></i>'
           deleteButton.classList.add('delete-button');
           todoDiv.appendChild(deleteButton);
           todoUl.appendChild(todoDiv);

           deleteButton.addEventListener('click', () =>{
            todoDiv.classList.add('drop');
            removeDatafromStorage(todoDiv);
              todoDiv.addEventListener('transitionend',()=>{
                 todoDiv.remove();
              })
            }) 
        completeButton.addEventListener('click', () =>{
            todoDiv.classList.toggle('completed');
        })
        filterOption.addEventListener('click',filter(todoUl, todoDiv));
     })   
}

function removeDatafromStorage(todo){
    let todos;
    if(localStorage.getItem('todos')===null)
     todos=[];
     else
     {
       todos=JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex=todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem('todos', JSON.stringify(todos));
}

function filter(todoUl, todoDiv){
    const todos=todoUl.childNodes;
    document.addEventListener('click', (e)=>{
        todos.forEach(function(todo){
            switch(e.target.value){
                case 'all':
                    todoDiv.style.display ='flex';
                    break;
                case 'completed':
                    if(todoDiv.classList.contains('completed'))
                    todoDiv.style.display ='flex';
                    else{
                    todoDiv.style.display ='none';
                  }
                  break;
                  case 'uncompleted':
                    if(!todoDiv.classList.contains('completed'))
                    todoDiv.style.display ='flex';
                  else
                    todoDiv.style.display ='none';
                    break;
                  }               
        }) 
    })
  
}