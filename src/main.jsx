import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css"
import { router } from "./Router/Router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <section className="bg-[#eaeced]">

    <div className="urbanist-font max-w-7xl mx-auto ">
      <RouterProvider router={router} />,
    </div>
  </section>
);
