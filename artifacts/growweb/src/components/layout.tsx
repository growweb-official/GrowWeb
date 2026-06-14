import React from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, MessageCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/App";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [location] = useLocation();
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrolled, setScrolled] = React.useState(false);
  const isDark = theme === "dark";

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  React.useEffect(() => {
    const html = document.documentElement;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-100 origin-left"
        style={{ scaleX }}
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 w-full z-90 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border py-3 sm:py-4"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsMenuOpen(false)}>
            <img src="/growweb-logo.jpg" alt="GROWWEB" className="w-8 h-8 rounded-sm object-cover" />
            <span className="font-bold text-xl tracking-wider text-foreground">
              GROW<span className="text-primary glow-text">WEB</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.slice(1, 6).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.path ? "text-primary glow-text" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-xl border border-border bg-card/80 hover:border-primary/50 hover:text-primary transition-all text-muted-foreground"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Button
              asChild
              className="rounded-full px-5 lg:px-6 font-semibold shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] transition-all"
            >
              <Link href="/contact">Start Project</Link>
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            {/* Theme toggle mobile */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Light mode" : "Dark mode"}
              className="text-muted-foreground p-2 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:text-primary transition-all"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Hamburger */}
            <button
              className="text-foreground p-2 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card/90 transition-all active:scale-95"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 80,
              backgroundColor: isDark ? "hsl(0 0% 3%)" : "hsl(0 0% 99%)",
              overflowY: "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(0,255,136,0.4) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <div
              className="relative flex flex-col items-center justify-center flex-1 gap-2 px-6"
              style={{ paddingTop: "80px", paddingBottom: "20px" }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.05 }}
                  style={{ width: "100%", maxWidth: "320px" }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                      location === link.path
                        ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                        : "text-foreground hover:bg-foreground/5 border border-transparent hover:border-border"
                    }`}
                  >
                    {link.name}
                    {location === link.path && (
                      <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                style={{ width: "100%", maxWidth: "320px", marginTop: "12px" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl font-semibold text-base shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
                >
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Start Your Project →
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div
              className="relative border-t border-border text-center"
              style={{ padding: "16px 24px" }}
            >
              <a
                href="https://wa.me/923299571003"
                className="inline-flex items-center gap-2 text-[#25D366] font-medium text-sm hover:opacity-80 transition-opacity"
              >
                <MessageCircle size={16} />
                WhatsApp: +92 329 9571003
              </a>
              <p className="text-xs text-muted-foreground/50 mt-1">ameer12h21@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-20 sm:pt-24">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-10 sm:py-12 mt-16 sm:mt-20 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            <div className="sm:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src="/growweb-logo.jpg" alt="GROWWEB" className="w-8 h-8 rounded-sm object-cover" />
                <span className="font-bold text-xl tracking-wider text-foreground">
                  GROW<span className="text-primary">WEB</span>
                </span>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-sm text-sm sm:text-base">
                Professional Websites That Grow Your Business. We craft premium digital experiences for forward-thinking brands.
              </p>
              <a href="mailto:ameer12h21@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                ameer12h21@gmail.com
              </a>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-foreground">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms &amp; Conditions</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-10 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} GROWWEB. All rights reserved.</p>
            <p>Designed in Pakistan with <span className="text-primary">passion</span>.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/923299571003"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7 group-hover:animate-pulse" />
      </a>
    </div>
  );
}
