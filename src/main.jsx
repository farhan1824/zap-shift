import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css"
import { router } from "./Router/Router";
import AuthProvider from "./Context/Authentication/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <section className="bg-[#eaeced]">

    <div className="urbanist-font max-w-7xl mx-auto ">
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </div>
  </section>
);
