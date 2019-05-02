const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilter = document.querySelector('#good-dog-filter')

const state = {
    dogs: [],
    selectedDog: null
}

const renderDogs = () => {
    dogBar.innerHTML = ''
    state.dogs.forEach(renderDog)
}

const renderDog = dog => {
    const span = document.createElement('span')
    span.innerText = dog.name
    dogBar.append(span)

    span.addEventListener('click', () => {
        state.selectedDog = dog
        printDog()
    })
}

const printDog = () => {
    let printer = `
    <img src= ${state.selectedDog.image} >
    <h2>${state.selectedDog.name}</h2>
    `

    if (state.selectedDog.isGoodDog) {
        printer += `<button class"dog-status">Good Doggo!</button>`
    } else {
        printer += `<button class"dog-status">Bad Doggo!</button>`
    }

    dogInfo.innerHTML = printer

    dogStatusUpdate()
}

const dogStatusUpdate = () => {
    const dogStatus = dogInfo.querySelector('button')
    dogStatus.addEventListener('click', () => {
        if (dogFilter.innerText === 'Filter good dogs: ON') {
            state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
            updateDog(state.selectedDog)
            printDog()
            renderGoodDogs()
        } else {
            state.selectedDog.isGoodDog = !state.selectedDog.isGoodDog
            updateDog(state.selectedDog)
            printDog()
        }
    })
}

const filterDogs = () => {
    dogFilter.addEventListener('click', () => {
        if (dogFilter.innerText === 'Filter good dogs: ON') {
            dogFilter.innerText = 'Filter good dogs: OFF'
            renderDogs()
        } else {
            dogFilter.innerText = 'Filter good dogs: ON'
            renderGoodDogs()
        }
    })
}

const renderGoodDogs = () => {
    const goodDogs = state.dogs.filter(dog => dog.isGoodDog === true)
    dogBar.innerHTML = ''
    goodDogs.forEach(renderDog)
}

const init = () => {
    getDogs()
        .then((dogs) => {
            state.dogs = dogs
            renderDogs()
        })
    filterDogs()
}

init()