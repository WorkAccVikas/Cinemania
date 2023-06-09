import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/serachResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  // Todo : To save value
  const dispatch = useDispatch();
  // Todo : To get value
  const { url } = useSelector((state) => state.home);
  // console.log("url = ", url);

  useEffect(() => {
    // console.log("In useEffect");
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log("Result = ", res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    let data = await Promise.all(promises);

    // console.log("Rani = ", data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    // console.log("Rani = ", allGenres);
    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
