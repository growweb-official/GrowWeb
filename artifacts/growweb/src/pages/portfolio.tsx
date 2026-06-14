import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, CheckCircle2, Clock, Star, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Seo } from "@/components/seo";
import { ProjectMockup } from "@/components/portfolio-mockups";

const CATEGORIES = ["All", "Restaurants", "Schools", "Clinics", "Ecommerce", "Real Estate", "Startups", "Portfolios", "Agencies", "Interior Design", "Fintech"];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Restaurants:      "from-orange-900/80 to-red-900/60",
  Schools:          "from-blue-900/80 to-indigo-900/60",
  Clinics:          "from-cyan-900/80 to-teal-900/60",
  Ecommerce:        "from-purple-900/80 to-pink-900/60",
  "Real Estate":    "from-yellow-900/80 to-amber-900/60",
  Startups:         "from-green-900/80 to-emerald-900/60",
  Portfolios:       "from-violet-900/80 to-purple-900/60",
  Agencies:         "from-rose-900/80 to-red-900/60",
  "Interior Design":"from-amber-900/80 to-yellow-900/60",
  Fintech:          "from-sky-900/80 to-blue-900/60",
};

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string | null;
  featured: boolean;
  client?: string;
  duration?: string;
  results?: string[];
  highlights?: string[];
};

