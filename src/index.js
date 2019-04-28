const PUPS_URL = 'http://localhost:3000/pups'
const filter = document.querySelector('button#good-dog-filter')
filter.addEventListener('click',()=>filterDogs())

const updateDog = dog => fetch(PUPS_URL + `/${dog.id}`, {
   method: 'PATCH',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(dog)
}).then(r => r.json()).then(showDog)

const showDog = dog => {
   const div = document.querySelector('#dog-info')
   div.innerHTML = `
      <img src=${dog.image}>
      <h2>${dog.name}</h2>
      <button>${dog.isGoodDog}</button>
   `
   div.addEventListener('click',(e)=> {
      if (e.target.nodeName === 'BUTTON') {
        dog.isGoodDog = !dog.isGoodDog
        updateDog(dog)
      }
   })
}

const showDogs = (dogs) => {
   const div =  document.querySelector('#dog-bar')
   dogs.forEach((dog) => {
      if (filter.textContent === 'Filter good dogs: OFF' ||
         (filter.textContent === 'Filter good dogs: ON' &&
         dog.isGoodDog === true)) {
            span = document.createElement('span')
            span.setAttribute('data-dog-id',dog.id)
            span.textContent = `${dog.name}`
            span.addEventListener('click', () => showDog(dog))
            div.append(span)
         }
   })
}

const getDogs = () =>
   fetch(PUPS_URL).then(r => r.json())
      .then(showDogs)

const filterDogs = () => {
   filter.textContent = 'Filter good dogs: ON'
   getDogs()
}

getDogs()