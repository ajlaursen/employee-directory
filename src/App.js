import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // all the info
  const [userArray, setUserArray] = useState([]);
  // nationalities in list
  const [natArray, setNatArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=25")
      .then((response) => {
        const responseArray = response.data.results;
        const sortedArray = responseArray.sort((a, b) =>
          a.name.first.localeCompare(b.name.first)
        );
        setUserArray(sortedArray);
        setFilteredArray(sortedArray);

        // i feel like there should be an easier way to do the below process

        const natsArray = Array.from(
          new Set(sortedArray.map((x) => x.nat))
        ).sort();

        // creating an array with only nationalities
        // const transferArray = []
        // sortedArray.forEach(function(element, index) {
        //   transferArray.push(element.nat)
        // });

        // // filtering duplicates out of list
        // const toBeKeyedArray = transferArray.filter(function(item, pos) {
        //   return transferArray.indexOf(item) === pos;
        // })

        // // adding key to list for react purposes
        // const listArray = []
        // toBeKeyedArray.forEach(function(element, index) {
        //   listArray.push({"key": index +1, "nat": element})
        // })

        setNatArray(natsArray);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleListChange(e) {
    switch (e.target.value) {
      case "Select Country":
        // need to return to full user array
        setFilteredArray(userArray);
        break;
      default:
        const employeeFilteredArray = userArray.filter((element) => {
          return e.target.value === element.nat;
        });
        setFilteredArray(employeeFilteredArray);
    }
    console.log("we changed", e.target.value);

    // take the array and then filter from result then reset user array
  }
  // need help being able to use the drop down menu you filter by country

  return (
    <div className="App">
      <header>
        <h1>Employee Directory</h1>
      </header>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleListChange}
      >
        <option defaultValue>Select Country</option>
        {natArray.map((result, index) => (
          <option key={index} value={result}>
            {result}
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
              <th scope="col"> Nationality</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((result) => (
              <tr key={result.login.uuid}>
                <td>{result.name.first}</td>
                <td>{result.name.last}</td>
                <td>{result.email}</td>
                <td>{result.nat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
