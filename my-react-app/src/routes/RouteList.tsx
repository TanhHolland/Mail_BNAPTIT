import { createBrowserRouter } from "react-router";
import DashBoard from "../components/Layout/Dashboard";
import EmptyLayout from "../components/Layout/EmptyLayout";
import MainLayout from "../components/Layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/", element: <DashBoard />, index: true }],
  },
  {
    element: <EmptyLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
