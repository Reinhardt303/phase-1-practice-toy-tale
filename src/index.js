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


//above is supplied code

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => toyData.forEach(toy => {
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class=""toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
   `
    document.getElementById('toy-collection').appendChild(card)
  })

)}
toyFormContainer.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()
  debugger
  let toyObj = {
    name: event.target.name.value , //could be an errorc32:32
    image: event.target.image.value,
    likes: 0
}
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
  .then(response => response.json())
  .then(toy => {
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class=""toy-avatar">
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
   `
   document.getElementById('toy-collection').appendChild(card)
  })

}
document.getElementById('toy-collection').addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.className === 'like-btn'){
    let likes = Number(event.target.previousElementSibling.innerText)
    let likesPlusOne = likes + 1
    event.target.previousElementSibling.innerText =likesPlusOne + " Likes"


    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    })
    .then(response => response.json)


    
  }
})


getToys()

});
