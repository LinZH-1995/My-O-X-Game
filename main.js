const table = document.querySelector("table");
const positionData = { o: [], x: [] };

// function
function renderPlayer(position) {
  const box = document.querySelector(`td[data-position="${position}"]`)
  positionData['o'].push(position)
  box.innerHTML = `<i class="fa-regular fa-o"></i>`
}

// addEventListener
table.addEventListener("click", function (event) {
  const position = event.target.dataset.position;
  renderPlayer(position);
});
