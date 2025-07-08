import EmailSender from "@/components/Email";
import { createBrowserRouter, Navigate } from "react-router";
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
  {
    element: <DashBoard />,
    children: [
      {
        path: "/dashboard",
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/email-tool" replace />,
          },
          { path: "email-tool", element: <EmailSender /> },
        ],
      },
    ],
  },
]);
