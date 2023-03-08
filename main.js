const table = document.querySelector("table");
const positionData = { o: [], x: [] };
const winConditions = [...rows(), ...columns(), [1, 5, 9], [3, 5, 7]]

// function
function renderPlayer(position) {
  const box = document.querySelector(`td[data-position="${position}"]`)
  if (box === null || box.innerHTML) return
  positionData['o'].push(position)
  box.innerHTML = `<i class="fa-regular fa-o"></i>`
  if (checkWhetherWin(positionData['o'])) {
    setTimeout(() => {
      alert(`Player: "O" Win !`)
    }, 50);
  }
}

function renderAI() {
  // findemptyposition
  const emptyPositions = findEmptyPosition()
  console.log(emptyPositions)
  if (emptyPositions.length === 0) {
    return setTimeout(() => {
      alert('Tied !')
    }, 50);
  }
  // checkwhetherwin
  const aiCopy = positionData['x'].slice()
  for (const position of emptyPositions) {
    aiCopy.push(position)
    if (checkWhetherWin(aiCopy)) {
      positionData['x'].push(position)
      const box = document.querySelector(`td[data-position="${position}"]`)
      box.innerHTML = `<i class="fa-solid fa-x"></i>`
      console.log('hi')
      return setTimeout(() => {alert(`Player: "X" Win !`)}, 50)
    }
    aiCopy.pop()
  }
  // checkwhetherlose
  const playerCopy = positionData['o'].slice()
  for (const position of emptyPositions) {
    playerCopy.push(position)
    if (checkWhetherWin(playerCopy)) {
      positionData['x'].push(position)
      const box = document.querySelector(`td[data-position="${position}"]`)
      box.innerHTML = `<i class="fa-solid fa-x"></i>`
      return
    }
    playerCopy.pop()
  }
  // check "5" position
  if (emptyPositions.includes(5)) {
    positionData['x'].push(5)
    const box = document.querySelector('td[data-position="5"]')
    box.innerHTML = `<i class="fa-solid fa-x"></i>`
    return
  }
  // check [1, 3, 7, 9] position
  const arr = [1, 3, 7, 9]
  for (const position of arr) {
    if (emptyPositions.includes(position)) {
      positionData['x'].push(position)
      const box = document.querySelector(`td[data-position="${position}"]`)
      box.innerHTML = `<i class="fa-solid fa-x"></i>`
      return
    }
  }
  // random position
  const positionIndex = Math.floor(Math.random() * emptyPositions.length)
  const position = emptyPositions[positionIndex]
  positionData['x'].push(position)
  const box = document.querySelector(`td[data-position="${position}"]`)
  box.innerHTML = `<i class="fa-solid fa-x"></i>`
  return
}

function findEmptyPosition() {
  const boxs = document.querySelectorAll('td')
  const positions = []
  boxs.forEach(box => { if (box.innerHTML === "") positions.push(Number(box.dataset.position)) })
  return positions
}

function checkWhetherWin(who) {
  for (const condition of winConditions) {
    if (condition.every(position => who.includes(position))) {
      return true
    }
  }
  return false
}

function rows() {
  const rows = []
  for (let i = 1; i < 4; i++) {
    const row = []
    for (let j = 1; j < 4; j++) {
      row.push(3 * (i - 1) + j)
    }
    rows.push(row)
  }
  return rows
}

function columns() {
  const columns = []
  for (let i = 1; i < 4; i++) {
    const column = []
    for (let j = 1; j < 4; j++) {
      column.push(i + 3 * (j - 1))
    }
    columns.push(column)
  }
  return columns
}

// addEventListener
table.addEventListener("click", function (event) {
  const position = Number(event.target.dataset.position);
  renderPlayer(position);
  setTimeout(() => {
    renderAI()
  }, 50);
});
