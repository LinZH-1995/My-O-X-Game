const table = document.querySelector("table");
const positionData = { o: [], x: [] };
const winConditions = [...rows(), ...columns(), [1, 5, 9], [3, 5, 7]]
let someoneWin = false

// function
function renderPlayer(position) {
  if (draw(position, 'o')) {
    if (checkWhetherWin(positionData['o'])) {
      someoneWin = true
      setTimeout(() => {
        alert(`Player: "O" Win !`)
      }, 50);
    }
    return true
  }
  return false
}

function renderAI() {
  // findemptyposition
  const emptyPositions = findEmptyPosition()
  if (emptyPositions.length === 0) {
    return setTimeout(() => {
      alert('Tied !')
    }, 50);
  }
  // checkwhetherwin
  const aiCopy = positionData['x'].slice()
  if (checkWinOrLoseForAI(emptyPositions, aiCopy)) {
    someoneWin = true
    return setTimeout(() => { alert(`Player: "X" Win !`) }, 50)
  }
  // checkwhetherlose
  const playerCopy = positionData['o'].slice()
  if (checkWinOrLoseForAI(emptyPositions, playerCopy)) return
  // check "5" position
  if (emptyPositions.includes(5)) {
    return draw(5, 'x')
  }
  // check [1, 3, 7, 9] position
  const arr = [1, 3, 7, 9]
  for (const position of arr) {
    if (emptyPositions.includes(position)) {
      return draw(position, 'x')
    }
  }
  // random position
  const positionIndex = Math.floor(Math.random() * emptyPositions.length)
  const position = emptyPositions[positionIndex]
  return draw(position, 'x')
}

function draw(position, who) {
  const box = document.querySelector(`td[data-position="${position}"]`)
  if (box === null || box.innerHTML !== "") return false
  positionData[who].push(position)
  box.innerHTML = `<i class="fa-regular fa-${who}"></i>`
  return true
}

function checkWinOrLoseForAI(emptyPositions, whosCopy) {
  for (const position of emptyPositions) {
    whosCopy.push(position)
    if (checkWhetherWin(whosCopy)) {
      draw(position, 'x')
      return true
    }
    whosCopy.pop()
  }
  return false
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
  const position = Number(event.target.dataset.position)
  if (someoneWin) return

  if (renderPlayer(position)) {
    setTimeout(() => {
      renderAI()
    }, 50);
  }
});
