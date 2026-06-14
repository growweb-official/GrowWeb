import React from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";

import Home from "@/pages/home";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import About from "@/pages/about";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

// ─── Theme Context ───────────────────────────────────────────────────────────

export const ThemeContext = React.createContext<{
  theme: "dark" | "light";
  toggleTheme: () => void;
}>({ theme: "dark", toggleTheme: () => {} });

export function useTheme() {
  return React.useContext(ThemeContext);
}

function applyPrimaryColor(h: string, s: string, l: string) {
  let el = document.getElementById("gw-theme-override") as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = "gw-theme-override";
    document.head.appendChild(el);
  }
  el.textContent = `:root, .dark {
    --primary: ${h} ${s}% ${l}%;
    --accent: ${h} ${s}% ${l}%;
    --ring: ${h} ${s}% ${l}%;
    --sidebar-primary: ${h} ${s}% ${l}%;
    --sidebar-ring: ${h} ${s}% ${l}%;
    --chart-1: ${h} ${s}% ${l}%;
  }`;
}

function ScrollToTop() {
  const [location] = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/about" component={About} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  const [theme, setTheme] = React.useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("growweb-theme") as "dark" | "light") ?? "dark";
  });

  // Apply theme class to <html>
  React.useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("growweb-theme", theme);
  }, [theme]);

  // Load primary color from CMS settings
  React.useEffect(() => {
    const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
    fetch(`${base}/api/settings`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((settings: Record<string, string>) => {
        const h = settings["primary_color_h"] ?? "152";
        const s = settings["primary_color_s"] ?? "100";
        const l = settings["primary_color_l"] ?? "50";
        applyPrimaryColor(h, s, l);
      })
      .catch(() => {});
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export { applyPrimaryColor };
export default App;
