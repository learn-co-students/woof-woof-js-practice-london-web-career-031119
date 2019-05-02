const dogDisplay = document.querySelector('div#dog-bar')
const dogInfo = document.querySelector('div#dog-info')
const filterBtn = document.querySelector('button#good-dog-filter')


const sample = {
    "id": 1,
    "name": "Mr. Bonkers",
    "isGoodDog": true,
    "image": "https://weloveanimals.me/wp-content/uploads/2017/10/gettyimages-590486672-e1508512743796.jpg"
}

function filterDog() {
    filterBtn.addEventListener('click', () => {
        if (filterBtn.innerText == "Filter good dogs: OFF") {
            filterBtn.innerText = "Filter good dogs: ON"
            displayFilter()
        } else {
            filterBtn.innerText = "Filter good dogs: OFF"
            displayItems()
        }
        //     deleteItem(item.id)
        // })

    })
}




function displayItem(item) {
    //display single item when given object.
    //adds event listener to item
    let spanEL = document.createElement("span")
    spanEL.className = 'span'
    spanEL.innerHTML = `
    <span>${item.name}</span>
`
    // <h2>${item.name}</h2>
    // <img src=${item.image} class="toy-avatar" />
    // <p>${item.likes} Likes </p>
    // <button class="like-btn">Like <3</button>
    // <button class = "delete-btn" > Delete </button>


    // let spanBtn = spanEL.querySelector('span.span')
    // let likeText = div.querySelector('p')
    let x = (item.isGoodDog == true) ? "Good Dog!" : "Bad Dog!";
    // let deleteBtn = div.querySelector('button.delete-btn')

    spanEL.addEventListener('click', () => {

        dogInfo.innerHTML = `
     <img src=${item.image}>
     <h2>${item.name}</h2>
     <button id="good">${x}</button>
`

        document.querySelector('button#good').addEventListener('click', () => {
            if (x == "Good Dog!") {
                item.isGoodDog = false
                document.querySelector('button#good').innerText = "Bad Dog!"
                x = "Bad Dog!"
                updateItem(item)
            } else {
                item.isGoodDog = true
                document.querySelector('button#good').innerText = "Good Dog!"
                x = "Good Dog!"
                updateItem(item)
            }
        })
    })



    dogDisplay.append(spanEL)
}

function displayItems() {
    dogDisplay.innerHTML = ""
    getItems().then(function (items) {
        items.forEach((x) => {
            test()
            // console.log(x)
            displayItem(x)
        })

    })
}

function displayFilter() {

    dogDisplay.innerHTML = ""
    getItems().then(function (items) {
        items.forEach((x) => {
            if (x.isGoodDog == true) {
                displayItem(x)
            } else {
                test()
            }
        })

    })
}


////
////server actions

function test() {
    console.log('test')
}

const URL = 'http://localhost:3000/pups'

const getItems = () =>
    fetch(URL)
    .then(resp => resp.json())

const createItem = item =>
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(resp => resp.json())

const updateItem = item =>
    fetch(URL + `/${item.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(resp => resp.json())

const deleteItem = id =>
    fetch(URL + `/${id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())

/////RUN/////

function init() {
    displayItems()
    filterDog()
    test()
}

init()