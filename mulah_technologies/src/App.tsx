import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [tableData, setTableData] = useState<{ [key: string]: number }>({});
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    // Fetch CSV data
    fetch('/table.csv')
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split('\n');
        const csvHeaders = rows[0].split(',');

        const data: { [key: string]: number } = {};

        for (let i = 1; i < rows.length; i++) {
          const cells = rows[i].split(',');
          const index = cells[0];
          const value = Number(cells[1]);

          data[index] = value;
        }

        setHeaders(csvHeaders);
        setTableData(data);

        // Calculate category values
        const categoryValues: { [key: string]: number } = {
          Alpha: data['A5'] + data['A20'],
          Beta: data['A15'] / data['A7'],
          Charlie: data['A13'] * data['A12'],
        };

        setCategoryData(categoryValues);
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Data</h1>

      <table className="table-auto w-1/2">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tableData).map(([index, value]) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-8">Category Data</h2>

      <table className="table-auto mt-4 w-1/2">
        <thead>
          <tr>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(categoryData).map(([category, value]) => (
            <tr key={category}>
              <td className="border px-4 py-2">{category}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
