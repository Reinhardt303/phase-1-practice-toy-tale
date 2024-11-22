let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});
//above is supplied code

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => toyData.forEach(toy =>
  {let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <div class="card">
  <h2>"${toy.name}"</h2>
  <img src="${toy.image}" class=""toy-avatar">
  <p>"${toy.likes}"</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
  </div>
  `}))
}

function renderAToy(toy) {
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <div class="card">
  <h2>"${toy.name}"</h2>
  <img src="${toy.image}" class=""toy-avatar">
  <p>"${toy.likes}"</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
  </div>
  `
  card.querySelectorAll('.like-btn').addEventListener('click', (event) => { 
    event.preventDefault()    //do I need to pass in the event?
    toy.likes += 1
    card.querySelector('p').textContent = toy.likes
    //updateToy(toy)                           //where did i get this from? needed?
  })

  document.getElementById('toy-collection').appendChild(card)
}

let addToyForm = document.getElementsByClassName('add-toy-form')
let addToyFormArray = Array.from(addToyForm)
addToyFormArray[0][2].addEventListener('submit', handleSubmit) 

function handleSubmit(event) {
  event.preventDefault()
  let toyObj = {
    name: event.target.docuemnt.querySelector('.input-text').value ,
    image: event.target.document.querySelectorAll('.input-text')[1].value,
    likes: 0
}
  renderAToy(toyObj) 
  createNewToy(toyObj)
} 

function createNewToy(toyObj) {

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
       "Content-Type": "application/json",
       'Accept': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json)
  .then(toy => cocnsolelog(toy))
}

function updateToy(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json)
  
}

setTimeout(getToys, 1000)