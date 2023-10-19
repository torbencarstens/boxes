let contentWrapperElement = document.getElementById("contentWrapper");

function isIdChecked(id) {
    let element = document.getElementById(id);

    if (element !== null) {
        return element.checked;
    }

    return false;
}

function generateInput(name) {
  if (isIdChecked(name)) {
    return `<input onChange="updateTable()" id="${name}" name="${name}" type="checkbox" checked />`;
  } else {
    return `<input onChange="updateTable()" id="${name}" name="${name}" type="checkbox" />`;
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

function checkRow(rowIndex, columnCount) {
    for(let i = 0; i < columnCount; i++) {
        let id = `${rowIndex}${i}`;
        if (!isIdChecked(id)) {
            return false
        }
    }

    return true;
}

function checkColumn(columnIndex, rowCount) {
    for(let i = 0; i < rowCount; i++) {
        let id = `${i}${columnIndex}`;
        if (!isIdChecked(id)) {
            return false
        }
    }

    return true;
}

function markRow(rowIndex, columnCount, accentColor, markedColumns) {
    for(let i = 0; i < columnCount; i++) {
        if (markedColumns.includes(i)) {
            continue
        }

        let id = `${rowIndex}${i}`;
        document.getElementById(id).style.accentColor = accentColor;
        console.log(`${id}: ${accentColor}`)
    }

    return true;
}

function markColumn(columnIndex, rowCount, accentColor) {
    for(let i = 0; i < rowCount; i++) {
        let id = `${i}${columnIndex}`;
        document.getElementById(id).style.accentColor = accentColor;
    }

    return true;
}

function updateFullLine(rowCount, columnCount) {
    let color = null;

    color = null;
    let markedColumns = [];
    for(let i = 0; i < columnCount; i++) {
        if(checkColumn(i, rowCount)) {
            color = "#00ff00";
            markedColumns.push(i);
        } else {
            color = null;
        }

        markColumn(i, rowCount, color);
    }

    for(let i = 0; i < rowCount; i++) {
        if(checkRow(i, columnCount)) {
            color = "#00ff00";
        } else {
            color = null;
        }

        markRow(i, columnCount, color, markedColumns);
    }
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
  updateFullLine(rowCount, columnCount);
}

updateTable();