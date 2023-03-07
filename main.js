const table = document.querySelector("table");
const positionData = { o: [], x: [] };
const winConditions = [...rows(), ...columns(), [1, 5, 9], [3, 5, 7]]

// function
function renderPlayer(position) {
  const box = document.querySelector(`td[data-position="${position}"]`)
  if (box === null || box.innerHTML) return
  positionData['o'].push(position)
  box.innerHTML = `<i class="fa-regular fa-o"></i>`
  setTimeout(() => {
    checkWhetherWin('o')
  }, 100);
}

function findEmptyPosition() {
  const boxs = document.querySelectorAll('td')
  const positions = []
  boxs.forEach(box => { if (!box.innerHTML) positions.push(Number(box.dataset.position))})
  return positions
}

function checkWhetherWin(who) {
  winConditions.forEach(condition => {
    if (condition.every(position => positionData[who].includes(position))) {
      alert(`Player: "${who}" Win !`)
    }
  })
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
});
