import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css"
import { router } from "./Router/Router";
import AuthProvider from "./Context/Authentication/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const root = document.getElementById("root");

const queryClient = new QueryClient()
ReactDOM.createRoot(root).render(
  <section className="bg-[#eaeced]">

    <div className="urbanist-font max-w-7xl mx-auto ">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />,
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </section>
);
