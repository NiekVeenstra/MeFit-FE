import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import { Home } from "./pages/home/Home";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<Home />} />
      </Routes>
      <div className="App"><Home/></div>
    </>
  );
}

export default App;
