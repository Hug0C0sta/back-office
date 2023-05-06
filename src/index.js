import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Sidebar from "./Components/Sidebar";

const router = createBrowserRouter([
    {
        element: <Sidebar/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/users",
                element: <Users/>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
