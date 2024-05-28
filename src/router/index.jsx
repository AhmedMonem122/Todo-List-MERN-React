import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./root";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import TodosPage from "../pages/Todos/TodosPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import NotFound from "../components/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <TodosPage />
          </ProtectedRoute>
        }
      />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
