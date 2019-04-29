const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const goodDogFilterBtn = document.querySelector("#good-dog-filter")

const renderPupOnBar = (pup) => {
  const pupSpan = document.createElement("span")
  pupSpan.innerText = `${pup.name}`
  pupSpan.addEventListener("click", () => showPupInfo(pup))
  dogBar.append(pupSpan)
}

const renderAllPupsOnBar = (pups) => {
  pups.forEach(renderPupOnBar)
}

const options = {
  true: "Good",
  false: "Bad"
}

const showPupInfo = (pup) => {
  dogInfo.innerHTML = `
  <img src=${pup.image}>
  <h2>${pup.name}</h2>
  <button>${options[pup.isGoodDog]} Dog!</button>
`

  const statBtn = dogInfo.querySelector("button")
  statBtn.addEventListener("click", ()=>{
    pup.isGoodDog = !pup.isGoodDog
    updatePup(pup)
    statBtn.innerText = `${options[pup.isGoodDog]} Dog!`
  })

  dogInfo.append()
}

const filterGoodPups = (pups) => {
  return pups.filter(pup => pup.isGoodDog === true)
}

const addEventListenerToGoodDogFilter = () => {
  goodDogFilterBtn.addEventListener("click", ()=>{
    switch(goodDogFilterBtn.innerText) {
      case "Filter good dogs: ON":
        goodDogFilterBtn.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
        getPups()
        .then(renderAllPupsOnBar)
        break;
      case "Filter good dogs: OFF":
        goodDogFilterBtn.innerText = "Filter good dogs: ON"
        dogBar.innerHTML = ""
        getPups()
        .then(filterGoodPups)
        .then(renderAllPupsOnBar)
        break;
      }
  })
}

//initialisation
const init = () => {
  getPups()
  .then(renderAllPupsOnBar)
  addEventListenerToGoodDogFilter()
}

init()
