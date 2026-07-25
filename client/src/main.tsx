import { QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { queryClient } from "./lib/queryClient"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { Toaster } from "sonner"
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <App />
            <Toaster richColors position="top-right" />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)