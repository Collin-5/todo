// select items
const form = document.querySelector(".one");
const input = document.getElementById("value");
const items = document.querySelector(".items");
const btnClear = document.querySelector(".clear");
const btnSubmit = document.querySelector(".color");
const textAlert = document.getElementById("alert");

// Event listeners
form.addEventListener('submit', addItem);
btnClear.addEventListener('click', clearAll);
window.addEventListener('DOMContentLoaded', disitems);

// edit
let editElement;
let editId = "";
let editFlag = false;
// Functions
function addItem(e) {
    e.preventDefault();
    let value = input.value;
    const id = new Date().getTime();
    
    if (value !== "" && editFlag === false){
        const element = document.createElement("div");
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("item");
        element.innerHTML = `<div class="word">${value}</div>
        <div class="buttons">
            <button class="edit submit"><i class="far fa-edit"></i></button>
            <button class="delete submit"><i class="far fa-trash"></i></button>
        </div>
    `


     const btnDel = element.querySelector(".delete");
     const btnEdit = element.querySelector(".edit");

     btnDel.addEventListener('click', delet);
     btnEdit.addEventListener('click', edit);



    items.appendChild(element);
    items.classList.add("show");
    addToLocalStorage(id, value);
    setDefault();
    alertme("aded", "#00ff83");
    }

    else if (value !== "" && editFlag === true){
        editElement.innerHTML = value;
        alertme("Item Edited!", "#ff8300");
        editLocal(id, value);
        setDefault();

    }
    
    else {
        alertme("Please enter value!", "#ff8300");
    }
}

// Functions
function setDefault(){
    input.value = "";
    editId = "";
    editFlag = false;
    btnSubmit.textContent = "submit";
    btnSubmit.style.backgroundColor = "rgb(186, 205, 235)";

}
// alert
function alertme(text, action){
    textAlert.textContent = text;
    textAlert.style.backgroundColor = action;
    
    setTimeout(alertme, 2000);
}
// clear
function clearAll(){
    const item = document.querySelectorAll(".item");
    if (item.length > 0){
        item.forEach(function(all){
            items.removeChild(all);
            items.classList.remove("show");
        });
    }
    localStorage.removeItem("list");
    setDefault();
        
}
//delete


function delet(e){
    const element = e.currentTarget.parentElement.parentElement;
    let id = element.dataset.id
    items.removeChild(element);
    if (items.children.length === 1){
        items.classList.remove("show");    
    }
    removeFromeStorage(id);
alertme("Item deleted", "#ff8300");

}

// Edit
function edit(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    input.value = editElement.innerHTML;
    let id = element.dataset.id
    editFlag = true;
    btnSubmit.textContent = "edit";
    btnSubmit.style.backgroundColor = "rgb(156, 238, 183)";

    
}

// Add to local storage
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = {id,value};
    let items = getlocal();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromeStorage(id) {
    let items = getlocal();
    items = items.filter(function(item){
        if (item.id !==id){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));  
}
function editLocal(id, value){
    let items = getlocal();
    items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function getlocal(){
    return localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")):[];
}
// storage
// localStorage.setItem("oranges", JSON.stringify(["item","item2"]));
// const oranges = JSON.parse(localStorage.getItem("oranges"));
// console.log(oranges);


// ****** SETUP ITEMS **********
function disitems(){
    let items = getlocal();
    if (items.length > 0){
        items.forEach(function(item){
            getitems(item.id,item.value);
        })
    }
  
}

function getitems(id,value){
    const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`
        list.appendChild(element);
         // add event listeners to both buttons;
  
}


