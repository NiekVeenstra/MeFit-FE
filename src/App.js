import { Route, Routes } from "react-router-dom";
import GoalsDashboard from "./components/goalsDashboard/GoalsDashboard";
import ApplicationFrame from "./components/frame/ApplicationFrame";
import { ROLES } from "./const/roles";
import keycloak from "./keycloak";
import AdminPage from "./pages/adminPage/AdminPage";
import LoginPage from "./pages/loginPage/LoginPage";
import KeycloakRoute from "./routes/KeycloakRoute";



function App() {
  return (
    <>
      {keycloak.authenticated && <ApplicationFrame />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<GoalsDashboard />} />
        <Route
          path="/user"
          element={
            <KeycloakRoute role={ROLES.User}>
              <div>test</div>
            </KeycloakRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <KeycloakRoute role={ROLES.Admin}>
              <AdminPage />
            </KeycloakRoute>
          }
        />
      </Routes>
      
    </>
  );
}

export default App;
