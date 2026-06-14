import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Target, Heart, Lightbulb, Star, Globe, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo";

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ameer Hamza Arshad",
  "jobTitle": "Founder & Lead Web Developer",
  "worksFor": { "@type": "Organization", "name": "GROWWEB Agency", "url": "https://growweb.website" },
  "url": "https://ameer-hamza-cv.web.app",
  "address": { "@type": "PostalAddress", "addressLocality": "Lahore", "addressRegion": "Punjab", "addressCountry": "PK" },
  "knowsAbout": ["Web Development", "React", "Node.js", "Ecommerce Development", "SEO", "UI/UX Design", "Pakistan Business Websites"],
  "sameAs": ["https://ameer-hamza-cv.web.app", "https://growweb.website"],
};

const SKILLS = [
  { name: "React / Next.js", level: 95 },
  { name: "Node.js / Express", level: 90 },
  { name: "UI/UX Design", level: 88 },
  { name: "Tailwind CSS", level: 97 },
  { name: "PostgreSQL / MongoDB", level: 85 },
  { name: "SEO Optimization", level: 88 },
];

const TIMELINE = [
  {
    year: "2022",
    title: "Started Learning Web Dev",
    desc: "At just 14, I began teaching myself HTML, CSS, and JavaScript — spending hours on free courses and tutorials, driven by pure curiosity and ambition.",
  },
  {
    year: "2023",
    title: "First Freelance Clients",
    desc: "Landed my first paid projects for local businesses — restaurants, shops, and service providers. Every project sharpened my skills and fuelled my vision.",
  },
  {
    year: "2024",
    title: "Mastered Full-Stack Development",
    desc: "Went deep into React, Node.js, and databases. Delivered projects across clinics, schools, e-commerce, real estate, and startups — honing my craft relentlessly.",
  },
  {
    year: "Jan 2026",
    title: "Founded GROWWEB Agency",
    desc: "Officially launched GROWWEB with a clear mission: deliver world-class, results-driven websites to Pakistani businesses at prices they can actually afford.",
  },
  {
    year: "2026+",
    title: "Scaling & Growing",
    desc: "Expanding GROWWEB's reach, refining our systems, and delivering increasingly ambitious digital experiences for clients across Pakistan and beyond.",
  },
];

const VALUES = [
  { icon: <Star size={24} />, title: "Quality First", desc: "We never ship anything we wouldn't be proud to put in our portfolio. Every pixel matters." },
  { icon: <Heart size={24} />, title: "Client Obsessed", desc: "Your success is our success. We build long-term relationships, not just one-off transactions." },
  { icon: <Lightbulb size={24} />, title: "Innovation Driven", desc: "We stay ahead of trends so your website always feels cutting-edge, not dated." },
  { icon: <Shield size={24} />, title: "Transparency", desc: "No hidden fees, no vague timelines. We communicate clearly and deliver on our promises." },
  { icon: <Zap size={24} />, title: "Speed & Performance", desc: "Fast websites rank better, convert more, and delight users. We build for speed by default." },
  { icon: <Users size={24} />, title: "Accessibility", desc: "Great websites work for everyone. We design with inclusion and usability in mind." },
];

export default function About() {
  return (
    <div className="w-full">
      <Seo
        title="About GROWWEB — Web Developer Lahore Pakistan | Ameer Hamza Arshad"
        description="Meet Ameer Hamza Arshad, founder of GROWWEB Agency — a self-taught full-stack developer with 4+ years of experience building professional websites and web applications for Pakistani businesses."
        keywords="web developer Lahore Pakistan, Ameer Hamza web developer, GROWWEB agency about, web development company Lahore, Pakistan web developer, freelance web developer Pakistan, best web developer Pakistan"
        canonical="/about"
        schema={ABOUT_SCHEMA}
      />
      <section className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">Our Story</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-primary glow-text">GROWWEB</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Built with passion in Pakistan. Focused on one thing: making businesses grow through the power of exceptional web design.</p>
          </motion.div>

          {/* Founder section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32"
          >
            <div className="relative">
              <div className="w-full max-w-sm mx-auto rounded-3xl border border-primary/30 relative overflow-hidden shadow-[0_0_40px_rgba(0,255,136,0.15)]">
                <img
                  src="/ameer-hamza.png"
                  alt="Ameer Hamza — Founder & Lead Developer"
                  className="w-full h-auto object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <div className="text-xl font-bold text-foreground">Ameer Hamza</div>
                  <div className="text-primary text-sm font-mono mt-1">Founder & Lead Developer</div>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center hidden md:block">
                <div className="text-2xl font-bold text-primary">14+</div>
                <div className="text-xs text-muted-foreground">Projects Done</div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Developer Who Actually <span className="text-primary">Cares</span></h2>
              <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>I'm Ameer Hamza — a self-taught full-stack developer and the founder of GROWWEB. I started coding around 2022 with a simple goal: build things that actually work and actually matter to real people.</p>
                <p>After working with clients throughout 2023–2024 and delivering websites for local restaurants, schools, and small businesses, I realised there was a massive gap in the market. Pakistani businesses needed premium, modern websites — but most agencies either charged Fortune 500 prices or delivered template-level quality.</p>
                <p>So in January 2026, I founded GROWWEB with a clear mission: deliver world-class web development at prices that local businesses can actually afford. No fluff, no templates, no copy-paste work — just genuine craftsmanship and honest results.</p>
                <p>Every project I take on, I treat as if it's my own business on the line. Because your website is the first thing a customer judges you by — and that first impression deserves to be extraordinary.</p>
              </div>
              <div className="flex gap-4 mt-8">
                <Button asChild size="sm" className="rounded-full px-6">
                  <a href="https://ameer-hamza-cv.web.app" target="_blank" rel="noopener noreferrer">View Portfolio <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-full px-6 border-border">
                  <Link href="/contact">Work With Me</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <div className="max-w-4xl mx-auto mb-32">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-12">
              Technical <span className="text-primary glow-text">Expertise</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-primary font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(0,255,136,0.5)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto mb-32">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-12">
              The <span className="text-primary glow-text">Journey</span>
            </motion.h2>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
              <div className="space-y-10">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-[0_0_10px_rgba(0,255,136,0.5)] z-10" />
                    <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                        <div className="text-primary font-mono text-sm mb-1">{item.year}</div>
                        <div className="font-bold text-lg mb-2">{item.title}</div>
                        <div className="text-muted-foreground text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-5xl mx-auto mb-20">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our <span className="text-primary glow-text">Values</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform inline-block">{value.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission / Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { icon: <Target size={28} />, label: "Mission", text: "To empower Pakistani businesses with world-class digital experiences that generate real results — more customers, more trust, more growth." },
              { icon: <Globe size={28} />, label: "Vision", text: "To become Pakistan's most trusted web development agency, known for craftsmanship, integrity, and measurable business impact." },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="relative z-10">
                  <div className="text-primary mb-4">{item.icon}</div>
                  <div className="text-primary font-mono text-xs uppercase tracking-widest mb-2">{item.label}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build Something <span className="text-primary glow-text">Amazing</span></h2>
            <p className="text-muted-foreground mb-10 text-lg">Ready to work with a developer who treats your project like his own?</p>
            <Button asChild size="lg" className="rounded-full px-10 shadow-[0_0_20px_rgba(0,255,136,0.4)]">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
