import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Mail, MailOpen, Trash2, RefreshCw, MessageSquare, FolderOpen, Star,
  Search, LogOut, Plus, Pencil, Save, CheckCircle2, Settings, ExternalLink, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAdminListContacts, useAdminDeleteContact, useAdminMarkContactRead, useAdminGetStats,
  useAdminListPortfolio, useAdminCreatePortfolio, useAdminUpdatePortfolio, useAdminDeletePortfolio,
  useAdminListTestimonials, useAdminCreateTestimonial, useAdminUpdateTestimonial, useAdminDeleteTestimonial,
  useAdminGetSettings, useAdminUpdateSettings,
  getAdminListContactsQueryKey, getAdminGetStatsQueryKey,
  getAdminListPortfolioQueryKey, getAdminListTestimonialsQueryKey, getAdminGetSettingsQueryKey,
} from "@/lib/api-client";
import type {
  PortfolioProject, Testimonial, ContactMessage, DashboardStats, SiteSettingsMap,
} from "@/lib/api-client";

function useAdminNotifications(enabled: boolean, onNewMessage: (name: string, service?: string | null) => void) {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!enabled) return;

    if (Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }

    const url = "/api/notifications/stream";
    let es: EventSource;
    let retryTimeout: ReturnType<typeof setTimeout>;

    function connect() {
      es = new EventSource(url);
      es.onmessage = (e) => {
        if (!e.data || e.data === "connected") return;
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === "new_message") {
            queryClient.invalidateQueries({ queryKey: [...getAdminListContactsQueryKey()] });
            queryClient.invalidateQueries({ queryKey: [...getAdminGetStatsQueryKey()] });
            onNewMessage(payload.name, payload.service);
            if (Notification.permission === "granted") {
              new Notification("📬 New GROWWEB Lead!", {
                body: `${payload.name}${payload.service ? ` — ${payload.service}` : ""} sent you a message.`,
                icon: "/favicon.svg",
                badge: "/favicon.svg",
              });
            }
          }
        } catch {}
      };
      es.onerror = () => {
        es.close();
        retryTimeout = setTimeout(connect, 5000);
      };
    }

    connect();
    return () => {
      es?.close();
      clearTimeout(retryTimeout);
    };
  }, [enabled, queryClient, onNewMessage]);
}

function useAdminAuth() {
  const [, setLocation] = useLocation();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("admin_username") : null;
  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setLocation("/admin");
  };
  return { token, username, logout };
}

const TABS = [
  { id: "messages", label: "Messages", icon: <MessageSquare size={18} /> },
  { id: "portfolio", label: "Portfolio", icon: <FolderOpen size={18} /> },
  { id: "testimonials", label: "Testimonials", icon: <Star size={18} /> },
  { id: "settings", label: "Site Settings", icon: <Settings size={18} /> },
] as const;
type TabId = (typeof TABS)[number]["id"];

const CATEGORIES = ["Restaurants", "Schools", "Clinics", "Ecommerce", "Real Estate", "Startups", "Portfolios", "Agencies", "Other"];
const PORTFOLIO_IMAGES = [
  "/portfolio/zaiqa-restaurant.png", "/portfolio/alnoor-bakery.png", "/portfolio/alshifa-clinic.png",
  "/portfolio/dentalcare-pro.png", "/portfolio/bright-future-academy.png", "/portfolio/little-stars-nursery.png",
  "/portfolio/desimart-ecommerce.png", "/portfolio/techgadgets-store.png",
  "/portfolio/prime-properties.png", "/portfolio/dreamhome-interiors.png",
];

type PortfolioFormData = {
  title: string; category: string; description: string; imageUrl: string;
  technologies: string; liveUrl: string; featured: boolean; sortOrder: number;
};
const defaultPortfolioForm: PortfolioFormData = {
  title: "", category: "Restaurants", description: "", imageUrl: "",
  technologies: "", liveUrl: "", featured: false, sortOrder: 0,
};

