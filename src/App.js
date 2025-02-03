import Login from "./Containers/Account/login.js";
import Home from "./Containers/Home/Home.js";
import SignUp from "./Containers/Account/signup.js";
import Movie from "./Containers/Movie/movie.js";
import TVSeries from "./Containers/TVSeries/tvSeries.js";
import Docs from "./Containers/Docs/doc.js";
import MovieTrailer from "./Components/MovieTrailer/movieTrailer.js";
import Content from "./Containers/Content/content.js";
import TVSeriesTrailer from "./Components/TVSeriesTrailer/tvSeriesTrailer.js";
import DocTrailer from "./Components/DocTrailer/docTrailer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/series" element={<TVSeries />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/movieTrailer/:movie_id" element={<MovieTrailer />} />
          <Route
            path="/seriesTrailer/:series_id"
            element={<TVSeriesTrailer />}
          />
          <Route path="/docTrailer/:doc_id" element={<DocTrailer />} />
          <Route path="/addContent" element={<Content />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
