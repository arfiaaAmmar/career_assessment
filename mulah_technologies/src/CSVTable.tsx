import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface CSVRow {
  Category: string;
  Value: string;
}

const CSVReader: React.FC = () => {
  const [tableData, setTableData] = useState<CSVRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('../src/assets/table.csv');
      const text = await response.text();

      const { data } = Papa.parse(text, { header: true });
      const results: CSVRow[] = data as CSVRow[];

      setTableData(results);
    };

    fetchData();
  }, []);

  return (
    <div className='w-1/2 m-auto mt-10 border-2 border-black'>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.Category}</td>
              <td>{row.Value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVReader;