function PortfolioForm({ initial, onSave, onCancel, loading }: {
  initial?: PortfolioFormData;
  onSave: (d: PortfolioFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = React.useState<PortfolioFormData>(initial ?? defaultPortfolioForm);
  const set = <K extends keyof PortfolioFormData>(k: K, v: PortfolioFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-background border border-primary/30 rounded-2xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Project Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Zaiqa Restaurant" className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Category *</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Description *</label>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Brief description..." className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60 resize-none" />
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-2">Project Image</label>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {PORTFOLIO_IMAGES.map((img) => (
            <div key={img} onClick={() => set("imageUrl", img)} className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${form.imageUrl === img ? "border-primary" : "border-border hover:border-primary/40"}`}>
              <div className="w-full h-16 bg-white/5 flex items-center justify-center text-xs text-muted-foreground">{img.split("/").pop()}</div>
            </div>
          ))}
        </div>
        <input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="Or paste any image URL..." className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Technologies (comma separated)</label>
          <input value={form.technologies} onChange={(e) => set("technologies", e.target.value)} placeholder="React, Node.js, PostgreSQL" className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Live URL</label>
          <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} placeholder="https://example.com" className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Sort Order</label>
          <input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)} className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm">Featured project</span>
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button onClick={() => onSave(form)} disabled={loading || !form.title || !form.description} className="rounded-xl">
          {loading ? <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />Saving...</span> : <><Save size={16} className="mr-1" />Save Project</>}
        </Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl border-white/20">Cancel</Button>
      </div>
    </div>
  );
}

type TestimonialFormData = { name: string; role: string; company: string; content: string; rating: number; avatarUrl: string; };
const defaultTestimonialForm: TestimonialFormData = { name: "", role: "", company: "", content: "", rating: 5, avatarUrl: "" };

function TestimonialForm({ initial, onSave, onCancel, loading }: {
  initial?: TestimonialFormData;
  onSave: (d: TestimonialFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = React.useState<TestimonialFormData>(initial ?? defaultTestimonialForm);
  const set = <K extends keyof TestimonialFormData>(k: K, v: TestimonialFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-background border border-primary/30 rounded-2xl p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Client Name *</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ali Hassan" className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Role *</label>
          <input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Restaurant Owner" className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Company *</label>
          <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Zaiqa Restaurant" className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Review / Testimonial *</label>
        <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={3} placeholder="What they said..." className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60 resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Rating (1-5)</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => set("rating", n)} className={`text-2xl transition-transform hover:scale-110 ${form.rating >= n ? "text-primary" : "text-muted-foreground/30"}`}>★</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Avatar URL (optional)</label>
          <input value={form.avatarUrl} onChange={(e) => set("avatarUrl", e.target.value)} placeholder="https://..." className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/60" />
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => onSave(form)} disabled={loading || !form.name || !form.company || !form.content} className="rounded-xl">
          {loading ? <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />Saving...</span> : <><Save size={16} className="mr-1" />Save Review</>}
        </Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl border-white/20">Cancel</Button>
      </div>
    </div>
  );
}

// ─── Theme color presets ──────────────────────────────────────────────────────
const THEME_PRESETS = [
  { label: "Neon Green (Default)", h: "152", s: "100", l: "50", hex: "#00ff88" },
  { label: "Electric Blue", h: "210", s: "100", l: "56", hex: "#1b8cff" },
  { label: "Deep Purple", h: "265", s: "89", l: "60", hex: "#9b5cf6" },
  { label: "Hot Orange", h: "25", s: "100", l: "52", hex: "#ff6b1a" },
  { label: "Rose Pink", h: "345", s: "90", l: "60", hex: "#f95c8a" },
  { label: "Cyan Teal", h: "180", s: "90", l: "45", hex: "#0bd4c8" },
  { label: "Golden Yellow", h: "43", s: "100", l: "50", hex: "#ffa500" },
  { label: "Crimson Red", h: "0", s: "85", l: "55", hex: "#f54242" },
];

const SETTINGS_FIELDS = [
  {
    group: "Homepage", fields: [
      { key: "hero_title", label: "Hero Headline", multiline: false },
      { key: "hero_subtitle", label: "Hero Subtitle", multiline: true },
      { key: "stats_projects", label: "Projects Stat (e.g. 50+)", multiline: false },
      { key: "stats_satisfaction", label: "Satisfaction Stat (e.g. 99%)", multiline: false },
      { key: "stats_experience", label: "Experience Stat (e.g. 5+)", multiline: false },
    ],
  },
  {
    group: "About Page", fields: [
      { key: "about_founder_name", label: "Founder Name", multiline: false },
      { key: "about_founder_title", label: "Founder Title", multiline: false },
      { key: "about_founder_photo", label: "Founder Photo URL", multiline: false },
      { key: "about_bio_1", label: "Bio Paragraph 1", multiline: true },
      { key: "about_bio_2", label: "Bio Paragraph 2", multiline: true },
      { key: "about_bio_3", label: "Bio Paragraph 3", multiline: true },
      { key: "portfolio_link", label: "Portfolio Website URL", multiline: false },
    ],
  },
  {
    group: "Contact & Footer", fields: [
      { key: "email", label: "Email Address", multiline: false },
      { key: "whatsapp_number", label: "WhatsApp Number", multiline: false },
      { key: "footer_tagline", label: "Footer Tagline", multiline: true },
    ],
  },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { token, username, logout } = useAdminAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<TabId>("messages");
  const [search, setSearch] = React.useState("");
  const [filterRead, setFilterRead] = React.useState<"all" | "unread" | "read">("all");

  const [portfolioMode, setPortfolioMode] = React.useState<"list" | "add" | "edit">("list");
  const [editingProject, setEditingProject] = React.useState<PortfolioProject | null>(null);

  const [testimonialMode, setTestimonialMode] = React.useState<"list" | "add" | "edit">("list");
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);

  const [settingsForm, setSettingsForm] = React.useState<Record<string, string>>({});
  const [settingsDirty, setSettingsDirty] = React.useState(false);

  React.useEffect(() => { if (!token) setLocation("/admin"); }, [token, setLocation]);

  const enabled = !!token;

  const handleNewMessage = React.useCallback((name: string, service?: string | null) => {
    toast({
      title: "📬 New message received!",
      description: `${name}${service ? ` is asking about ${service}` : " sent you a message"}`,
    });
  }, [toast]);

  useAdminNotifications(enabled, handleNewMessage);

  const { data: stats, isLoading: statsLoading } = useAdminGetStats({ query: { enabled, queryKey: getAdminGetStatsQueryKey(), refetchInterval: 30000 } });
  const statsData = stats as DashboardStats | undefined;

  React.useEffect(() => {
    const unread = statsData?.unreadContacts ?? 0;
    document.title = unread > 0 ? `(${unread}) GROWWEB Admin` : "GROWWEB Admin";
    return () => { document.title = "GROWWEB — Professional Web Development Agency Pakistan | Ameer Hamza"; };
  }, [statsData?.unreadContacts]);

  const { data: contacts, isLoading: contactsLoading, refetch: refetchContacts } = useAdminListContacts({ query: { enabled, queryKey: getAdminListContactsQueryKey() } });
  const contactsData = contacts as ContactMessage[] | undefined;

  const { data: portfolio, isLoading: portfolioLoading, refetch: refetchPortfolio } = useAdminListPortfolio({ query: { enabled, queryKey: getAdminListPortfolioQueryKey() } });
  const portfolioData = portfolio as PortfolioProject[] | undefined;

  const { data: testimonialsList, isLoading: testimonialsLoading, refetch: refetchTestimonials } = useAdminListTestimonials({ query: { enabled, queryKey: getAdminListTestimonialsQueryKey() } });
  const testimonialsData = testimonialsList as Testimonial[] | undefined;

  const { data: siteSettings } = useAdminGetSettings({ query: { enabled, queryKey: getAdminGetSettingsQueryKey() } });
  const settingsData = siteSettings as SiteSettingsMap | undefined;

  React.useEffect(() => {
    if (settingsData && !settingsDirty) {
      setSettingsForm({ ...settingsData });
    }
  }, [settingsData, settingsDirty]);

  const deleteContact = useAdminDeleteContact();
  const markRead = useAdminMarkContactRead();
  const createPortfolio = useAdminCreatePortfolio();
  const updatePortfolio = useAdminUpdatePortfolio();
  const deletePortfolio = useAdminDeletePortfolio();
  const createTestimonial = useAdminCreateTestimonial();
  const updateTestimonial = useAdminUpdateTestimonial();
  const deleteTestimonial = useAdminDeleteTestimonial();
  const updateSettings = useAdminUpdateSettings();

  const invalidate = async (...keys: readonly (readonly string[])[]) => {
    for (const k of keys) await queryClient.invalidateQueries({ queryKey: [...k] });
  };

  const filteredContacts = React.useMemo(() => {
    if (!contactsData) return [];
    return contactsData.filter((c: ContactMessage) => {
      const ms = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.message.toLowerCase().includes(search.toLowerCase());
      const mf = filterRead === "all" || (filterRead === "unread" && !c.isRead) || (filterRead === "read" && c.isRead);
      return ms && mf;
    });
  }, [contactsData, search, filterRead]);

  const handleDeleteContact = async (id: number) => {
    await deleteContact.mutateAsync({ id });
    await invalidate(getAdminListContactsQueryKey(), getAdminGetStatsQueryKey());
    toast({ title: "Message deleted" });
  };

  const handleMarkRead = async (id: number, isRead: boolean) => {
    await markRead.mutateAsync({ id, data: { isRead } });
    await invalidate(getAdminListContactsQueryKey(), getAdminGetStatsQueryKey());
  };

  const handleSavePortfolio = async (form: PortfolioFormData) => {
    const data = {
      title: form.title, category: form.category, description: form.description,
      imageUrl: form.imageUrl,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      liveUrl: form.liveUrl || null,
      featured: form.featured,
      sortOrder: form.sortOrder,
    };
    if (portfolioMode === "add") {
      await createPortfolio.mutateAsync({ data });
      toast({ title: "Project added!" });
    } else if (editingProject) {
      await updatePortfolio.mutateAsync({ id: editingProject.id, data });
      toast({ title: "Project updated!" });
    }
    await invalidate(getAdminListPortfolioQueryKey(), getAdminGetStatsQueryKey());
    setPortfolioMode("list");
    setEditingProject(null);
  };

  const handleDeletePortfolio = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await deletePortfolio.mutateAsync({ id });
    await invalidate(getAdminListPortfolioQueryKey(), getAdminGetStatsQueryKey());
    toast({ title: "Project deleted" });
  };

  const handleSaveTestimonial = async (form: TestimonialFormData) => {
    const data = {
      name: form.name, role: form.role, company: form.company,
      content: form.content, rating: form.rating, avatarUrl: form.avatarUrl || null,
    };
    if (testimonialMode === "add") {
      await createTestimonial.mutateAsync({ data });
      toast({ title: "Review added!" });
    } else if (editingTestimonial) {
      await updateTestimonial.mutateAsync({ id: editingTestimonial.id, data });
      toast({ title: "Review updated!" });
    }
    await invalidate(getAdminListTestimonialsQueryKey(), getAdminGetStatsQueryKey());
    setTestimonialMode("list");
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    await deleteTestimonial.mutateAsync({ id });
    await invalidate(getAdminListTestimonialsQueryKey(), getAdminGetStatsQueryKey());
    toast({ title: "Review deleted" });
  };

  const handleSaveSettings = async () => {
    await updateSettings.mutateAsync({ data: settingsForm });
    await invalidate(getAdminGetSettingsQueryKey());
    setSettingsDirty(false);
    toast({ title: "Settings saved!", description: "Changes are live on your website." });
  };

  const setSetting = (key: string, value: string) => {
    setSettingsForm((f) => ({ ...f, [key]: value }));
    setSettingsDirty(true);
  };

  if (!token) return null;

  const STAT_CARDS = [
    { label: "Total Messages", value: statsData?.totalContacts ?? "—", icon: <MessageSquare size={20} />, color: "text-blue-400" },
    { label: "Unread Messages", value: statsData?.unreadContacts ?? "—", icon: <Mail size={20} />, color: "text-primary" },
    { label: "Portfolio Projects", value: statsData?.totalProjects ?? "—", icon: <FolderOpen size={20} />, color: "text-purple-400" },
    { label: "Testimonials", value: statsData?.totalTestimonials ?? "—", icon: <Star size={20} />, color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src="/growweb-logo.jpg" alt="GROWWEB" className="w-7 h-7 rounded object-cover" />
          <span className="font-bold text-sm tracking-wider">GROW<span className="text-primary">WEB</span> <span className="text-muted-foreground font-normal">Admin</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground hidden sm:block">{username}</span>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors">
            <LogOut size={16} /> <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card border border-border rounded-2xl p-5">
              <div className={`${stat.color} mb-3`}>{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{statsLoading ? <span className="animate-pulse text-muted-foreground text-xl">—</span> : stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-primary text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]" : "bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/30"}`}>
              {tab.icon} {tab.label}
              {tab.id === "messages" && statsData?.unreadContacts ? (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{statsData.unreadContacts}</span>
              ) : null}
            </button>
          ))}
        </div>

        {activeTab === "messages" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Contact Messages</h2>
                <p className="text-sm text-muted-foreground">{filteredContacts.length} message{filteredContacts.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/60 w-48" />
                </div>
                <div className="flex gap-1 bg-background border border-border rounded-xl p-1">
                  {(["all", "unread", "read"] as const).map((f) => (
                    <button key={f} onClick={() => setFilterRead(f)} className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${filterRead === f ? "bg-primary text-black font-semibold" : "text-muted-foreground hover:text-white"}`}>{f}</button>
                  ))}
                </div>
                <button onClick={() => refetchContacts()} className="p-2 rounded-xl border border-border hover:border-primary/40 transition-colors text-muted-foreground hover:text-white"><RefreshCw size={16} /></button>
              </div>
            </div>
            {contactsLoading ? (
              <div className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-6 animate-pulse flex gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full" />
                    <div className="flex-1 space-y-2"><div className="h-4 bg-white/5 rounded w-1/4" /><div className="h-3 bg-white/5 rounded w-3/4" /></div>
                  </div>
                ))}
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="py-16 text-center">
                <MessageSquare size={40} className="text-muted-foreground mx-auto mb-4 opacity-40" />
                <div className="text-muted-foreground">No messages found</div>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredContacts.map((contact: ContactMessage) => (
                  <div key={contact.id} className={`p-6 transition-colors hover:bg-white/2 ${!contact.isRead ? "border-l-2 border-primary" : ""}`}>
                    <div className="flex gap-4 items-start">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${!contact.isRead ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground"}`}>
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold">{contact.name}</span>
                          {!contact.isRead && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">New</span>}
                          {contact.service && <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">{contact.service}</span>}
                          {contact.budget && <span className="text-xs text-muted-foreground border border-border rounded-full px-2 py-0.5">{contact.budget}</span>}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{contact.email}{contact.phone ? ` • ${contact.phone}` : ""}</div>
                        <p className="text-sm mb-2">{contact.message}</p>
                        <div className="text-xs text-muted-foreground/60">{new Date(contact.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleMarkRead(contact.id, !contact.isRead)} title={contact.isRead ? "Mark unread" : "Mark read"} className="p-2 rounded-xl border border-border hover:border-primary/40 transition-colors text-muted-foreground hover:text-primary">
                          {contact.isRead ? <Mail size={16} /> : <MailOpen size={16} />}
                        </button>
                        <button onClick={() => handleDeleteContact(contact.id)} className="p-2 rounded-xl border border-border hover:border-destructive/40 transition-colors text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Portfolio Projects <span className="text-muted-foreground text-sm font-normal">({portfolioData?.length ?? 0})</span></h2>
              <div className="flex gap-2">
                <button onClick={() => refetchPortfolio()} className="p-2 rounded-xl border border-border hover:border-primary/40 text-muted-foreground hover:text-white transition-colors"><RefreshCw size={16} /></button>
                {portfolioMode === "list" && (
                  <Button onClick={() => { setPortfolioMode("add"); setEditingProject(null); }} className="rounded-xl">
                    <Plus size={16} className="mr-1" /> Add Project
                  </Button>
                )}
              </div>
            </div>
            {portfolioMode !== "list" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">{portfolioMode === "add" ? "Add New Project" : "Edit Project"}</h3>
                <PortfolioForm
                  initial={editingProject ? {
                    title: editingProject.title, category: editingProject.category,
                    description: editingProject.description, imageUrl: editingProject.imageUrl,
                    technologies: editingProject.technologies.join(", "),
                    liveUrl: editingProject.liveUrl ?? "", featured: editingProject.featured ?? false,
                    sortOrder: editingProject.sortOrder ?? 0,
                  } : undefined}
                  onSave={handleSavePortfolio}
                  onCancel={() => { setPortfolioMode("list"); setEditingProject(null); }}
                  loading={createPortfolio.isPending || updatePortfolio.isPending}
                />
              </div>
            )}
            {portfolioLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-40 bg-white/5" />
                    <div className="p-4 space-y-2"><div className="h-4 bg-white/5 rounded w-3/4" /><div className="h-3 bg-white/5 rounded w-full" /></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(portfolioData ?? []).map((project: PortfolioProject) => (
                  <div key={project.id} className="bg-card border border-border rounded-2xl overflow-hidden group">
                    <div className="relative h-40 overflow-hidden bg-white/5">
                      {project.imageUrl && (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      )}
                      {project.featured && <div className="absolute top-2 left-2 bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">Featured</div>}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-primary font-mono mb-1 uppercase tracking-wider">{project.category}</div>
                      <h3 className="font-bold mb-1">{project.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map((t: string) => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">{t}</span>)}
                        {project.technologies.length > 3 && <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground">+{project.technologies.length - 3}</span>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingProject(project); setPortfolioMode("edit"); }} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"><Pencil size={12} /> Edit</button>
                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"><ExternalLink size={12} /> Visit</a>}
                        <button onClick={() => handleDeletePortfolio(project.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-destructive/40 hover:text-destructive transition-colors ml-auto"><Trash2 size={12} /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Client Testimonials <span className="text-muted-foreground text-sm font-normal">({testimonialsData?.length ?? 0})</span></h2>
              <div className="flex gap-2">
                <button onClick={() => refetchTestimonials()} className="p-2 rounded-xl border border-border hover:border-primary/40 text-muted-foreground hover:text-white transition-colors"><RefreshCw size={16} /></button>
                {testimonialMode === "list" && (
                  <Button onClick={() => { setTestimonialMode("add"); setEditingTestimonial(null); }} className="rounded-xl">
                    <Plus size={16} className="mr-1" /> Add Review
                  </Button>
                )}
              </div>
            </div>
            {testimonialMode !== "list" && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">{testimonialMode === "add" ? "Add New Review" : "Edit Review"}</h3>
                <TestimonialForm
                  initial={editingTestimonial ? {
                    name: editingTestimonial.name, role: editingTestimonial.role,
                    company: editingTestimonial.company, content: editingTestimonial.content,
                    rating: editingTestimonial.rating, avatarUrl: editingTestimonial.avatarUrl ?? "",
                  } : undefined}
                  onSave={handleSaveTestimonial}
                  onCancel={() => { setTestimonialMode("list"); setEditingTestimonial(null); }}
                  loading={createTestimonial.isPending || updateTestimonial.isPending}
                />
              </div>
            )}
            {testimonialsLoading ? (
              <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse h-32" />)}</div>
            ) : (
              <div className="space-y-4">
                {(testimonialsData ?? []).map((t: Testimonial) => (
                  <div key={t.id} className="bg-card border border-border rounded-2xl p-6 flex gap-4">
                    <div className="shrink-0">
                      {t.avatarUrl
                        ? <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                        : <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">{t.name.charAt(0)}</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold">{t.name}</span>
                        <span className="text-sm text-muted-foreground">{t.role} @ {t.company}</span>
                        <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-primary fill-primary" />)}</div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{t.content}"</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditingTestimonial(t); setTestimonialMode("edit"); }} className="p-2 rounded-xl border border-border hover:border-primary/40 hover:text-primary transition-colors text-muted-foreground"><Pencil size={15} /></button>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 rounded-xl border border-border hover:border-destructive/40 hover:text-destructive transition-colors text-muted-foreground"><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Site Settings</h2>
                <p className="text-sm text-muted-foreground">Changes go live on the website immediately after saving.</p>
              </div>
              {settingsDirty && (
                <Button onClick={handleSaveSettings} disabled={updateSettings.isPending} className="rounded-xl shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  {updateSettings.isPending
                    ? <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />Saving...</span>
                    : <><Save size={16} className="mr-1.5" />Save All Changes</>}
                </Button>
              )}
            </div>
            <div className="space-y-8">
              {/* ── Theme Color Picker ── */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-1 text-primary">Theme &amp; Brand Color</h3>
                <p className="text-xs text-muted-foreground mb-5">Pick an accent color — it applies site-wide instantly after saving.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEME_PRESETS.map((preset) => {
                    const active =
                      settingsForm["primary_color_h"] === preset.h &&
                      settingsForm["primary_color_s"] === preset.s &&
                      String(settingsForm["primary_color_l"]) === String(preset.l);
                    return (
                      <button
                        key={preset.hex}
                        type="button"
                        onClick={() => {
                          setSetting("primary_color_h", preset.h);
                          setSetting("primary_color_s", preset.s);
                          setSetting("primary_color_l", String(preset.l));
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left ${
                          active
                            ? "border-foreground bg-foreground/5 shadow-lg"
                            : "border-border hover:border-foreground/40 bg-background"
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shrink-0 border border-white/20"
                          style={{ background: preset.hex, boxShadow: active ? `0 0 10px ${preset.hex}88` : undefined }}
                        />
                        <span className="text-xs font-medium leading-tight">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Custom HSL:</span>
                  <input
                    type="number" min={0} max={360}
                    value={settingsForm["primary_color_h"] ?? "152"}
                    onChange={(e) => setSetting("primary_color_h", e.target.value)}
                    placeholder="H"
                    className="w-20 bg-background border border-border rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary/60"
                  />
                  <input
                    type="number" min={0} max={100}
                    value={settingsForm["primary_color_s"] ?? "100"}
                    onChange={(e) => setSetting("primary_color_s", e.target.value)}
                    placeholder="S%"
                    className="w-20 bg-background border border-border rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary/60"
                  />
                  <input
                    type="number" min={0} max={100}
                    value={settingsForm["primary_color_l"] ?? "50"}
                    onChange={(e) => setSetting("primary_color_l", e.target.value)}
                    placeholder="L%"
                    className="w-20 bg-background border border-border rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:border-primary/60"
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-white/20 shrink-0"
                    style={{
                      background: `hsl(${settingsForm["primary_color_h"] ?? 152} ${settingsForm["primary_color_s"] ?? 100}% ${settingsForm["primary_color_l"] ?? 50}%)`,
                    }}
                  />
                </div>
              </div>
              {SETTINGS_FIELDS.map((group) => (
                <div key={group.group} className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-5 text-primary">{group.group}</h3>
                  <div className="space-y-4">
                    {group.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                        {field.key === "about_founder_photo" ? (
                          <div className="space-y-2">
                            <input value={settingsForm[field.key] ?? ""} onChange={(e) => setSetting(field.key, e.target.value)} placeholder="Paste an image URL or use /growweb-logo.jpg" className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/60" />
                            {settingsForm[field.key] && (
                              <div className="flex items-center gap-3">
                                <img src={settingsForm[field.key]} alt="Preview" className="w-20 h-20 rounded-xl object-cover border border-border" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                                <p className="text-xs text-muted-foreground">Tip: paste any public image URL from the web</p>
                              </div>
                            )}
                          </div>
                        ) : field.multiline ? (
                          <textarea value={settingsForm[field.key] ?? ""} onChange={(e) => setSetting(field.key, e.target.value)} rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/60 resize-none" />
                        ) : (
                          <input value={settingsForm[field.key] ?? ""} onChange={(e) => setSetting(field.key, e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/60" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                {settingsDirty ? (
                  <Button onClick={handleSaveSettings} disabled={updateSettings.isPending} size="lg" className="rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.4)]">
                    {updateSettings.isPending ? "Saving..." : <><Save size={18} className="mr-2" />Save All Changes</>}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary" /> All settings saved
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
