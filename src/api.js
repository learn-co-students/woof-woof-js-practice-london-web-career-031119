const PUPS = 'http://localhost:3000/pups'

const getPups = () => {
  return fetch(PUPS)
    .then(resp => resp.json())}

const updatePup = (pup) =>
  fetch(PUPS + `/${pup.id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(pup)
  })
  .then(resp => resp.json())
