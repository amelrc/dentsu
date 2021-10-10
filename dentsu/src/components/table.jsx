import useFetch from "../hooks/useFetch";

const Table = ({ selected, onClick }) => {
  const flowProcess = useFetch(
    `https://orchestrationflowapp.azurewebsites.net/flow/${selected}`
  );

  return (
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
            <td onClick={onClick}>{col.fromProcessId}</td>
            <td onClick={onClick}>{col.toProcessId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
