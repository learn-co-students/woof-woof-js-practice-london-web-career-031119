const state = {
  dogs: [],
  filter: false
}
const filterBtn = document.getElementById('good-dog-filter');
filterBtn.onclick = () => {
  toggleFilter();
  renderDogBar();
}

window.onload = () => {
  getDogs().then(renderDogBar);
}

const BASE_URL = "http://localhost:3000/pups";

const get = (url) => {
  return fetch(url)
    .then(resp => resp.json());
};

const patch = (url, data) => {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Action": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(url, configObj)
    .then(resp => resp.json());
}

const getDogs = () => {
  return get(BASE_URL)
    .then(dogs => {
      state.dogs = dogs;
      return dogs;
    });
};

const updateDog = dog => patch(`${BASE_URL}/${dog.id}`, dog);

const renderDogBar = () => {
  const dogBar = document.getElementById('dog-bar');
  dogBar.innerHTML = '';
  const dogs = state.filter ? state.dogs.filter(dog => dog.isGoodDog) : state.dogs;
  dogs.map(createDogButton).map(dogEl => dogBar.append(dogEl));
};

const createDogButton = dog => {
  const span = document.createElement('span');
  span.id = `dog-${dog.id}`
  span.onclick = ()=> renderDogCard(dog.id);
  span.innerHTML = `${dog.name}`;
  return span;
};

const renderDogCard = (id) => {
  
  const dogInfo = document.getElementById('dog-info');
  dogInfo.innerHTML = '';
  const dog = state.dogs.find(dog => dog.id == id);
  const img = document.createElement('img');
  img.src = dog.image;
  const h2 = document.createElement('h2');
  h2.innerText = dog.name;
  const button = document.createElement('button');
  button.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  button.onclick = () => toggleGoodDog(dog.id);
  
  dogInfo.append(img, h2, button);
};

const toggleGoodDog = id => {
  const dog = state.dogs.find(dog => dog.id == id);
  dog.isGoodDog = !dog.isGoodDog;
  event.target.innerHTML = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  updateDog(dog);
}

const toggleFilter = () => {
  state.filter = !state.filter;
  filterBtn.innerHTML = state.filter ? "Filter good dogs: ON" : "Filter good dogs: OFF";
  renderDogBar();
}