import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

function App() {
  // Todo : To save value
  const dispatch = useDispatch();
  // Todo : To get value
  const { url } = useSelector((state) => state.home);
  console.log("url = ", url);

  useEffect(() => {
    console.log("In useEffect");
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getApiConfiguration(res));
    });
  };
  return (
    <>
      <div className="App" style={{ color: "white", textAlign: "center" }}>
        App {url?.total_pages}
      </div>
    </>
  );
}

export default App;
