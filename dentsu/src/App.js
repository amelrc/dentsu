import "./App.css";
import React, { useState, useEffect } from "react";
import ReactFlow from "react-flow-renderer";
import styled from "styled-components";
import Select from "./components/select";
import Modal from "./components/modal";
import Table from "./components/table";
import useFetch from "./hooks/useFetch";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NodesWrapper = styled.div`
  margin: 8px;
  border: 1px solid black;
  background-color: #f4f4f4;
  height: 50vh;
  width: 100%;
`;

const App = () => {
  const [selectedItem, setSelectedItem] = useState("0");
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState([]);
  const [modalInfo, setModalInfo] = useState();
  const [flow, setFlow] = useState([]);

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

  // const minmax = (arrayOfObjects, someKey) => {
  //   const values = arrayOfObjects.map((value) => value[someKey]);
  //   console.log("alkdjfhalkdjhf", values);
  //   return {
  //     min: Math.min(...values),
  //     max: Math.max(...values),
  //   };
  // };

  const openModal = (e) => {
    setModalInfo(e.target.innerHTML);
    setShowModal((prev) => !prev);
  };

  const flowProcess = useFetch(
    `https://orchestrationflowapp.azurewebsites.net/flow/${selectedItem}`
  );
  useEffect(() => {
    setFlow(flowProcess);
  }, [selectedItem, flowProcess]);

  console.log(selectedItem);

  const nodes = [];
  const conectors = [];
  flow.map((item, i) =>
    nodes.push({
      id: i + 1 + "",
      data: { label: `${i + 1}` },
      position: { x: (i + 1) * 100, y: (i + 1) * 100 },
    })
  );
  flow.map((item, i) =>
    conectors.push({
      id: i + "connector",
      source: item.fromProcessId + "",
      target: item.toProcessId + "",
    })
  );

  const reactFlowProcess = nodes.concat(conectors);

  console.log(reactFlowProcess);

  return (
    <AppWrapper>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {detail.map((item) =>
          item.id === parseInt(modalInfo) ? (
            <div style={{ backgroundColor: "white", padding: "20% 16%" }}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          ) : null
        )}
      </Modal>

      <h1>Flow Controler</h1>
      <Select select={selectedItem} onChange={(e) => handleSelectFlowId(e)} />
      <Table selected={selectedItem} onClick={(e) => openModal(e)} />
      <NodesWrapper>
        <ReactFlow elements={reactFlowProcess} />
      </NodesWrapper>
    </AppWrapper>
  );
};
export default App;
