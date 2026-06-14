import React from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: "When you contact us through our website, we collect personal information you voluntarily provide, including your name, email address, phone number, and message content. We do not collect any sensitive personal information.",
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information you provide solely to respond to your inquiry, provide the services you requested, and communicate with you about your project. We do not sell, rent, or share your personal information with third parties.",
  },
  {
    title: "3. Data Storage & Security",
    content: "Your contact form submissions are stored in a secure database. We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "4. Cookies",
    content: "Our website may use cookies to improve your browsing experience. These are small files stored on your device that help us understand how you use our site. You can disable cookies in your browser settings, though this may affect some features of the website.",
  },
  {
    title: "5. Third-Party Services",
    content: "We may use third-party services such as Google Analytics to understand website traffic. These services may collect anonymous usage data. Please refer to their respective privacy policies for more information.",
  },
  {
    title: "6. Your Rights",
    content: "You have the right to request access to, correction of, or deletion of your personal data. To exercise any of these rights, please contact us at ameer12h21@gmail.com or via WhatsApp at +92 329 9571003.",
  },
  {
    title: "7. Data Retention",
    content: "We retain your contact information for as long as necessary to provide our services and comply with our legal obligations. You may request deletion of your data at any time.",
  },
  {
    title: "8. Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Your continued use of our website constitutes acceptance of any changes.",
  },
  {
    title: "9. Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at ameer12h21@gmail.com or WhatsApp: +92 329 9571003.",
  },
];

export default function Privacy() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy <span className="text-primary glow-text">Policy</span></h1>
          <p className="text-muted-foreground mb-12">Last updated: January 2025</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            {SECTIONS.map((section) => (
              <div key={section.title} className="border-l-2 border-primary/20 pl-6 py-1">
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
