const formData = document.querySelector('#form');
const totalTask = document.querySelector('.totalTask');


function addItems(e) {
    e.preventDefault();
    let inputValue = document.querySelector(".input-field").value;
    let itemObj = {
        id: randomID(),
        item: inputValue
    }

    if(localStorage.getItem('items')===null) {
        let items = [];
        items.push(itemObj);
        localStorage.setItem('items', JSON.stringify(items));
    }else {
        let items = JSON.parse(localStorage.getItem('items'));
        items.push(itemObj);
        localStorage.setItem('items', JSON.stringify(items));
    }
// generate ransome id 
function randomID() {
    return Math.floor(Math.random()*1000000);
}
//clear form field
formData.reset();
fetchItems();
}

//fetch items from local storage
function fetchItems() {
    if(localStorage.getItem('items')) {
    let items = JSON.parse(localStorage.getItem('items'));
    let listItems = document.querySelector('.list-items');
    listItems.innerHTML = '';
    
    
    items.forEach(item => {
        return listItems.innerHTML += `<div class="item">
            <div class="item-text">${item.item}</div>
            <div class="btn-delete" id="btn-delete" onclick="deleteItem(${item.id})">Completed</div>
        </div>`
    });    

    let totalTaskcount = items.length;
    totalTask.innerHTML = totalTaskcount;
    }
}

// delete the item from the localstorage
    function deleteItem(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items = items.filter(item => {
          return item.id !== id;
      });
      localStorage.setItem('items', JSON.stringify(items));
      fetchItems();
    }

fetchItems();
formData.addEventListener('submit', addItems);
formData.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addItems();
    }
});