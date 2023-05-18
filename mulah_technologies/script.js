document.getElementById('csvFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const contents = e.target.result;
    const rows = contents.split('\n');

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    rows.forEach(function(row, index) {
      const cells = row.split(',');

      if (index === 0) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        cells.forEach(function(cell) {
          const th = document.createElement('th');
          th.textContent = cell.trim();
          headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
      } else {
        const dataRow = document.createElement('tr');

        cells.forEach(function(cell) {
          const td = document.createElement('td');
          td.textContent = cell.trim();
          dataRow.appendChild(td);
        });

        tbody.appendChild(dataRow);
      }
    });

    table.appendChild(tbody);
    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('tableContainer').appendChild(table);
  };

  reader.readAsText(file);
}
