import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { Seo } from "@/components/seo";
import { BLOG_POSTS } from "@/data/blog-posts";

const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "GROWWEB Blog — Web Development Tips & Guides for Pakistan",
  "url": "https://growweb.website/blog",
  "description": "Expert web development guides, SEO tips, ecommerce advice, and digital marketing strategies for Pakistani businesses.",
  "publisher": {
    "@type": "Organization",
    "name": "GROWWEB Agency",
    "url": "https://growweb.website",
    "logo": "https://growweb.website/favicon.svg",
  },
  "inLanguage": "en-PK",
  "blogPost": BLOG_POSTS.map((p) => ({
    "@type": "BlogPosting",
    "headline": p.title,
    "url": `https://growweb.website/blog/${p.slug}`,
    "datePublished": p.date,
    "author": { "@type": "Person", "name": p.author },
    "description": p.excerpt,
  })),
};

const CATEGORY_COLORS: Record<string, string> = {
  "Web Development": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Pricing": "bg-green-500/10 text-green-400 border-green-500/20",
  "Ecommerce": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "SEO": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Industry Guides": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Business Growth": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const categories = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filtered = activeCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      <Seo
        title="Blog — Web Development Tips & Guides for Pakistan | GROWWEB"
        description="Expert guides on web development, SEO, ecommerce, and digital marketing for Pakistani businesses. Learn how to rank on Google, build websites, and grow your business online in Pakistan."
        keywords="web development blog Pakistan, SEO tips Pakistan, ecommerce Pakistan guide, website cost Pakistan, web development guide Pakistan, digital marketing Pakistan, how to rank Google Pakistan, best web agency Pakistan blog"
        canonical="/blog"
        schema={BLOG_SCHEMA}
      />

      {/* Hero */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">Expert Insights</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Web Development <span className="text-primary glow-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert guides on web development, SEO, ecommerce, and digital growth for Pakistani businesses. Written by <strong className="text-foreground">Ameer Hamza Arshad</strong>, founder of GROWWEB Agency.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(0,255,136,0.4)]"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 group flex flex-col"
              >
                {/* Card header accent */}
                <div className="h-1.5 bg-linear-to-r from-primary/60 via-primary to-primary/40" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-primary/10 text-primary border-primary/20"}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                    >
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-card p-12 rounded-3xl border border-border relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/8 blur-[80px] pointer-events-none rounded-full" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4 relative z-10">Ready to Grow Your Business Online?</h2>
            <p className="text-muted-foreground mb-8 relative z-10">Turn your digital presence into your most powerful sales tool. Free consultation — no obligation.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-black font-semibold hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] transition-all relative z-10"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
