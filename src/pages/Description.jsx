import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Description.css';

const Description = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/description.csv`); // Adjusted path
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            console.log(result.data); // Check the parsed data in the console
            setData(result.data);
          },
        });
      } catch (error) {
        console.error('Error fetching the CSV file:', error);
      }
    };

    fetchData();
  }, []);

  // Filter data based on the search term
  const filteredData = data.filter(row => 
    (row.Disease && row.Disease.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.Description && row.Description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1>Disease Descriptions</h1>
      <input 
        type="text" 
        placeholder="Search for a disease or description..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Disease</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.Disease}</td>
                <td>{row.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Description;
