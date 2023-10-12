import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Activity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

function App() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('recreational'); // Default type

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleFetchActivity = async () => {
    try {
      const response = await axios.get<Activity>('https://www.boredapi.com/api/activity?type=' + selectedType);
      console.log(response.data);

      setActivity(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>What to Do When Bored</h1>

      <div>
        <label htmlFor="type">Select Type: </label>
        <select id="type" value={selectedType} onChange={handleTypeChange}>
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="diy">DIY</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="music">Music</option>
          <option value="busywork">Busywork</option>
        </select>
      </div>

      <button onClick={handleFetchActivity}>Fetch Activity</button>
   
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>Activity:</td>
              <td>{activity?.activity || 'No activity found'}</td>
            </tr>
            <tr>
              <td>Type:</td>
              <td>{activity?.type}</td>
            </tr>
            <tr>
              <td>Participants:</td>
              <td>{activity?.participants}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{activity?.price}</td>
            </tr>
            <tr>
              <td>Link:</td>
              <td>{activity?.link}</td>
            </tr>
            <tr>
              <td>Key:</td>
              <td>{activity?.key}</td>
            </tr>
            <tr>
              <td>Accessibility:</td>
              <td>{activity?.accessibility}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
