const url = 'http://localhost:3000/pups'

const getDogs = () =>
    fetch(url)
    .then(resp => resp.json())


const updateDog = dog =>
    fetch(url + `/${dog.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
    }).then(resp => resp.json())