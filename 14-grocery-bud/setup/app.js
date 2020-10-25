// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const submitBtn = document.querySelector(".submit-btn");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

    // load items
    window.addEventListener("DOMContentLoaded", setUpItems);
   //submit form
   form.addEventListener("submit", addItem);

   //clear items 
   clearBtn.addEventListener("click", clearItems);


// ****** FUNCTIONS **********

    // add item 
    function addItem(e){
        e.preventDefault();
        const value = grocery.value; 
        const id = new Date().getTime().toString();

        if(value && !editFlag){

        createListItem(id, value);
        
        //display alert
        displayAlert("item added to the list", "success");
        
        //show container
        container.classList.add("show-container");
        
        //add to local storage
        addToLocalStorage(id, value);
        
        //set back to default
        setBackToDefault();

        }else if(value && editFlag){
            editElement.innerHTML = value;
            displayAlert("item changed", "success");

            editLocalStorage(editID, value);
            setBackToDefault();
        }else {
        displayAlert("please enter value", "danger"); 
        }
    }
    
    // delete function
    function deleteItem(e){
      const element = e.currentTarget.parentElement.parentElement;
      const id = element.dataset.id;
      list.removeChild(element);
      if(list.children.length === 0){
          container.classList.remove("show-container");
      }
      displayAlert("item deleted", "danger");

      //remove from local storage
      removeFromLocalStorage(id);

      setBackToDefault();
    }

    // edit function

    function editItem(e){
        const element = e.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;

        //set edit item
        editElement = e.currentTarget.parentElement.previousElementSibling;

        // set form value
        grocery.value = editElement.innerHTML;
        editFlag = true;
        editID = id;
        submitBtn.textContent = "edit";
    }

    // clear items
    function clearItems(){
        const items = document.querySelectorAll(".grocery-item");
 
        if(items.length > 0){
            items.forEach(function(item){
                list.removeChild(item);
            });
        }

        container.classList.remove("show-container");
        displayAlert("empty list", "success");
        setBackToDefault();
        localStorage.removeItem("list");
    }

    // display alert
    function displayAlert(text, action){
        alert.textContent = text;
        alert.classList.add(`alert-${action}`);   
        
        // remove alert
        setTimeout(function(){
            alert.textContent = "";
            alert.classList.remove(`alert-${action}`);
        }, 2000);
    }

    //set back to default
    function setBackToDefault(){
        grocery.value = '';
        editFlag = false;
        editID = '';
        submitBtn.textContent = 'submit';
    }

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
   const grocery = {
       id : id,
       value : value
   } 

   let items = getLocalStorage(); 

   items.push(grocery);
   localStorage.setItem('list', JSON.stringify(items)); 
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id !== id){
           return item;
        }
    });
    
    localStorage.setItem('list', JSON.stringify(items)); 

}

function editLocalStorage(id, value){
    let items = getLocalStorage();

    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }

        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));     
}

function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
// ****** SETUP ITEMS **********

function setUpItems(){
    let items = getLocalStorage();

    if (items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value);
        });

        container.classList.add("show-container");
    }
}

function createListItem(id, value){
    const element = document.createElement('article');
    //add class
    element.classList.add("grocery-item");
    //add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn" title="edit"><i class="fa fa-edit"></i> </button>
                <button type="button" class="delete-btn" title="delete"><i class="fa fa-trash"></i> </button>
            </div>
    `;

    //get delete button
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    //get edit button
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    
    //append child
    list.appendChild(element);
}