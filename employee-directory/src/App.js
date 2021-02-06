import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";



function App() {
  const [userArray, setUserArray] = useState([]);
  const [natArray, setNatArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=25")
      .then((response) => {
        const responseArray = response.data.results;
        const sortedArray = responseArray.sort((a, b) =>
          a.name.first.localeCompare(b.name.first)
        );
        setUserArray(sortedArray);

        // i feel like there should be an easier way to do the below process

        // creating an array with only nationalities
        const transferArray = []
        sortedArray.forEach(function(element, index) {
          transferArray.push(element.nat)
        });

        // filtering duplicates out of list
        const toBeKeyedArray = transferArray.filter(function(item, pos) {
          return transferArray.indexOf(item) === pos;
        })
        
        // adding key to list for react purposes 
        const listArray = []
        toBeKeyedArray.forEach(function(element, index) {
          listArray.push({"key": index +1, "nat": element})
        })

        console.log("sortedArray",sortedArray)
      console.log("natArray",listArray)
        setNatArray(listArray)
      })
      .catch((err) => console.log(err));
  },[]);

 
// need help being able to use the drop down menu you filter by country


  return (
    <div className="App">
      <header>
        <h1>Employee Directory</h1>
      </header>
      <select className="form-select" aria-label="Default select example">
        <option defaultValue>Select Country</option>
        {natArray.map((result) => (
          <option key={result.key} value={result.nat}>
            {result.nat}
          </option>
        ))}
      </select>
      <div className="container-sm">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First</th>
              <th scope="col">last</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {userArray.map((result) => (
              <tr key={result.login.uuid}>
                <td>{result.name.first}</td>
                <td>{result.name.last}</td>
                <td>{result.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
