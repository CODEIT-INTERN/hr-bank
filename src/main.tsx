import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "@/pages/Dashboard.tsx";
import Department from "@/pages/Department.tsx";
import Employee from "@/pages/Employee.tsx";
import Backup from "@/pages/Backup.tsx";
import History from "@/pages/History";
import Layout from "./components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 모든 페이지에 공통으로 적용될 레이아웃
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "departments",
        element: <Department />,
      },
      {
        path: "employees",
        element: <Employee />,
      },
      {
        path: "histories",
        element: <History />,
      },
      {
        path: "backups",
        element: <Backup />,
      },
      {
        index: true, // App의 자식 경로 중 기본 경로를 설정
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
