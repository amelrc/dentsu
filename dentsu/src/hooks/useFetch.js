import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([
    { id: null, name: "", fromProcessId: null, toProcessId: null },
  ]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};
export default useFetch;
