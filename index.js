let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textArea = document.getElementById('textArea');
let msg = document.getElementById('msg');
let add = document.getElementById('add');
let tasks = document.getElementById('tasks');
let form = document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("Submit success");

    formValidation();
    
});

let formValidation = ()=>{
    if(textInput.value === ''){
        msg.innerHTML = "Task cannot be Blank"
    }else{
        msg.innerHTML = '';
        acceptData();
    }
    
}

let data = [];

let acceptData = ()=>{
    data.push({
        text : textInput.value,
        date : dateInput.value,
        description : textArea.value
    });

    localStorage.setItem('data',JSON.stringify(data));
    createTask();

};

let createTask = ()=>{
    tasks.innerHTML = '';
    data.map((x,y)=>{
        return(
            tasks.innerHTML += `
            <div id="${y}" class="border border-primary rounded mt-2">
              <span class="fw-bold text-success ms-3">  ${x.text}</span>
              <span class="small text-primary ms-3"> ${x.date}</span>
              <p class="ms-3"> ${x.description}</p>
              <span class="options m-3">
              <i onClick="editTask(this)" class="fas fa-edit me-3"></i>
              <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
            </span>

            </div>
            `
        )
    })

    resetTask();
}

let resetTask = ()=>{
    textInput.value = '';
    textArea.value = '';
    dateInput.value = '';
}

let deleteTask = (e)=>{
    
        e.parentElement.parentElement.remove();
        data.splice(e.parentElement.parentElement.id,1);
        localStorage.setItem('data',JSON.stringify(data));
        console.log('Deleted data =',data);    
    
}

let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;
    
    deleteTask(e)
}

// To get data from Local storage even afer refresh

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || data;
    createTask();
})();

//localstorage items manage

// setitem, getitem,removeitem,clear() to delete all