import React from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  {
    title: "1. Agreement to Terms",
    content: "By engaging GROWWEB for web development services or accessing our website at growweb.website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Services",
    content: "GROWWEB provides web development, design, SEO, and related digital services. All services are delivered as agreed upon in writing before project commencement. We reserve the right to refuse service to anyone for any reason.",
  },
  {
    title: "3. Payment Terms",
    content: "Standard payment structure is 50% upfront and 50% upon project completion. Payment must be made before any work begins. We accept bank transfers and JazzCash. All prices are in PKR unless otherwise specified.",
  },
  {
    title: "4. Project Delivery",
    content: "Project timelines are estimated and provided before commencement. Delays caused by the client (delayed feedback, missing content, etc.) are not the responsibility of GROWWEB. We will communicate any delays transparently and promptly.",
  },
  {
    title: "5. Revisions & Changes",
    content: "Revision rounds are included as specified in each package. Additional revisions beyond the included rounds will be billed at PKR 2,000-5,000 per round depending on the scope. Major scope changes require a new agreement.",
  },
  {
    title: "6. Intellectual Property",
    content: "Upon full payment, the client owns all rights to the final delivered website and its content. GROWWEB retains the right to display the work in its portfolio unless the client explicitly requests confidentiality.",
  },
  {
    title: "7. Client Responsibilities",
    content: "The client is responsible for providing accurate content, images, and timely feedback. The client must ensure they have rights to all content provided for use in the website. GROWWEB is not liable for copyright violations resulting from client-provided content.",
  },
  {
    title: "8. Support & Maintenance",
    content: "Free support is included for the period specified in each package after project delivery. Support covers bug fixes and minor adjustments. New features or major changes are billed separately.",
  },
  {
    title: "9. Limitation of Liability",
    content: "GROWWEB shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. Our maximum liability is limited to the amount paid for the specific service in question.",
  },
  {
    title: "10. Governing Law",
    content: "These Terms are governed by the laws of Pakistan. Any disputes shall be resolved through good faith negotiation. If necessary, disputes will be subject to the jurisdiction of courts in Pakistan.",
  },
  {
    title: "11. Contact",
    content: "For questions about these terms, contact us at ameer12h21@gmail.com or WhatsApp: +92 329 9571003.",
  },
];

export default function Terms() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms &amp; <span className="text-primary glow-text">Conditions</span></h1>
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
