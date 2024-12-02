const routineData = JSON.parse(localStorage.getItem('routineTable'));

routineData ? main() : alert('Primero debe configurarse una rutina...');


function main() {
  const weeksData = JSON.parse(localStorage.getItem('weeksTable')) || generateWeeksData(routineData);
  createTables({ weeksData, routineData })
}

function generateWeeksData(routineData) {
  let weeksData = Array.from(
    { length: 4 },
    () => routineData.map(
      dayActivities => dayActivities.map( activity => false )
    )
  )
  localStorage.setItem('weeksTable', JSON.stringify(weeksData));
  return weeksData;
}

function createTables({ routineData, weeksData }) {
  const $weeksContainer = document.getElementById("weeksContainer");

  for (let i = 0; i < 4; i++) {
    let table = getTable()
    let weekData = weeksData[i]

    routineData.forEach(
      (rowData, rowIndex ) => {
        let row = document.createElement("tr")
        rowData.forEach(
          ( activity, colIndex) => {
            createActivityCell({
              row,
              activity,
              status: weekData[rowIndex][colIndex],
              indexData: { tableIndex: i, rowIndex, colIndex}
            })
          }
        )
        table.appendChild(row);
      }
    )
    let weekElementHTML = createWeekElementHTML(table, i)
    $weeksContainer.appendChild(weekElementHTML);
  }
}

function createActivityCell({ row, activity, status, indexData }) {
  const cell = document.createElement('td');

  cell.setAttribute('status', status)
  cell.setAttribute('indexData', JSON.stringify(indexData)) 
  
  cell.innerHTML = activity;
  cell.style.backgroundColor = status ? "#0f0" : "#f00"; 
  
  cell.onclick = () => { updateCell(cell) }
  
  row.appendChild(cell)
}

function updateCell(cell) {
  let indexData = JSON.parse(cell.getAttribute('indexData'))
  let status = !(JSON.parse(cell.getAttribute('status')));
  
  cell.setAttribute('status', status)
  cell.style.backgroundColor = status ? "#0f0" : "#f00"; 

  updateLS({ indexData, status })
}

function updateLS({ indexData, status }) {
  let weeksData = JSON.parse(localStorage.getItem('weeksTable'))
  weeksData[indexData.tableIndex][indexData.rowIndex][indexData.colIndex] = status
  localStorage.setItem('weeksTable', JSON.stringify(weeksData))
}

function getTable() {
  const table = document.createElement("table");
  table.border = 1
  table.innerHTML = `
    <thead>
      <tr>
        <th>Lunes</th>
        <th>Martes</th>
        <th>Miércoles</th>
        <th>Jueves</th>
        <th>Viernes</th>
        <th>Sábado</th>
        <th>Domingo</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  return table
}

function createWeekElementHTML(table, weekNuber) {
  // create container
  const weekElementHTML = document.createElement('article')
  weekElementHTML.classList.add('week')

  // create title
  const title = document.createElement('h3')
  title.innerText = `Semana ${weekNuber + 1}`

  // insert title
  weekElementHTML.appendChild(title)
  // insert table
  weekElementHTML.appendChild(table)

  // return container
  return weekElementHTML
}