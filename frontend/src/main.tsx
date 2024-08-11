import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const rootContainer = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);