import axios from 'axios';
import './App.css';
// import {onLoad} from './utils/API'
import React, { useState, useEffect } from "react";


function App() {

  const [userArray, setUserArray] = useState([]) 

  useEffect(() =>{
    axios.get("https://randomuser.me/api/?results=25").then(response => {
      setUserArray( response.data.results)
    }).catch(err => console.log(err));
  }, [])
  

 console.log(userArray)

  return (
    <div className="App">
      <header>
        <h1>Employee Directory</h1>
      </header>
      <input/>
      <table>
        <tr>
          <th>First</th>
          <th>last</th>
          <th>Phone</th>
        </tr>
        {userArray.map(result =>
        <tr>
        <td>{result.name.first}</td>
        <td>{result.name.last}</td>
        <td>{result.email}</td>
      </tr>
          )}
        
        </table>
      </div>
  );
}

export default App;
