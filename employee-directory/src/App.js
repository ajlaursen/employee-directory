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
        const natArray = []
        // i need help filtering this array to only be unique elements but then add an id into them
        sortedArray.forEach(function(element, index) {
          natArray.push({"id": index, "nat":element.nat })
        });
        const uniqueArray = natArray.filter(function(item, pos) {
          return natArray.indexOf(item) === pos;
      })
      console.log(uniqueArray)
        setNatArray(uniqueArray)
      })
      .catch((err) => console.log(err));
  }, []);

 
// need help being able to use the drop down menu you filter by country


  return (
    <div className="App">
      <header>
        <h1>Employee Directory</h1>
      </header>
      <select className="form-select" aria-label="Default select example">
        <option defaultValue>Select Country</option>
        {natArray.map((result) => (
          <option key={result.id} value="1">
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
