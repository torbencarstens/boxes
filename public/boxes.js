let contentWrapperElement = document.getElementById("contentWrapper");

function generateInput(name) {
  let previous = document.getElementById(name);

  if (previous !== null && previous.checked === true) {
    return `<input id="${name}" name="${name}" type="checkbox" checked />`;
  } else {
    return `<input id="${name}" name="${name}" type="checkbox" />`;
  }
}

function generateColumn(rowIndex, columnIndex) {
  let name = `${rowIndex}${columnIndex}`;

  return `<td>${generateInput(name)}</td>`;
}

function generateRow(rowIndex, columnCount) {
  let s = "<tr>";
  for(let i = 0; i < columnCount; i++) {
    s += generateColumn(rowIndex, i);
  }
  
  return s + "</tr>";
}

function generateTable(rowCount, columnCount) {
  let s = "<table>";
  for(let i = 0; i < rowCount; i++) {
    s += generateRow(i, columnCount);
  }
  
  return s + "</table>";
}

function updateTable(rowCount, columnCount) {
  if (rowCount === undefined) {
    rowCount = document.getElementById("rowCount").value;

    rowCount = Math.max(1, parseInt(rowCount, 10));
  }
  if (columnCount === undefined) {
    columnCount = document.getElementById("columnCount").value;

    columnCount = Math.max(1, parseInt(columnCount, 10));
  }
  
  contentWrapperElement.innerHTML = generateTable(rowCount, columnCount);
}

updateTable();