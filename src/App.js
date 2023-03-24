import { Route, Routes, useLocation } from "react-router-dom";
import GoalsDashboard from "./components/goalsDashboard/GoalsDashboard";
import ApplicationFrame from "./components/frame/ApplicationFrame";
import { ROLES } from "./const/roles";
import keycloak from "./keycloak";
import AdminPage from "./pages/adminPage/AdminPage";
import LoginPage from "./pages/loginPage/LoginPage";
// import ExercisesPage from "./pages/exercisesPage/ExercisesPage";
import ExercisesPage from "./pages/exercisesPage/ExercisesPage";
import ExerciseDetailPage from "./pages/exerciseDetailPage/ExerciseDetailPage";
import KeycloakRoute from "./routes/KeycloakRoute";
import ProfilePage from "./pages/profilePage/ProfilePage";

function App() {
  const location = useLocation();
  return (
    <>
      {keycloak.authenticated && location.pathname !== "/" && <ApplicationFrame />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <KeycloakRoute role={ROLES.User}>
              <GoalsDashboard />
            </KeycloakRoute>
          }
        />

        <Route path="/home" element={<div>home</div>} />
        <Route
          path="/exercises"
          element={
            <KeycloakRoute role={ROLES.User}>
              <ExercisesPage />
            </KeycloakRoute>
          }
        />
        <Route
          path="/exercise/:id"
          element={
            <KeycloakRoute role={ROLES.User}>
              <ExerciseDetailPage />
            </KeycloakRoute>
          }
        />
        <Route
          path="/user"
          element={
            <KeycloakRoute role={ROLES.User}>
              <div>test</div>
            </KeycloakRoute>
          }
        />
        <Route
          path="/contributor"
          element={
            <KeycloakRoute role={ROLES.Admin || ROLES.Contributor}>
              <AdminPage />
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
        <Route
          path="/profile"
          element={
            <KeycloakRoute role={ROLES.User}>
              <ProfilePage />
            </KeycloakRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
