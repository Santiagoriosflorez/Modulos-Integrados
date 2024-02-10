import { Route, Routes } from "react-router-dom";
import HomePages from "../pages/HomePages";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import routes from "../helpers/routes";
import { AuthProvider } from "../Auth/AuthProvider";
import Map from "../pages/Map";
import Places from "../pages/Places";

export default function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={routes.home} element={<HomePages />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.map} element={<Map />} />
        <Route path={routes.places} element={<Places />} />
      </Routes>
    </AuthProvider>
  );
}
