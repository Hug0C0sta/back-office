import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Sidebar from "./Components/Sidebar";
import UserInfo from "./pages/UserInfo/UserInfo";
import Stores from "./pages/Stores/Stores";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Login from "./pages/Login/Login";
import { AuthenticationRedirecter } from "./auth/AuthenticationRedirecter";
import { Logout } from "./auth/Logout";
import { Extrato } from "./pages/Extrato/Extrato";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const router = createBrowserRouter([
  {
    element: (
      <AuthenticationRedirecter>
        <Sidebar />
      </AuthenticationRedirecter>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/edit/:id",
        element: <UserInfo />,
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
  {
    element: <Outlet />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/extrato/:id",
        element: (
          <AuthenticationRedirecter>
            <Extrato />
          </AuthenticationRedirecter>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
