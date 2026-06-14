import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { setAuthTokenGetter, setBaseUrl } from "@/lib/api-client";
import App from "./App";
import "./index.css";

// Use env var if set, otherwise fall back to the production API URL
const apiBase =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "https://growweb-api.onrender.com";

setBaseUrl(apiBase);
setAuthTokenGetter(() => localStorage.getItem("admin_token"));

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
