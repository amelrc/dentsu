import "./App.css";
import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [selectedItem, setSelectedItem] = useState("0");
  const [detail, setDetail] = useState([]);

  const flowType = useFetch(
    "https://orchestrationflowapp.azurewebsites.net/flow"
  );
  const flowProcess = useFetch(
    `https://orchestrationflowapp.azurewebsites.net/flow/${selectedItem}`
  );

  useEffect(() => {
    switch (selectedItem) {
      case "1":
        handleArrayApi([1, 2, 3, 4]);
        break;
      case "2":
        handleArrayApi([5, 6, 7, 8, 9, 10, 11, 12]);
        break;
      case "3":
        handleArrayApi([
          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
          30,
        ]);
        break;
      default:
        console.log(`${selectedItem} items selected`);
    }
  }, [selectedItem]);

  const handleSelectFlowId = (e) => setSelectedItem(e.target.value);

  const handleArrayApi = (arr) => {
    const idList = arr.map((id) =>
      fetch(`https://orchestrationflowapp.azurewebsites.net/flow/process/${id}`)
    );
    Promise.all(idList)
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then((values) => setDetail(values));
    return arr;
  };

  const minmax = (arrayOfObjects, someKey) => {
    const values = arrayOfObjects.map((value) => value[someKey]);
    return {
      min: Math.min.apply(null, values),
      max: Math.max.apply(null, values),
    };
  };

  console.log("hello", minmax(detail, "avgDuration"));

  return (
    <div className="App">
      <h1>Flow Controler</h1>
      <div>
        <label htmlFor="flow-select">Select Flow</label>
        <select
          value={selectedItem}
          onChange={(e) => handleSelectFlowId(e)}
          id="flow-select"
        >
          <option>Select Flow</option>
          {flowType.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Process</th>
            </tr>
            <tr>
              <td>From</td>
              <td>To</td>
            </tr>
          </thead>
          <tbody>
            {flowProcess.map((col, i) => (
              <tr key={i}>
                <td>{col.fromProcessId}</td>
                <td>{col.toProcessId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default App;
