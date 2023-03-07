import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
