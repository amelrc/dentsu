import useFetch from "../hooks/useFetch";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: larger;
`;

const Select = ({ select, onChange }) => {
  const flowType = useFetch(
    "https://orchestrationflowapp.azurewebsites.net/flow"
  );

  return (
    <SelectWrapper>
      <Label htmlFor="flow-select">Select Flow</Label>
      <select value={select} onChange={onChange} id="flow-select">
        <option>Select Flow</option>
        {flowType.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
    </SelectWrapper>
  );
};

export default Select;
