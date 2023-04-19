const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')

let addToy = false

// FETCH FUNCTIONS

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        renderToy(toy)
      })
    })
}

function postToy(toyData) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyData)
  })
    .then(response => response.json())
    .then(toy => {
      renderToy(toy)
    })
}

function patchToy(toyId, likes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: likes
    })
  })
    .then(response => response.json())
    .then(toy => {
      const card = document.querySelector(`#toy-${toy.id}`)
      const likesTag = card.querySelector('p')
      likesTag.textContent = `${toy.likes} Likes`
    })
}

// RENDER FUNCTIONS

function renderToy(toy) {
  const card = document.createElement('div')
  card.className = 'card'
  card.id = `toy-${toy.id}`

  const h2 = document.createElement('h2')
  h2.textContent = toy.name

  const img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image

  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`

  const button = document.createElement('button')
  button.className = 'like-btn'
  button.id = toy.id
  button.textContent = 'Like ❤️'
  button.addEventListener('click', (event) => {
    const toyId = event.target.id
    const likesTag = event.target.previousElementSibling
    let currentLikes = parseInt(likesTag.textContent)
    let newLikes = currentLikes + 1
    patchToy(toyId, newLikes)
  })

  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)

  toyCollection.appendChild(card)
}

// EVENT LISTENERS

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const toyData = {
        name: event.target.name.value,
        image: event.target.image.value,
        likes: 0
      }
      postToy(toyData)
      event.target.reset()
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// INITIALIZATION

fetchToys()
