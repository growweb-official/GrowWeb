import React from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { Seo } from "@/components/seo";
import { BLOG_POSTS, getBlogPost } from "@/data/blog-posts";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getBlogPost(slug);

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">This article doesn't exist or has been moved.</p>
          <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://ameer-hamza-cv.web.app",
    },
    "publisher": {
      "@type": "Organization",
      "name": "GROWWEB Agency",
      "url": "https://growweb.website",
      "logo": { "@type": "ImageObject", "url": "https://growweb.website/favicon.svg" },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://growweb.website/blog/${post.slug}`,
    },
    "url": `https://growweb.website/blog/${post.slug}`,
    "inLanguage": "en-PK",
    "keywords": post.keywords,
    "articleSection": post.category,
    "about": {
      "@type": "Thing",
      "name": "Web Development in Pakistan",
    },
  };

  return (
    <div className="w-full">
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={`/blog/${post.slug}`}
        schema={articleSchema}
      />

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-50">{post.category}</span>
          </motion.div>

          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={11} /> {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={11} />
                {new Date(post.date).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-sm">
                AH
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-muted-foreground">Founder, GROWWEB Agency Pakistan</p>
              </div>
            </div>
          </motion.header>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mb-10" />

          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-green max-w-none"
            style={{
              "--tw-prose-body": "hsl(var(--muted-foreground))",
              "--tw-prose-headings": "hsl(var(--foreground))",
              "--tw-prose-links": "hsl(var(--primary))",
              "--tw-prose-bold": "hsl(var(--foreground))",
              "--tw-prose-bullets": "hsl(var(--primary))",
              "--tw-prose-counters": "hsl(var(--primary))",
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: styledContent(post.content) }}
          />

          {/* Share / CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 p-8 rounded-2xl bg-card border border-border relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Need a Professional Website in Pakistan?</h3>
              <p className="text-muted-foreground text-sm mb-5">GROWWEB Agency builds high-performance websites, ecommerce stores & web apps. Starting from PKR 15,000. Free consultation available.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all"
                >
                  Get a Free Quote <ArrowRight size={14} />
                </Link>
                <a
                  href="https://wa.me/923299571003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#25D366]/40 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/10 transition-all"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">More Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block p-5 rounded-xl border border-border hover:border-primary/40 bg-card transition-all">
                    <span className="text-xs text-primary font-medium">{p.category}</span>
                    <h3 className="text-sm font-semibold mt-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                      <Clock size={10} /> {p.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function styledContent(html: string): string {
  return html
    .replace(/<h2>/g, '<h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 0.75rem;color:white;">')
    .replace(/<h3>/g, '<h3 style="font-size:1.15rem;font-weight:600;margin:1.5rem 0 0.5rem;color:white;">')
    .replace(/<p>/g, '<p style="margin:0 0 1rem;line-height:1.8;color:hsl(215 20% 65%);">')
    .replace(/<ul>/g, '<ul style="margin:0 0 1rem;padding-left:1.5rem;list-style:disc;">')
    .replace(/<ol>/g, '<ol style="margin:0 0 1rem;padding-left:1.5rem;list-style:decimal;">')
    .replace(/<li>/g, '<li style="margin:0.35rem 0;color:hsl(215 20% 65%);">')
    .replace(/<strong>/g, '<strong style="color:white;font-weight:600;">')
    .replace(/<a /g, '<a style="color:#00FF88;text-decoration:none;" ');
}
