const DOGS_URL = 'http://localhost:3000/pups'

//************************************************
//* 
function addAllDogsToDogBar(dogArray, filter = false){
    const dogBar = document.querySelector("#dog-bar")
    dogBar.innerHTML = ""
    if (filter) {
        dogArray.filter(dog => dog.isGoodDog).forEach(addDogSpantoDogBar)
    } else {
    dogArray.forEach(addDogSpantoDogBar)}
}

//************************************************
//* Standard function grabs the dogbar first
//* Creates a span within the dog bar using a variable 
//* Add the dog name 
//* Add the id using dataset.id - gets the correct id relative to the name 

function addDogSpantoDogBar(dog){
    const dogBar = document.querySelector("#dog-bar")
    const dogSpan = document.createElement("span")
    dogSpan.innerText = dog.name
    dogSpan.dataset.id = dog.id
    dogSpan.addEventListener("click", onDogSpanClick)
    dogBar.append(dogSpan)
}

//************************************************
//* Makes each function clickable with the id and guides it to the function 
//* to show the page.  

function onDogSpanClick(e){
    getSingleDog(e.target.dataset.id)
        .then(addDogInfoToPage)
}
//************************************************
//* In the dog info everything happens in steps

function addDogInfoToPage (dog) {
    //* Query select the dog info and create an empty html 
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    //* create an image element and add the source of the image, link with db
    const dogImg = document.createElement("img")
    dogImg.src = dog.image
    //* add an h2 and link it with the dog name
    const dogTitle = document.createElement("h2")
    dogTitle.innerText = dog.name
    //* create a button - text is a switch statement and link it with id 
    const dogButton = document.createElement("button")
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id
    //* Adds an event listener which links to the button click function
    dogButton.addEventListener("click", onGoodDogButtonClick)
    //* append all the elements to the div
    dogInfo.append(dogImg, dogTitle, dogButton)
}

//************************************************
//* Toggles the button to check if the dog is good or bad
//* Links it all to the dog bar 


function onGoodDogButtonClick(e){
    let newValue;
    if (e.target.innerText.includes("Good")){
        e.target.innerText = "Bad Dog"
        newValue = false
    } else {
        e.target.innerText = "Good Dog"
        newValue = true
    }
        toggleGoodDog(e.target.dataset.id, newValue).then(updateDogBar)
}
//************************************************
//* Checks for the filter button to be true/false and adds the values to an array

function updateDogBar(){
    const filterDogsButton = document.querySelector("#good-dog-filter")
    if (filterDogsButton.innerText.includes("OFF")){
        getDogs().then(dogArray => addAllDogsToDogBar(dogArray))
    } else {
        getDogs().then(dogArray => addAllDogsToDogBar(dogArray, true))
    }
}

//! Fetch commands

function getDogs(){
    return fetch(DOGS_URL)
    .then(r => r.json())
}

function getSingleDog(id){
    return fetch(DOGS_URL + `/${id}`)
    .then(r => r.json() )
}

function toggleGoodDog(id, newValue){
    const options = {
    method: "PATCH",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({isGoodDog: newValue})
    }
    return fetch(DOGS_URL + `/${id}`, options)
    .then(r => r.json())
}


const init = () => {
    getDogs()
    .then(addAllDogsToDogBar)
}
init()




