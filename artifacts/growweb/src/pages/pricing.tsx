import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, X, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/seo";

const PRICING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How much does a website cost in Pakistan?", "acceptedAnswer": { "@type": "Answer", "text": "GROWWEB offers website packages starting from PKR 25,000 for the Starter plan (5-page business website), PKR 45,000 for the Professional plan (full-featured site with blog and advanced SEO), and PKR 95,000 for the Premium plan (custom web application with admin dashboard)." }},
    { "@type": "Question", "name": "How much does an ecommerce website cost in Pakistan?", "acceptedAnswer": { "@type": "Answer", "text": "Ecommerce stores start from PKR 45,000 with our Professional plan, which includes product management, JazzCash/Easypaisa payment integration, and an admin dashboard." }},
    { "@type": "Question", "name": "What is included in web development pricing in Pakistan?", "acceptedAnswer": { "@type": "Answer", "text": "All GROWWEB packages include mobile-responsive design, SEO setup, WhatsApp integration, SSL certificate setup, and post-launch support. Higher tiers include blog systems, advanced SEO, custom web apps, and priority support." }},
  ],
};

const PLANS = [
  {
    name: "Starter",
    subtitle: "Perfect for small businesses",
    price: "PKR 25,000",
    period: "one-time",
    highlight: false,
    color: "border-border",
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Mobile responsive design", included: true },
      { text: "Contact form", included: true },
      { text: "WhatsApp button", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Google Maps integration", included: true },
      { text: "1 revision round", included: true },
      { text: "3-month free support", included: true },
      { text: "Ecommerce functionality", included: false },
      { text: "Admin dashboard", included: false },
      { text: "Custom animations", included: false },
      { text: "Advanced SEO", included: false },
    ],
    cta: "Get Started",
    tag: null,
  },
  {
    name: "Business",
    subtitle: "For growing businesses",
    price: "PKR 50,000",
    period: "one-time",
    highlight: true,
    color: "border-primary",
    features: [
      { text: "Up to 10 pages", included: true },
      { text: "Premium responsive design", included: true },
      { text: "Advanced contact forms", included: true },
      { text: "WhatsApp integration", included: true },
      { text: "Advanced SEO optimization", included: true },
      { text: "Google Analytics setup", included: true },
      { text: "3 revision rounds", included: true },
      { text: "6-month free support", included: true },
      { text: "Basic ecommerce (up to 50 products)", included: true },
      { text: "Admin content panel", included: true },
      { text: "Custom animations (Framer Motion)", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Most Popular",
    tag: "BEST VALUE",
  },
  {
    name: "Custom App",
    subtitle: "For complex requirements",
    price: "PKR 100,000+",
    period: "project-based",
    highlight: false,
    color: "border-border",
    features: [
      { text: "Unlimited pages", included: true },
      { text: "Custom UI/UX design", included: true },
      { text: "Full ecommerce solution", included: true },
      { text: "Custom backend & database", included: true },
      { text: "User authentication system", included: true },
      { text: "Admin dashboard", included: true },
      { text: "API integrations", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "12-month free support", included: true },
      { text: "Performance optimization", included: true },
      { text: "Priority development", included: true },
      { text: "Custom feature development", included: true },
    ],
    cta: "Request Quote",
    tag: null,
  },
];

const FAQ = [
  { q: "Do you offer payment in installments?", a: "Yes! We're flexible. We typically require 50% upfront and 50% on delivery. For larger projects, we can arrange 3-part payment plans." },
  { q: "How long does it take to build a website?", a: "Starter sites: 5-7 days. Business sites: 10-15 days. Custom apps: 3-6 weeks depending on complexity. We always give you a clear timeline before starting." },
  { q: "Do you build websites for businesses outside Pakistan?", a: "Absolutely. We work with clients globally. Our pricing remains competitive and we work across time zones." },
  { q: "What if I need changes after the website is live?", a: "All plans include a free support period. After that, we offer affordable monthly maintenance packages starting from PKR 5,000/month." },
  { q: "Do you provide hosting and domain?", a: "We can set everything up for you. Hosting and domains are separate costs (typically PKR 3,000-8,000/year depending on your needs)." },
  { q: "Can I upgrade my plan later?", a: "Yes. We can always expand your website's features over time. We build with scalability in mind." },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="w-full">
      <Seo
        title="Web Development Pricing Pakistan — Website Cost PKR 25,000 to 95,000"
        description="Transparent web development pricing in Pakistan. Business website from PKR 25,000, ecommerce store from PKR 45,000, custom web app from PKR 95,000. No hidden fees. GROWWEB Agency."
        keywords="website development cost Pakistan, web development price Pakistan, how much website cost Pakistan, website price Pakistan PKR, ecommerce website cost Pakistan, web development packages Pakistan, affordable website Pakistan"
        canonical="/pricing"
        schema={PRICING_SCHEMA}
      />
      <section className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">Transparent Pricing</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Honest <span className="text-primary glow-text">Pricing</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Premium quality without the premium agency markup. All plans include free consultation, professional design, and post-launch support.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-3xl border-2 ${plan.color} bg-card p-8 flex flex-col ${
                  plan.highlight ? "shadow-[0_0_40px_rgba(0,255,136,0.15)] scale-105" : ""
                }`}
              >
                {plan.tag && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {plan.tag}
                  </div>
                )}
                {plan.highlight && <div className="absolute inset-0 bg-primary/5 rounded-3xl" />}
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.subtitle}</p>
                  </div>
                  <div className="mb-8">
                    <div className={`text-4xl font-bold ${plan.highlight ? "text-primary glow-text" : ""}`}>{plan.price}</div>
                    <div className="text-muted-foreground text-sm mt-1">{plan.period}</div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        {feature.included
                          ? <CheckCircle2 size={16} className="text-primary shrink-0" />
                          : <X size={16} className="text-muted-foreground/40 shrink-0" />}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground/50 line-through"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      size="lg"
                      className={`rounded-full w-full ${plan.highlight ? "shadow-[0_0_20px_rgba(0,255,136,0.4)]" : ""}`}
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      <Link href="/contact">{plan.cta} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                    <a
                      href="https://wa.me/923299571003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      Or WhatsApp for a custom quote
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20 p-8 bg-card border border-border rounded-3xl"
          >
            <div className="flex items-center justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={20} className="text-primary fill-primary" />)}
            </div>
            <p className="text-lg font-semibold mb-2">"Best investment we ever made for our restaurant."</p>
            <p className="text-muted-foreground text-sm">— Ali Hassan, Zaiqa Restaurant</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-center mb-12">
              Common <span className="text-primary glow-text">Questions</span>
            </motion.h2>
            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 flex justify-between items-center hover:text-primary transition-colors"
                  >
                    <span className="font-semibold pr-4">{item.q}</span>
                    <span className={`text-primary text-xl transition-transform duration-200 shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{item.a}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Still Have <span className="text-primary glow-text">Questions?</span></h2>
            <p className="text-muted-foreground mb-10 text-lg">Book a free 30-minute consultation. No pressure, no sales pitch — just honest advice.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-10 shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <a
                href="https://wa.me/923299571003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-3 rounded-full border border-[#25D366]/40 text-[#25D366] font-semibold hover:bg-[#25D366]/10 transition-all"
              >
                WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
