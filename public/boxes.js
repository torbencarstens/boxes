let contentWrapperElement = document.getElementById("contentWrapper");

function getCountInput(id, count) {
  if (count === undefined || count === null) {
    count = document.getElementById(id).value;

    count = Math.max(1, parseInt(count, 10));
  }

  return count;
}

function buildId(rowIndex, columnIndex) {
  return `r${rowIndex}c${columnIndex}`;
}

function isIdChecked(id) {
  let element = document.getElementById(id);

  if (element !== null) {
    return element.checked;
  }

  return false;
}

function check(row, column) {
  let id = buildId(row, column);

  document.getElementById(id).checked = true;
}

function generateInput(name) {
  let baseBox = `<input onchange="updateTable()" id="${name}" name="${name}" type="checkbox"`;

  if (isIdChecked(name)) {
    baseBox += " checked";
  }

  return baseBox + " />";
}

function generateHeaderRow(columnCount) {
  let s = "<tr><th></th>";
  for (let i = 0; i < columnCount; i++) {
    s += `<th>${i + 1}</th>`
  }

  return s + "</tr>"
}

function generateColumn(rowIndex, columnIndex) {
  let name = buildId(rowIndex, columnIndex);

  return `<td>${generateInput(name)}</td>`;
}

function generateRow(rowIndex, columnCount) {
  let s = "<tr>";
  s += `<th>${rowIndex + 1}</th>`;

  for (let i = 0; i < columnCount; i++) {
    s += generateColumn(rowIndex, i);
  }

  return s + "</tr>";
}

function generateTable(rowCount, columnCount) {
  let s = "<table>";
  s += generateHeaderRow(columnCount);

  for (let i = 0; i < rowCount; i++) {
    s += generateRow(i, columnCount);
  }

  return s + "</table>";
}

function allIdsChecked(ids) {
  return ids.every(isIdChecked);
}

function checkRow(rowIndex, columnCount) {
  let ids = [];
  for (let i = 0; i < columnCount; i++) {
    ids.push(buildId(rowIndex, i));
  }

  return allIdsChecked(ids);
}

function checkColumn(columnIndex, rowCount) {
  let ids = [];
  for (let i = 0; i < rowCount; i++) {
    ids.push(buildId(i, columnIndex));
  }

  return allIdsChecked(ids);
}

function markCheckbox(rowIndex, columnIndex, color) {
  let id = buildId(rowIndex, columnIndex);
  document.getElementById(id).style.accentColor = color;
}

function markRow(rowIndex, columnCount, accentColor, markedColumns) {
  for (let i = 0; i < columnCount; i++) {
    if (markedColumns.includes(i)) {
      continue
    }

    markCheckbox(rowIndex, i, accentColor);
  }
}

function markColumn(columnIndex, rowCount, accentColor) {
  for (let i = 0; i < rowCount; i++) {
    markCheckbox(i, columnIndex, accentColor);
  }
}

function updateFullLine(rowCount, columnCount) {
  let color = null;

  color = null;
  let markedColumns = [];
  for (let i = 0; i < columnCount; i++) {
    if (checkColumn(i, rowCount)) {
      color = "#00ff00";
      markedColumns.push(i);
    } else {
      color = null;
    }

    markColumn(i, rowCount, color);
  }

  for (let i = 0; i < rowCount; i++) {
    if (checkRow(i, columnCount)) {
      color = "#00ff00";
    } else {
      color = null;
    }

    markRow(i, columnCount, color, markedColumns);
  }
}

function updateTable(rowCount, columnCount) {
  rowCount = getCountInput("rowCount", rowCount);
  columnCount = getCountInput("columnCount", columnCount);

  contentWrapperElement.innerHTML = generateTable(rowCount, columnCount);
  updateFullLine(rowCount, columnCount);
}

function roll() {
  columnCount = getCountInput("columnCount", undefined);
  rowCount = getCountInput("rowCount", undefined);
  let column = -1;
  let row = -1;
  let tries = 0;
  // hopefully *10 will be enough to select one if one is still open
  // way more performant than actually checking this for our input parameters (1-99)
  let maxTries = (columnCount * rowCount) * 10;
  let found = false;

  while (!found && tries < maxTries) {
    tries += 1;
    column = Math.floor((Math.random() * columnCount));
    row = Math.floor((Math.random() * rowCount));

    if (!isIdChecked(buildId(row, column))) {
      check(row, column);
      updateFullLine(rowCount, columnCount);
      found = true;
    }
  }
}

updateTable();
