import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AddSmartphone from "./components/AddSmartphone.jsx";
import UpdateSmartphone from "./components/UpdateSmartphone.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddSmartphone />,
  },
  {
    path: "/update/:id",
    element: <UpdateSmartphone />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
