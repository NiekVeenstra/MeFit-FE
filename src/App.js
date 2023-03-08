import { Route, Routes } from "react-router-dom";
import { ROLES } from "./const/roles";
import AdminPage from "./pages/adminPage/AdminPage";
import LoginPage from "./pages/loginPage/LoginPage";
import KeycloakRoute from "./routes/KeycloakRoute";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
