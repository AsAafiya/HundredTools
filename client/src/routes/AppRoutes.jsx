import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyFiles from "../pages/MyFiles";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route path="pdf-tools" element={<Home />} />
        <Route path="image-tools" element={<Home />} />
        <Route path="video-tools" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="my-files" element={<MyFiles />} />
        <Route path="profile" element={<Profile />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;