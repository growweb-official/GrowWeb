import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, ShoppingCart, Zap, LayoutDashboard, Search, Palette, RefreshCw, Wrench, MonitorSmartphone, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo";

const SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Web Development Services in Pakistan",
  "description": "Professional web development services offered by GROWWEB Agency in Pakistan",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Business Website Development Pakistan", "url": "https://growweb.website/services" },
    { "@type": "ListItem", "position": 2, "name": "Ecommerce Store Development Pakistan", "url": "https://growweb.website/services" },
    { "@type": "ListItem", "position": 3, "name": "Landing Page Design Pakistan", "url": "https://growweb.website/services" },
    { "@type": "ListItem", "position": 4, "name": "Custom Web Application Development Pakistan", "url": "https://growweb.website/services" },
    { "@type": "ListItem", "position": 5, "name": "SEO Optimization Services Pakistan", "url": "https://growweb.website/services" },
    { "@type": "ListItem", "position": 6, "name": "UI/UX Design Services Pakistan", "url": "https://growweb.website/services" },
  ],
};

const SERVICES = [
  {
    icon: <Globe size={36} />,
    title: "Business Websites",
    subtitle: "Starting from PKR 25,000",
    description: "Professional, high-converting websites tailored for restaurants, clinics, schools, real estate, gyms, and any local business. We build digital storefronts that command trust.",
    features: ["Mobile-first responsive design", "SEO-ready structure", "WhatsApp & call integration", "Google Maps & reviews", "Fast loading under 2s", "Free 3-month support"],
    color: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: <ShoppingCart size={36} />,
    title: "Ecommerce Stores",
    subtitle: "Starting from PKR 45,000",
    description: "Full-featured online stores that drive sales. From product catalog to checkout, we build conversion-optimized shopping experiences that scale with your business.",
    features: ["Product management system", "Stripe / PayPal / JazzCash", "Order tracking dashboard", "Inventory management", "Abandoned cart recovery", "Analytics integration"],
    color: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: <Zap size={36} />,
    title: "Landing Pages",
    subtitle: "Starting from PKR 15,000",
    description: "High-performance single-page sites engineered to convert ad traffic into leads and customers. Perfect for Meta Ads campaigns and product launches.",
    features: ["Conversion-focused copywriting", "A/B testing ready", "Lead capture forms", "Ultra-fast load time", "Facebook Pixel integration", "WhatsApp CTA integration"],
    color: "from-yellow-500/10 to-orange-500/5",
  },
  {
    icon: <MonitorSmartphone size={36} />,
    title: "Web Applications",
    subtitle: "Starting from PKR 80,000",
    description: "Custom SaaS products, booking platforms, membership portals, and complex web apps. We architect scalable systems built to grow alongside your business.",
    features: ["Custom backend & database", "User authentication", "Real-time features", "API integrations", "Admin dashboard included", "Cloud deployment"],
    color: "from-green-500/10 to-emerald-500/5",
  },
  {
    icon: <LayoutDashboard size={36} />,
    title: "Admin Dashboards",
    subtitle: "Starting from PKR 35,000",
    description: "Powerful internal tools that give you complete control over your business. Analytics, user management, content control — all in a premium custom interface.",
    features: ["Role-based access control", "Real-time analytics", "Data export / CSV", "Custom reports", "Mobile responsive", "Secure authentication"],
    color: "from-indigo-500/10 to-violet-500/5",
  },
  {
    icon: <Search size={36} />,
    title: "SEO Optimization",
    subtitle: "Starting from PKR 10,000/mo",
    description: "Rank higher on Google and get found by customers who are actively searching for your services. Local SEO strategies that drive real, qualified traffic.",
    features: ["On-page SEO audit", "Keyword research", "Google My Business", "Schema markup", "Core Web Vitals", "Monthly ranking reports"],
    color: "from-teal-500/10 to-cyan-500/5",
  },
  {
    icon: <Palette size={36} />,
    title: "UI/UX Design",
    subtitle: "Starting from PKR 20,000",
    description: "Beautiful, user-centric designs that make visitors stay longer and convert better. We don't just make things look good — we make them work better.",
    features: ["Figma mockups & prototypes", "User flow mapping", "Brand consistency", "Interaction design", "Design system creation", "Prototype testing"],
    color: "from-rose-500/10 to-pink-500/5",
  },
  {
    icon: <RefreshCw size={36} />,
    title: "Website Redesign",
    subtitle: "Starting from PKR 30,000",
    description: "Transform your outdated website into a modern, high-performing digital asset. We preserve your SEO equity while completely elevating the user experience.",
    features: ["UX audit & analysis", "Performance optimization", "Modern design refresh", "SEO preservation", "Content migration", "Speed improvement"],
    color: "from-orange-500/10 to-red-500/5",
  },
  {
    icon: <Wrench size={36} />,
    title: "Website Maintenance",
    subtitle: "Starting from PKR 5,000/mo",
    description: "Keep your website running at peak performance 24/7. Regular updates, security patches, backups, and content changes handled professionally.",
    features: ["Monthly security updates", "Daily backups", "Uptime monitoring", "Content updates", "Performance checks", "Priority support"],
    color: "from-gray-500/10 to-slate-500/5",
  },
];

export default function Services() {
  return (
    <div className="w-full">
      <Seo
        title="Web Development Services Pakistan — Business Websites, Ecommerce, Web Apps"
        description="Professional web development services in Pakistan: business websites from PKR 25,000, ecommerce stores from PKR 45,000, landing pages, web applications, SEO, and UI/UX design. GROWWEB Agency Lahore."
        keywords="web development services Pakistan, website development services Pakistan, ecommerce development Pakistan, landing page design Pakistan, web application development Pakistan, SEO services Pakistan, UI UX design Pakistan, web design services Lahore, business website development Pakistan"
        canonical="/services"
        schema={SERVICES_SCHEMA}
      />
      <section className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">What We Offer</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-primary glow-text">Services</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Premium web solutions designed to grow your business. Every service is delivered with agency-level quality at accessible pricing.</p>
          </motion.div>

          <div className="space-y-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative rounded-3xl border border-border overflow-hidden group p-8 md:p-10 hover:border-primary/40 transition-all duration-300 bg-card"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-60`} />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                      <span className="text-primary text-sm font-mono border border-primary/30 px-3 py-1 rounded-full bg-primary/10 whitespace-nowrap self-start">{service.subtitle}</span>
                    </div>
                    <p className="text-muted-foreground mb-6 text-base md:text-lg">{service.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={14} className="text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild size="sm" className="rounded-full px-6">
                        <Link href="/contact">Get Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
                      </Button>
                      <a
                        href="https://wa.me/923299571003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/20 text-sm font-medium hover:border-primary/40 hover:text-primary transition-all"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center bg-card p-12 md:p-20 rounded-3xl border border-border relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[80px] pointer-events-none rounded-full" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Not Sure Which Service?</h2>
            <p className="text-xl text-muted-foreground mb-10 relative z-10">Book a free consultation. We'll analyze your needs and recommend the perfect solution.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button asChild size="lg" className="rounded-full px-10 shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <Link href="/contact">Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 border-white/20">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
