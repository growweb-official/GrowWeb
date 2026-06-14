import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Rocket, Star, Quote, MessageSquare, PenTool, Code2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo";

const HOME_FAQ = [
  { q: "What is GROWWEB Agency?", a: "GROWWEB is Pakistan's premier web development agency founded by Ameer Hamza Arshad in Lahore. We build professional websites, ecommerce stores, and custom web applications for businesses across Pakistan." },
  { q: "How much does a website cost in Pakistan?", a: "Our website packages start from PKR 15,000 for landing pages, PKR 25,000 for business websites, and PKR 45,000 for ecommerce stores. Pricing depends on features and complexity." },
  { q: "Which is the best web development company in Pakistan?", a: "GROWWEB Agency is one of Pakistan's top-rated web development companies, with 14+ completed projects and 5-star client reviews. We specialize in modern, high-performance websites for Pakistani businesses." },
  { q: "How long does it take to build a website?", a: "A standard business website takes 5–10 business days. Ecommerce stores take 2–4 weeks. Custom web applications typically take 4–8 weeks depending on complexity." },
  { q: "Do you provide website development services in Lahore?", a: "Yes! GROWWEB is based in Lahore, Pakistan. We serve clients across Pakistan including Lahore, Karachi, Islamabad, Faisalabad, and internationally." },
  { q: "What technologies do you use for web development?", a: "We build with React, Next.js, Node.js, and Tailwind CSS for modern, fast websites. We also integrate payment gateways like JazzCash and Easypaisa for Pakistani ecommerce stores." },
  { q: "Do you offer SEO services with web development?", a: "Yes, every website we build includes basic on-page SEO. We also offer dedicated monthly SEO packages starting from PKR 10,000/month to help you rank higher on Google Pakistan." },
  { q: "Can you build an ecommerce website in Pakistan?", a: "Absolutely. We build full-featured ecommerce stores with product management, JazzCash/Easypaisa/Stripe payment integration, order tracking, and admin dashboards starting from PKR 45,000." },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": HOME_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="border border-border rounded-2xl overflow-hidden bg-card hover:border-primary/30 transition-colors"
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-base hover:text-primary transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={`shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}>＋</span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-4">
          {a}
        </div>
      )}
    </motion.div>
  );
}

const TESTIMONIALS = [
  {
    name: "Bilal Ahmed",
    role: "Owner",
    company: "Zaiqa Restaurant",
    avatar: "BA",
    rating: 5,
    text: "Ameer built us a stunning website that truly represents our brand. Online orders tripled within the first month. The attention to detail was remarkable — every animation, every photo placement felt intentional.",
  },
  {
    name: "Dr. Sarah Khan",
    role: "Director",
    company: "Al-Shifa Medical Clinic",
    avatar: "SK",
    rating: 5,
    text: "The online appointment system alone saved us hours every day. Patients love how easy it is to book, and our front desk calls dropped by 60%. GROWWEB delivered exactly what they promised — on time.",
  },
  {
    name: "Usman Tariq",
    role: "CEO",
    company: "DesiMart Fashion",
    avatar: "UT",
    rating: 5,
    text: "We went from zero online presence to PKR 1.2M in monthly revenue. The store looks premium, loads fast, and the checkout experience is flawless. Best investment we've made for our business.",
  },
  {
    name: "Fatima Malik",
    role: "Principal",
    company: "Bright Future Academy",
    avatar: "FM",
    rating: 5,
    text: "The admissions portal eliminated paperwork completely. Parents love the parent dashboard, and we've enrolled 250+ students online since launch. Worth every rupee — couldn't be happier.",
  },
  {
    name: "Hassan Raza",
    role: "Founder",
    company: "TechLaunch PK",
    avatar: "HR",
    rating: 5,
    text: "Ameer understood our startup vision immediately. The landing page was so compelling that investors took us seriously from day one. We secured PKR 15M in seed funding — the website played a huge role.",
  },
  {
    name: "Ayesha Siddiqui",
    role: "Director",
    company: "DreamHome Interiors",
    avatar: "AS",
    rating: 5,
    text: "Our portfolio website is absolutely gorgeous. Client inquiries tripled post-launch, and we've been able to raise our pricing because the website positions us as a true luxury studio. GROWWEB exceeded all expectations.",
  },
];

export default function Home() {
  return (
    <div className="w-full">
      <Seo
        title="GROWWEB — Best Web Development Company Pakistan | Ameer Hamza"
        description="GROWWEB is Pakistan's #1 web development agency. We build professional websites, ecommerce stores & web apps for businesses in Lahore, Karachi, Islamabad. Starting PKR 15,000. Get a free quote today!"
        keywords="web development company Pakistan, best web development company Pakistan, web design agency Pakistan, website development Pakistan, web development Lahore, ecommerce website Pakistan, web developer Pakistan, professional website Pakistan, business website development, web development agency Pakistan, website design company Pakistan, affordable web development Pakistan"
        canonical="/"
        schema={FAQ_SCHEMA}
      />
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background to-background z-10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
                Premium Web Agency in Pakistan
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Professional Websites That <span className="text-primary glow-text">Grow</span> Your Business
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We craft high-performance digital experiences. Technologically elite but human and approachable — where craft meets ambition.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_30px_rgba(0,255,136,0.6)]">
                <Link href="/contact">Start Your Project <ArrowRight className="ml-2" size={20} /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg w-full sm:w-auto border-white/20 hover:bg-white/5">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "14+", label: "Projects Delivered" },
              { number: "99%", label: "Satisfaction Rate" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Premium Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 glow-text">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Do Best</h2>
            <p className="text-lg text-muted-foreground">Comprehensive web solutions tailored for modern businesses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe size={32} />, title: "Business Websites", desc: "Corporate sites for restaurants, clinics, real estate, and more." },
              { icon: <Smartphone size={32} />, title: "Ecommerce Stores", desc: "High-converting online stores built for scale and speed." },
              { icon: <Rocket size={32} />, title: "Web Applications", desc: "Custom SaaS dashboards and complex web apps." },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -mr-10 -mt-10 transition-transform group-hover:scale-150" />
                <div className="text-primary mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-8">{service.desc}</p>
                <Link href="/services" className="inline-flex items-center text-sm font-medium text-white group-hover:text-primary transition-colors">
                  Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-14 border-y border-white/5 relative z-10 bg-black/30">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-8">Trusted by businesses across Pakistan</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {["Zaiqa Restaurant", "Bright Future Academy", "Al-Shifa Medical", "DesiMart Fashion", "Prime Properties", "TechLaunch PK", "DentalCare Pro", "DigitalBoost"].map((name) => (
              <div key={name} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors font-semibold text-sm tracking-wide">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-5">
              Our Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              From Idea to <span className="text-primary glow-text">Live Website</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              A proven 4-step process that delivers your website on time, every time — no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            {[
              { step: "01", icon: <MessageSquare size={24} />, title: "Free Consultation", desc: "We listen to your goals, discuss your audience, and plan the perfect website for your business — all in a free 30-min call." },
              { step: "02", icon: <PenTool size={24} />, title: "Design & Approve", desc: "You receive design mockups within 48 hours. We revise until you love every pixel — no hidden revision limits." },
              { step: "03", icon: <Code2 size={24} />, title: "Build & Develop", desc: "Our developers build your site with clean, fast code. You track progress with daily updates through WhatsApp." },
              { step: "04", icon: <CheckCircle2 size={24} />, title: "Test & Launch", desc: "We test on all devices, set up your domain, and go live. You get 30 days of free post-launch support included." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center text-primary mb-5 relative z-10 shadow-[0_0_20px_rgba(0,255,136,0.08)]">
                  {item.icon}
                </div>
                <div className="absolute top-0 right-1/4 text-5xl font-black text-primary/5 select-none leading-none">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]">
              <Link href="/contact">Start with a Free Consultation <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-5">
              Client Reviews
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Our <span className="text-primary glow-text">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Real results from real businesses. Here's what our clients have to say about working with GROWWEB.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,255,136,0.08)] flex flex-col relative group"
              >
                <div className="absolute top-5 right-5 text-primary/15 group-hover:text-primary/25 transition-colors">
                  <Quote size={32} />
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — boosts Google Featured Snippets */}
      <section className="py-20 relative z-10" aria-label="Frequently Asked Questions">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-4">Quick Answers</span>
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked <span className="text-primary glow-text">Questions</span></h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Everything you need to know about web development in Pakistan with GROWWEB.</p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {HOME_FAQ.map(({ q, a }, i) => (
              <FaqItem key={i} q={q} a={a} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-primary/5 border-y border-primary/20" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center bg-card p-12 md:p-20 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[100px] pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl text-muted-foreground mb-10 relative z-10">Let's build something extraordinary together. Premium quality, affordable pricing.</p>

            <Button asChild size="lg" className="rounded-full px-10 py-6 text-lg shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] relative z-10">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
