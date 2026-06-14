import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MessageSquare, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Seo } from "@/components/seo";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
};

const SERVICES = ["Business Website", "Ecommerce Store", "Landing Page", "Web Application", "Admin Dashboard", "SEO Optimization", "UI/UX Design", "Website Redesign", "Maintenance", "Other"];
const BUDGETS = ["Under PKR 20,000", "PKR 20,000 - 50,000", "PKR 50,000 - 100,000", "PKR 100,000+", "Not sure yet"];

const FAQ = [
  { q: "How quickly do you respond?", a: "We respond to all inquiries within 2-4 hours during business hours (9 AM - 9 PM PKT)." },
  { q: "Do you offer free consultations?", a: "Yes, absolutely. Book a free 30-minute consultation via WhatsApp or the form and we'll discuss your project with no obligation." },
  { q: "Can we meet online for a call?", a: "Of course. We're available for video calls via Google Meet or Zoom at your convenience." },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);

  const CONTACT_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact GROWWEB Agency",
    "url": "https://growweb.website/contact",
    "description": "Contact GROWWEB Agency to start your web development project in Pakistan. Get a free consultation and quote.",
    "mainEntity": {
      "@type": "Organization",
      "name": "GROWWEB Agency",
      "telephone": "+92-329-9571003",
      "email": "ameer12h21@gmail.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+92-329-9571003",
        "contactType": "customer service",
        "availableLanguage": ["English", "Urdu"],
        "contactOption": "TollFree",
      },
    },
  };
  const submitContact = useSubmitContact();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await submitContact.mutateAsync({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          service: data.service || null,
          budget: data.budget || null,
          message: data.message,
        },
      });
      setSubmitted(true);
      reset();
      toast({ title: "Message sent!", description: "We'll get back to you within 2-4 hours." });
    } catch (err: unknown) {
      const isNetworkError = err instanceof TypeError;
      toast({
        title: "Something went wrong",
        description: isNetworkError
          ? "Could not reach the server. Please check your connection or try WhatsApp instead."
          : "Your message could not be sent. Please try WhatsApp instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <Seo
        title="Contact GROWWEB — Hire Web Developer Pakistan | Free Consultation"
        description="Ready to start your project? Contact GROWWEB Agency for a free web development consultation. Based in Lahore, serving all of Pakistan. WhatsApp: +92 329 9571003."
        keywords="hire web developer Pakistan, contact web development agency Pakistan, web development consultation Pakistan, get website quote Pakistan, web developer contact Lahore, start web project Pakistan"
        canonical="/contact"
        schema={CONTACT_SCHEMA}
      />
      <section className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-[300p] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">Get In Touch</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Build Something <span className="text-primary glow-text">Great</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ready to grow your business online? Tell us about your project and we'll get back to you within hours.</p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6 order-2 lg:order-1"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Talk to Us</h2>
                <p className="text-muted-foreground">Whether you have a clear vision or just an idea — we're here to help you make it real.</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Mail size={20} />, label: "Email", value: "ameer12h21@gmail.com", href: "mailto:ameer12h21@gmail.com" },
                  { icon: <MessageSquare size={20} />, label: "WhatsApp", value: "+92 329 9571003", href: "https://wa.me/923299571003" },
                  { icon: <Clock size={20} />, label: "Response Time", value: "Within 2-4 hours", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors group">
                    <div className="text-primary mt-0.5 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                      {item.href
                        ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">{item.value}</a>
                        : <div className="font-semibold">{item.value}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/923299571003"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-semibold hover:bg-[#25D366]/20 transition-all"
              >
                <MessageSquare size={20} />
                Chat on WhatsApp Now
              </a>

              <div className="p-5 bg-card border border-border rounded-2xl">
                <div className="text-xs text-primary font-mono uppercase tracking-widest mb-3">Quick FAQ</div>
                <div className="space-y-4">
                  {FAQ.map((item, i) => (
                    <div key={i}>
                      <div className="font-semibold text-sm mb-1">{item.q}</div>
                      <div className="text-muted-foreground text-xs">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <div className="bg-card border border-border rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16 relative z-10"
                  >
                    <CheckCircle2 size={64} className="text-primary mb-6" />
                    <h3 className="text-2xl font-bold mb-3">Message Received!</h3>
                    <p className="text-muted-foreground mb-6">We'll get back to you within 2-4 hours. Meanwhile, feel free to WhatsApp us directly.</p>
                    <div className="flex gap-4">
                      <button onClick={() => setSubmitted(false)} className="px-6 py-2 rounded-full border border-border hover:border-primary/40 text-sm transition-colors">Send Another</button>
                      <a href="https://wa.me/923299571003" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-primary text-black font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all">WhatsApp Us</a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name *</label>
                        <input
                          {...register("name", { required: "Name is required" })}
                          placeholder="Ali Hassan"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                        />
                        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                          {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
                          placeholder="ali@example.com"
                          type="email"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone / WhatsApp</label>
                        <input
                          {...register("phone")}
                          placeholder="+92 300 0000000"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Service Needed</label>
                        <select
                          {...register("service")}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors text-muted-foreground"
                        >
                          <option value="">Select a service...</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        {...register("budget")}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors text-muted-foreground"
                      >
                        <option value="">Select budget...</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Your Message *</label>
                      <textarea
                        {...register("message", { required: "Message is required", minLength: { value: 10, message: "Please provide more detail" } })}
                        rows={5}
                        placeholder="Tell us about your project, your business, and what you're hoping to achieve..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground resize-none"
                      />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || submitContact.isPending}
                      className="w-full rounded-xl py-6 font-semibold shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all"
                    >
                      {isSubmitting || submitContact.isPending ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Sending...</span>
                      ) : (
                        <span className="flex items-center gap-2"><Send size={18} /> Send Message</span>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">We respond within 2-4 hours during business hours. Your info is 100% private.</p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
