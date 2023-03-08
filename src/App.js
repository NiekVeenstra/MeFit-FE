import { Route, Routes } from "react-router-dom";
import GoalsDashboard from "./components/goalsDashboard/GoalsDashboard";
import LoginPage from "./pages/loginPage/LoginPage";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="dashboard" element={<GoalsDashboard />} />
      </Routes>
      
    </>
  );
}

export default App;