const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Zaiqa Restaurant",
    category: "Restaurants",
    description: "A premium restaurant website built for a high-end Pakistani dining chain. Features an interactive online menu with food photography, WhatsApp table reservations, and a seamless mobile ordering experience that increased online engagement by 300%.",
    imageUrl: "/portfolio/zaiqa-restaurant.png",
    technologies: ["React", "Tailwind CSS", "Node.js", "PostgreSQL", "Framer Motion"],
    liveUrl: null,
    featured: true,
    client: "Zaiqa Dining Co.",
    duration: "3 weeks",
    results: ["300% increase in online orders", "4.9★ client satisfaction", "2s average load time"],
    highlights: ["Online menu with food gallery", "WhatsApp reservation system", "Loyalty program integration", "Multi-branch support"],
  },
  {
    id: 2,
    title: "Al-Noor Bakery",
    category: "Restaurants",
    description: "A charming artisan bakery website with a warm, inviting aesthetic. Includes a product catalog with freshness indicators, custom cake order forms, and a loyalty points system. Orders via WhatsApp doubled within the first two weeks of launch.",
    imageUrl: "/portfolio/alnoor-bakery.png",
    technologies: ["React", "Tailwind CSS", "Express", "Supabase"],
    liveUrl: null,
    featured: false,
    client: "Al-Noor Sweets & Bakery",
    duration: "2 weeks",
    results: ["2x WhatsApp orders", "500+ monthly visitors", "100% mobile traffic"],
    highlights: ["Custom cake order form", "Fresh-daily product catalog", "WhatsApp integration", "Loyalty points system"],
  },
  {
    id: 3,
    title: "Bright Future Academy",
    category: "Schools",
    description: "A complete digital platform for a leading private school. Features an online admissions portal that eliminated paperwork, a teacher portal for assignments, and a parent dashboard for tracking student progress. Admissions processing time cut by 70%.",
    imageUrl: "/portfolio/bright-future-academy.png",
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Stripe"],
    liveUrl: null,
    featured: true,
    client: "Bright Future Academy",
    duration: "5 weeks",
    results: ["70% faster admissions", "250+ students enrolled online", "0 paper forms needed"],
    highlights: ["Online admissions portal", "Parent dashboard", "Fee payment gateway", "Academic calendar system"],
  },
  {
    id: 4,
    title: "Little Stars Nursery",
    category: "Schools",
    description: "A playful, colorful website for a pre-school and nursery. Parents can register their children, view the curriculum, book school tours, and stay updated through the parent bulletin board. Enrollment inquiries increased by 180% post-launch.",
    imageUrl: "/portfolio/little-stars-nursery.png",
    technologies: ["React", "Tailwind CSS", "Node.js", "Supabase"],
    liveUrl: null,
    featured: false,
    client: "Little Stars Early Learning",
    duration: "2 weeks",
    results: ["180% more inquiries", "Online tour bookings", "Happy parent feedback"],
    highlights: ["Online enrollment form", "Virtual tour booking", "Curriculum showcase", "Parent bulletin board"],
  },
  {
    id: 5,
    title: "Al-Shifa Medical Clinic",
    category: "Clinics",
    description: "A professional healthcare website for a multi-specialty clinic. The online appointment system eliminated phone queues, letting patients book consultations 24/7. Doctor profiles, service listings, and a patient FAQ reduced front-desk calls by 60%.",
    imageUrl: "/portfolio/alshifa-clinic.png",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Twilio"],
    liveUrl: null,
    featured: true,
    client: "Al-Shifa Medical Center",
    duration: "4 weeks",
    results: ["60% fewer phone calls", "24/7 appointment booking", "4.8★ patient satisfaction"],
    highlights: ["Online appointment system", "Doctor profile pages", "SMS appointment reminders", "Patient FAQ portal"],
  },
  {
    id: 6,
    title: "DentalCare Pro",
    category: "Clinics",
    description: "A modern, trust-building website for a premium dental clinic. Ultra-clean design with before/after smile galleries, transparent pricing packages, and an easy booking form. The clinic saw a 120% increase in new patient inquiries within 30 days.",
    imageUrl: "/portfolio/dentalcare-pro.png",
    technologies: ["React", "Tailwind CSS", "Express", "PostgreSQL"],
    liveUrl: null,
    featured: false,
    client: "DentalCare Pro Clinic",
    duration: "3 weeks",
    results: ["120% more new patients", "Before/after gallery", "Transparent pricing"],
    highlights: ["Smile transformation gallery", "Pricing packages display", "Online booking form", "WhatsApp quick connect"],
  },
  {
    id: 7,
    title: "DesiMart Fashion Store",
    category: "Ecommerce",
    description: "A full-featured fashion ecommerce platform built for a Pakistani clothing brand. Includes product catalog with size guides, wishlist, cart, and checkout with JazzCash and Easypaisa integration. Monthly revenue grew from zero to PKR 1.2M within 3 months.",
    imageUrl: "/portfolio/desimart-ecommerce.png",
    technologies: ["React", "Node.js", "PostgreSQL", "JazzCash", "Easypaisa"],
    liveUrl: null,
    featured: true,
    client: "DesiMart Clothing Brand",
    duration: "6 weeks",
    results: ["PKR 1.2M monthly revenue", "5,000+ monthly visitors", "35% repeat purchase rate"],
    highlights: ["JazzCash & Easypaisa checkout", "Size guide & product filters", "Order tracking system", "Admin inventory panel"],
  },
  {
    id: 8,
    title: "TechGadgets Store",
    category: "Ecommerce",
    description: "A sleek electronics ecommerce store for a tech retailer. Features comparison tools, detailed spec sheets, warranty registration, and a chat-based support system. The store achieved 8,000 monthly visitors and a 4.2% conversion rate within 60 days.",
    imageUrl: "/portfolio/techgadgets-store.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
    liveUrl: null,
    featured: false,
    client: "TechGadgets PK",
    duration: "5 weeks",
    results: ["8,000 monthly visitors", "4.2% conversion rate", "Live inventory sync"],
    highlights: ["Product comparison tool", "Spec sheet generator", "Warranty registration", "Live chat support"],
  },
  {
    id: 9,
    title: "Prime Properties",
    category: "Real Estate",
    description: "A high-end real estate platform for a property development company. Agents manage their own listings through a dedicated portal. Buyers can filter by area, price, and type, schedule viewings, and get mortgage estimates. Reduced listing time by 80%.",
    imageUrl: "/portfolio/prime-properties.png",
    technologies: ["React", "Node.js", "Google Maps API", "PostgreSQL", "Mapbox"],
    liveUrl: null,
    featured: true,
    client: "Prime Properties Pvt Ltd",
    duration: "7 weeks",
    results: ["80% faster listing process", "Agent portal launched", "Map-based property search"],
    highlights: ["Map-based property search", "Agent self-service portal", "Mortgage calculator", "Virtual tour embedding"],
  },
  {
    id: 10,
    title: "DreamHome Interiors",
    category: "Interior Design",
    description: "An elegant portfolio website for a luxury interior design studio. Features a curated project gallery with before/after comparisons, service packages, a design consultation booking system, and a client mood-board tool. Client inquiries tripled post-launch.",
    imageUrl: "/portfolio/dreamhome-interiors.png",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Supabase"],
    liveUrl: null,
    featured: false,
    client: "DreamHome Interior Studio",
    duration: "3 weeks",
    results: ["3x client inquiries", "Portfolio gallery loved", "Design consults booked"],
    highlights: ["Before/after project gallery", "Design consultation booking", "Client mood board tool", "Service packages display"],
  },
  {
    id: 11,
    title: "TechLaunch SaaS",
    category: "Startups",
    description: "A high-converting SaaS landing page that helped a Pakistani startup raise seed funding. Features animated product demos, an interactive pricing calculator, early-access waitlist with referral tracking, and investor-focused case studies. Helped secure PKR 15M funding.",
    imageUrl: "/portfolio/techlaunch-startup.png",
    technologies: ["React", "Framer Motion", "TypeScript", "Vite", "Supabase"],
    liveUrl: null,
    featured: true,
    client: "TechLaunch PK (Confidential)",
    duration: "2 weeks",
    results: ["PKR 15M seed raised", "2,400+ waitlist signups", "Investor-ready presentation"],
    highlights: ["Animated product demo", "Waitlist with referral system", "Interactive pricing calculator", "Investor case studies"],
  },
  {
    id: 12,
    title: "FinTechPay Solutions",
    category: "Fintech",
    description: "A trust-focused website for a digital payments startup. Features regulatory compliance badges, security architecture explainers, partner bank logos, and a developer API documentation portal. The site was instrumental in securing 3 banking partnerships.",
    imageUrl: "/portfolio/fintechpay.png",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    liveUrl: null,
    featured: false,
    client: "FinTechPay Pvt Ltd",
    duration: "4 weeks",
    results: ["3 banking partnerships", "API docs portal launched", "Regulatory compliance page"],
    highlights: ["Security architecture explainer", "API documentation portal", "Partner banking showcase", "Compliance & trust badges"],
  },
  {
    id: 13,
    title: "Ameer Hamza Portfolio",
    category: "Portfolios",
    description: "My personal developer portfolio built to showcase skills, projects, and experience to international clients and employers. Features GSAP-powered animations, a live GitHub feed, downloadable CV, and a project case study system. Landed 12 international freelance clients.",
    imageUrl: "/portfolio/ameer-portfolio.png",
    technologies: ["React", "GSAP", "Three.js", "Framer Motion", "Vite"],
    liveUrl: "https://ameer-hamza-cv.web.app",
    featured: true,
    client: "Personal Project",
    duration: "4 weeks",
    results: ["12 international clients landed", "Top 1% on Upwork PK", "Featured in design blogs"],
    highlights: ["GSAP scroll animations", "3D hero section", "Live GitHub feed", "Case study system"],
  },
  {
    id: 14,
    title: "DigitalBoost Agency",
    category: "Agencies",
    description: "A bold, results-focused website for a digital marketing agency. Showcases campaign case studies with real ROI numbers, client logos, team bios, and an automated lead capture funnel. The agency signed 8 new enterprise clients within 45 days of going live.",
    imageUrl: "/portfolio/digitalboost-agency.png",
    technologies: ["React", "Tailwind CSS", "Node.js", "Framer Motion", "HubSpot"],
    liveUrl: null,
    featured: false,
    client: "DigitalBoost Marketing",
    duration: "3 weeks",
    results: ["8 enterprise clients signed", "Lead funnel automated", "Case studies drove 60% conversions"],
    highlights: ["ROI case study showcase", "Automated lead capture", "Client logo wall", "Team & culture pages"],
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [selected, setSelected] = React.useState<Project | null>(null);

  const filtered = React.useMemo(
    () => activeCategory === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  React.useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selected]);

  const selectedIdx = selected ? ALL_PROJECTS.findIndex((p) => p.id === selected.id) : -1;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx < ALL_PROJECTS.length - 1) setSelected(ALL_PROJECTS[selectedIdx + 1]);
  };
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx > 0) setSelected(ALL_PROJECTS[selectedIdx - 1]);
  };

  return (
    <div className="w-full">
      <Seo
        title="Web Development Portfolio Pakistan — 14+ Projects | GROWWEB Agency"
        description="Explore GROWWEB's portfolio of 14+ web development projects in Pakistan — restaurant websites, ecommerce stores, clinic portals, school systems, real estate platforms, and startup web apps."
        keywords="web development portfolio Pakistan, website design examples Pakistan, web agency portfolio Lahore, Pakistani website designs, ecommerce website examples Pakistan, restaurant website Pakistan, clinic website Pakistan"
        canonical="/portfolio"
      />
      {/* Hero */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-100 h-50 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Premium <span className="text-primary glow-text">Portfolio</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real websites. Real businesses. Real results. Every project is built from scratch — no templates, no shortcuts.
            </p>
            <div className="flex justify-center gap-6 sm:gap-10 mt-8">
              {[["14+", "Projects Delivered"], ["99%", "Client Satisfaction"], ["3x", "Avg. ROI Increase"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{num}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(0,255,136,0.35)]"
                    : "bg-white/5 text-muted-foreground border-white/10 hover:border-primary/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  onClick={() => setSelected(project)}
                  className="rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,255,136,0.1)] cursor-pointer group flex flex-col"
                >
                  {/* Browser Mockup Preview */}
                  <div className="h-48 sm:h-56 relative overflow-hidden bg-[#0d0d0d] shrink-0">
                    <ProjectMockup id={project.id} />
                    {project.featured && (
                      <div className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1">
                        <Star size={10} fill="black" /> Featured
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 border border-white/10">
                      <Zap size={10} className="text-primary" /> View Details
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary font-mono uppercase tracking-wider">{project.category}</span>
                      {project.duration && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> {project.duration}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-200 flex items-end sm:items-center justify-center sm:p-4 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#0a0a0a] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto relative"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero mockup */}
              <div className="h-52 sm:h-72 relative rounded-t-3xl overflow-hidden shrink-0 bg-[#0d0d0d]">
                <ProjectMockup id={selected.id} />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/60 via-transparent to-transparent pointer-events-none" />

                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors z-10 border border-white/10"
                >
                  <X size={18} />
                </button>

                {/* Prev/Next */}
                <button
                  onClick={goPrev}
                  disabled={selectedIdx === 0}
                  className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors z-10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={goNext}
                  disabled={selectedIdx === ALL_PROJECTS.length - 1}
                  className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors z-10 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>

                {selected.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} fill="black" /> Featured Project
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs text-primary font-mono uppercase tracking-widest">{selected.category}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold mt-1 leading-tight">{selected.title}</h2>
                    {selected.client && (
                      <p className="text-sm text-muted-foreground mt-1">Client: <span className="text-white/70">{selected.client}</span></p>
                    )}
                  </div>
                  {selected.duration && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-white/5 border border-white/10 rounded-full px-3 py-1">
                      <Clock size={13} /> {selected.duration}
                    </div>
                  )}
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{selected.description}</p>

                {/* Results */}
                {selected.results && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      Results Achieved
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {selected.results.map((r) => (
                        <div key={r} className="bg-primary/8 border border-primary/15 rounded-xl p-3 text-center">
                          <span className="text-xs sm:text-sm text-primary font-medium">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {selected.highlights && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                      Key Features Built
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selected.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={14} className="text-primary shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </span>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span key={tech} className="text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selected.liveUrl && selected.liveUrl !== "#" ? (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-semibold rounded-full hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all text-sm"
                    >
                      <ExternalLink size={15} /> View Live Site
                    </a>
                  ) : null}
                  <a
                    href="https://wa.me/923299571003?text=Hi%20Ameer%2C%20I%20saw%20your%20portfolio%20and%20want%20a%20similar%20website%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white font-semibold rounded-full border border-white/15 hover:border-primary/40 transition-all text-sm"
                  >
                    Get a Similar Website →
                  </a>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-1.5 mt-6 pt-4 border-t border-white/8">
                  {ALL_PROJECTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p)}
                      className={`rounded-full transition-all ${
                        p.id === selected.id
                          ? "w-5 h-1.5 bg-primary"
                          : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
