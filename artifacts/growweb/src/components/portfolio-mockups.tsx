import React from "react";

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0d0d0d", overflow: "hidden" }}>
      <div style={{ background: "#1c1c1e", padding: "6px 10px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #2a2a2a" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{ flex: 1, background: "#2c2c2e", borderRadius: 4, padding: "2px 10px", fontSize: 8, color: "#888", textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
          🔒 {url}
        </div>
      </div>
      <div style={{ position: "relative", overflow: "hidden", height: "calc(100% - 25px)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1100, height: 520, transform: "scale(0.33)", transformOrigin: "top left", pointerEvents: "none", userSelect: "none" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const T = { xs: 9, sm: 11, md: 14, lg: 18, xl: 24, xxl: 32, hero: 42 };
const nav = (bg: string, text: string, logo: string, links: string[], accent: string) => (
  <div style={{ background: bg, padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${accent}22` }}>
    <span style={{ color: accent, fontWeight: 800, fontSize: T.lg, letterSpacing: 1 }}>{logo}</span>
    <div style={{ display: "flex", gap: 20 }}>
      {links.map((l) => <span key={l} style={{ color: text, fontSize: T.sm, opacity: 0.8 }}>{l}</span>)}
    </div>
    <div style={{ background: accent, color: "#000", fontSize: T.xs, fontWeight: 700, padding: "6px 14px", borderRadius: 20 }}>Contact</div>
  </div>
);

// 1 - Zaiqa Restaurant
export function ZaiqaMockup() {
  return (
    <BrowserChrome url="zaiqarestaurant.com">
      <div style={{ background: "#0f0500", height: "100%", fontFamily: "system-ui" }}>
        {nav("#1a0800", "#e5b97a", "🍽 ZAIQA", ["Home", "Menu", "Reservations", "Gallery"], "#f59e0b")}
        <div style={{ background: "linear-gradient(135deg,#1a0800 0%,#2d1200 100%)", padding: "36px 32px 28px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: 40, width: 140, height: 140, borderRadius: "50%", background: "#f59e0b18" }} />
          <div style={{ fontSize: 10, color: "#f59e0b", letterSpacing: 3, marginBottom: 10, textTransform: "uppercase" }}>Lahore's Finest Dining</div>
          <div style={{ fontSize: T.hero, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>Authentic Pakistani<br /><span style={{ color: "#f59e0b" }}>Cuisine &amp; BBQ</span></div>
          <div style={{ fontSize: T.md, color: "#e5b97a", opacity: 0.8, marginBottom: 22 }}>Experience the true taste of Lahore — crafted with love &amp; tradition since 2018</div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ background: "#f59e0b", color: "#000", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 25 }}>Reserve a Table</div>
            <div style={{ border: "1px solid #f59e0b66", color: "#f59e0b", fontSize: T.sm, fontWeight: 600, padding: "10px 22px", borderRadius: 25 }}>View Full Menu</div>
          </div>
        </div>
        <div style={{ padding: "22px 32px", background: "#0f0500" }}>
          <div style={{ fontSize: T.md, fontWeight: 700, color: "#e5b97a", marginBottom: 14 }}>Our Signature Dishes</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {[["Biryani", "PKR 550", "#2d1200"], ["Karahi", "PKR 750", "#1a1000"], ["BBQ Platter", "PKR 1,200", "#200800"], ["Nihari", "PKR 480", "#150500"]].map(([name, price, bg]) => (
              <div key={name} style={{ background: bg, borderRadius: 8, padding: "12px 10px", border: "1px solid #f59e0b22" }}>
                <div style={{ width: "100%", height: 50, background: `linear-gradient(135deg,#f59e0b22,#8b4a0022)`, borderRadius: 6, marginBottom: 8 }} />
                <div style={{ fontSize: T.sm, color: "#fff", fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: T.xs, color: "#f59e0b" }}>{price}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "16px 32px", background: "#f59e0b14", borderTop: "1px solid #f59e0b22" }}>
          {[["⭐ 4.9", "Rating"], ["🍽 50+", "Menu Items"], ["📍 3", "Branches"], ["🕐 10AM–12AM", "Hours"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.md, color: "#f59e0b", fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: 8, color: "#e5b97a88" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 2 - Al-Noor Bakery
export function AlNoorMockup() {
  return (
    <BrowserChrome url="alnoor-bakery.com">
      <div style={{ background: "#fdf4e7", height: "100%", fontFamily: "Georgia, serif" }}>
        {nav("#fff8f0", "#5c3317", "🥐 AL-NOOR BAKERY", ["Home", "Products", "Order", "About"], "#c2793b")}
        <div style={{ background: "linear-gradient(135deg,#c2793b,#8b4513)", padding: "32px 32px 24px" }}>
          <div style={{ fontSize: T.xs, color: "#ffe4b5", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Freshly Baked Every Morning</div>
          <div style={{ fontSize: T.xxl, fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>Taste the Sweetness<br />of Tradition</div>
          <div style={{ fontSize: T.md, color: "#ffe4c4", marginBottom: 20 }}>Artisan breads, pastries &amp; custom cakes made with love in Lahore</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: "#fff", color: "#c2793b", fontSize: T.sm, fontWeight: 700, padding: "9px 20px", borderRadius: 20 }}>Order on WhatsApp</div>
            <div style={{ border: "1px solid #ffffff88", color: "#fff", fontSize: T.sm, padding: "9px 20px", borderRadius: 20 }}>Our Menu</div>
          </div>
        </div>
        <div style={{ padding: "20px 32px", background: "#fdf4e7" }}>
          <div style={{ fontSize: T.md, fontWeight: 700, color: "#5c3317", marginBottom: 14 }}>Fresh Today's Specials</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[["Croissant", "PKR 120", "#f5e6d3"], ["Cake Slice", "PKR 280", "#fde8d8"], ["Sourdough", "PKR 350", "#f0d9c0"], ["Brownie", "PKR 150", "#e8ccb0"]].map(([n, p, bg]) => (
              <div key={n} style={{ background: bg, borderRadius: 8, padding: 10, textAlign: "center", border: "1px solid #c2793b22" }}>
                <div style={{ height: 44, background: `linear-gradient(135deg,#c2793b33,#8b451344)`, borderRadius: 6, marginBottom: 8 }} />
                <div style={{ fontSize: T.sm, color: "#5c3317", fontWeight: 600 }}>{n}</div>
                <div style={{ fontSize: T.xs, color: "#c2793b", fontWeight: 700 }}>{p}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#c2793b", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontSize: T.md, fontWeight: 600 }}>🎂 Custom Cake Orders — Place 3 days in advance</span>
          <div style={{ background: "#fff", color: "#c2793b", fontSize: T.xs, fontWeight: 700, padding: "6px 14px", borderRadius: 20 }}>Order Now</div>
        </div>
      </div>
    </BrowserChrome>
  );
}

// 3 - Bright Future Academy
export function BrightFutureMockup() {
  return (
    <BrowserChrome url="brightfutureacademy.edu.pk">
      <div style={{ background: "#f0f4ff", height: "100%", fontFamily: "system-ui" }}>
        {nav("#1e3a8a", "#e8f0fe", "🎓 BRIGHT FUTURE ACADEMY", ["Home", "Admissions", "Academics", "Parents"], "#60a5fa")}
        <div style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1e40af 60%,#1d4ed8 100%)", padding: "32px 32px 24px" }}>
          <div style={{ display: "inline-block", background: "#f59e0b", color: "#000", fontSize: T.xs, fontWeight: 700, padding: "4px 12px", borderRadius: 12, marginBottom: 12 }}>📢 Admissions Open 2025–26</div>
          <div style={{ fontSize: T.xxl + 4, fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 10 }}>Shaping Tomorrow's<br /><span style={{ color: "#60a5fa" }}>Leaders Today</span></div>
          <div style={{ fontSize: T.md, color: "#bfdbfe", marginBottom: 20 }}>Cambridge Curriculum · Grades 1–12 · DHA Lahore</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: "#f59e0b", color: "#000", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22 }}>Apply Online Now</div>
            <div style={{ border: "1px solid #60a5fa66", color: "#93c5fd", fontSize: T.sm, padding: "10px 22px", borderRadius: 22 }}>Virtual Tour</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, padding: "18px 32px", background: "#fff", borderBottom: "1px solid #e0e7ff" }}>
          {[["450+", "Students"], ["98%", "Pass Rate"], ["30+", "Teachers"], ["15+", "Years"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center", padding: "12px 8px", background: "#f0f4ff", borderRadius: 10 }}>
              <div style={{ fontSize: T.xxl, fontWeight: 800, color: "#1e3a8a" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#64748b" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 32px", background: "#f0f4ff" }}>
          <div style={{ fontSize: T.md, fontWeight: 700, color: "#1e3a8a", marginBottom: 12 }}>Our Programs</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["📚 O-Levels", "#1e3a8a22"], ["🔬 Sciences", "#06449922"], ["🎨 Arts", "#7c3aed22"]].map(([n, bg]) => (
              <div key={n} style={{ background: bg, borderRadius: 8, padding: "12px 14px", border: "1px solid #1e3a8a22", fontSize: T.sm, color: "#1e3a8a", fontWeight: 600 }}>{n}</div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

// 4 - Little Stars Nursery
export function LittleStarsMockup() {
  return (
    <BrowserChrome url="littlestarsnursery.pk">
      <div style={{ background: "#fff7ed", height: "100%", fontFamily: "system-ui" }}>
        {nav("#fff", "#333", "⭐ LITTLE STARS", ["Home", "Programs", "Gallery", "Enroll"], "#f97316")}
        <div style={{ background: "linear-gradient(135deg,#fde68a 0%,#fca5a5 50%,#a5f3fc 100%)", padding: "28px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 10, right: 30, width: 70, height: 70, borderRadius: "50%", background: "#fef3c7", opacity: 0.7 }} />
          <div style={{ position: "absolute", bottom: -10, left: 20, width: 50, height: 50, borderRadius: "50%", background: "#fca5a5", opacity: 0.5 }} />
          <div style={{ fontSize: T.xs, color: "#7c3aed", fontWeight: 700, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>Ages 1.5 – 5 Years</div>
          <div style={{ fontSize: T.hero, fontWeight: 900, color: "#1c1917", lineHeight: 1.1, marginBottom: 12 }}>Where Learning<br /><span style={{ color: "#f97316" }}>Feels Like Play!</span></div>
          <div style={{ fontSize: T.md, color: "#44403c", marginBottom: 20 }}>A safe, nurturing environment where little minds bloom 🌸</div>
          <div style={{ background: "#f97316", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 24px", borderRadius: 25, display: "inline-block" }}>Enroll Your Child Today</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "16px 32px", background: "#fff" }}>
          {[["🎨 Art", "#fde68a"], ["📖 Stories", "#a5f3fc"], ["🎵 Music", "#fca5a5"], ["🧩 Games", "#d9f99d"]].map(([n, bg]) => (
            <div key={n} style={{ background: bg, borderRadius: 12, padding: "14px 8px", textAlign: "center", fontSize: T.md, fontWeight: 700, color: "#1c1917" }}>{n}</div>
          ))}
        </div>
        <div style={{ padding: "14px 32px", background: "#fff7ed", display: "flex", justifyContent: "space-around" }}>
          {[["120+", "Happy Kids"], ["98%", "Parent Satisfaction"], ["10+", "Qualified Teachers"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.lg, fontWeight: 800, color: "#f97316" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#78716c" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 5 - Al-Shifa Clinic
export function AlShifaMockup() {
  return (
    <BrowserChrome url="alshifa-clinic.pk">
      <div style={{ background: "#f0fdfa", height: "100%", fontFamily: "system-ui" }}>
        {nav("#0f766e", "#fff", "🏥 AL-SHIFA MEDICAL", ["Home", "Doctors", "Services", "Appointments"], "#5eead4")}
        <div style={{ background: "linear-gradient(135deg,#0f766e,#0d9488)", padding: "28px 32px 22px" }}>
          <div style={{ fontSize: T.xs, color: "#ccfbf1", letterSpacing: 2, marginBottom: 8 }}>TRUSTED HEALTHCARE SINCE 2015</div>
          <div style={{ fontSize: T.hero, fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>Your Health,<br /><span style={{ color: "#5eead4" }}>Our Priority</span></div>
          <div style={{ fontSize: T.md, color: "#ccfbf1", marginBottom: 20 }}>15 specialist doctors · 24/7 emergency · Advanced diagnostics</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: "#fff", color: "#0f766e", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22 }}>📅 Book Appointment</div>
            <div style={{ border: "1px solid #5eead4", color: "#5eead4", fontSize: T.sm, padding: "10px 22px", borderRadius: 22 }}>Our Doctors</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "16px 32px", background: "#fff" }}>
          {[["Dr. Sarah Ahmed", "Cardiologist", "🫀"], ["Dr. Umar Malik", "Neurologist", "🧠"], ["Dr. Aisha Khan", "Pediatrician", "👶"]].map(([n, s, i]) => (
            <div key={n} style={{ background: "#f0fdfa", borderRadius: 10, padding: 12, border: "1px solid #5eead422", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0d9488", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{i}</div>
              <div style={{ fontSize: T.sm, fontWeight: 700, color: "#134e4a" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#0f766e" }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 32px", background: "#0f766e14" }}>
          {[["15+", "Specialists"], ["24/7", "Emergency"], ["50,000+", "Patients"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.lg, fontWeight: 800, color: "#0f766e" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#5f9ea0" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 6 - DentalCare Pro
export function DentalCareMockup() {
  return (
    <BrowserChrome url="dentalcarepro.pk">
      <div style={{ background: "#f8faff", height: "100%", fontFamily: "system-ui" }}>
        {nav("#fff", "#1e3a8a", "🦷 DENTALCARE PRO", ["Home", "Services", "Gallery", "Book"], "#2563eb")}
        <div style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", padding: "28px 32px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, alignItems: "center" }}>
          <div>
            <div style={{ background: "#2563eb", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "4px 12px", borderRadius: 12, display: "inline-block", marginBottom: 10 }}>✨ Premium Dental Care</div>
            <div style={{ fontSize: T.xxl + 4, fontWeight: 900, color: "#1e3a8a", lineHeight: 1.15, marginBottom: 10 }}>Your Perfect<br /><span style={{ color: "#2563eb" }}>Smile Starts Here</span></div>
            <div style={{ fontSize: T.md, color: "#3b82f6", marginBottom: 18 }}>Advanced treatments · Pain-free procedures · Affordable pricing</div>
            <div style={{ background: "#2563eb", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22, display: "inline-block" }}>Book Free Consultation</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 14, boxShadow: "0 4px 20px #2563eb22", border: "1px solid #bfdbfe" }}>
            <div style={{ fontSize: T.sm, fontWeight: 700, color: "#1e3a8a", marginBottom: 10 }}>Quick Appointment</div>
            {["Your Name", "Phone Number", "Select Service"].map((p) => (
              <div key={p} style={{ background: "#f0f6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "8px 12px", marginBottom: 8, fontSize: T.xs, color: "#93c5fd" }}>{p}</div>
            ))}
            <div style={{ background: "#2563eb", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "9px 0", borderRadius: 8, textAlign: "center" }}>Confirm Booking</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, padding: "14px 32px", background: "#fff" }}>
          {[["Teeth Whitening", "#dbeafe", "⚡"], ["Braces", "#ede9fe", "🦷"], ["Root Canal", "#fce7f3", "🛡"], ["Veneers", "#dcfce7", "✨"]].map(([n, bg, icon]) => (
            <div key={n} style={{ background: bg, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontSize: T.sm, fontWeight: 600, color: "#1e3a8a" }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 7 - DesiMart Fashion
export function DesiMartMockup() {
  return (
    <BrowserChrome url="desimart.pk">
      <div style={{ background: "#0a0a0a", height: "100%", fontFamily: "system-ui" }}>
        {nav("#111", "#fff", "✦ DESIMART", ["New Arrivals", "Women", "Men", "Sale"], "#ec4899")}
        <div style={{ background: "linear-gradient(135deg,#1a0011,#2d0020)", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ background: "#ec4899", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "4px 10px", borderRadius: 8, display: "inline-block", marginBottom: 10 }}>🔥 SUMMER SALE — Up to 50% OFF</div>
            <div style={{ fontSize: T.xxl + 6, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>Pakistani Fashion<br /><span style={{ color: "#ec4899" }}>Redefined</span></div>
            <div style={{ fontSize: T.md, color: "#f9a8d4", marginBottom: 18 }}>Premium lawn, chiffon &amp; embroidered collections</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ background: "#ec4899", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22 }}>Shop Now</div>
              <div style={{ border: "1px solid #ec489966", color: "#ec4899", fontSize: T.sm, padding: "10px 22px", borderRadius: 22 }}>New Arrivals</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["#f9a8d422", "Lawn Suit", "PKR 4,500"], ["#ec489922", "Chiffon", "PKR 6,800"]].map(([bg, n, p]) => (
              <div key={n} style={{ background: bg, borderRadius: 12, padding: 10, width: 100, border: "1px solid #ec489933" }}>
                <div style={{ height: 80, background: `linear-gradient(135deg,${bg},#ec489944)`, borderRadius: 8, marginBottom: 8 }} />
                <div style={{ fontSize: T.xs, color: "#fff", fontWeight: 600 }}>{n}</div>
                <div style={{ fontSize: T.xs, color: "#ec4899", fontWeight: 700 }}>{p}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 32px", background: "#111" }}>
          <div style={{ fontSize: T.sm, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Best Sellers</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {[["#1a0011", "Suit", "PKR 3,200"], ["#150019", "Dupatta", "PKR 1,800"], ["#0a0a14", "Kurta", "PKR 2,500"], ["#1a000f", "Shawl", "PKR 2,100"], ["#14000c", "Lawn", "PKR 4,200"]].map(([bg, n, p]) => (
              <div key={n} style={{ background: bg, borderRadius: 8, overflow: "hidden", border: "1px solid #ec489922" }}>
                <div style={{ height: 55, background: `linear-gradient(135deg,#ec489914,#ff00ff08)` }} />
                <div style={{ padding: "6px 8px" }}>
                  <div style={{ fontSize: 8, color: "#e2e8f0" }}>{n}</div>
                  <div style={{ fontSize: 8, color: "#ec4899", fontWeight: 700 }}>{p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 32px", background: "#ec489914", borderTop: "1px solid #ec489933" }}>
          {[["Free Delivery", "Orders PKR 3k+"], ["Cash on Delivery", "Available nationwide"], ["Easy Returns", "7-day policy"]].map(([t, s]) => (
            <div key={t} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.xs, color: "#ec4899", fontWeight: 700 }}>{t}</div>
              <div style={{ fontSize: 8, color: "#f9a8d4" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 8 - TechGadgets Store
export function TechGadgetsMockup() {
  return (
    <BrowserChrome url="techgadgets.pk">
      <div style={{ background: "#111827", height: "100%", fontFamily: "system-ui" }}>
        {nav("#1f2937", "#e5e7eb", "⚡ TECHGADGETS", ["Mobiles", "Laptops", "Audio", "Compare"], "#f97316")}
        <div style={{ background: "linear-gradient(135deg,#1f2937,#111827)", padding: "22px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ background: "#f97316", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "4px 12px", borderRadius: 8, display: "inline-block", marginBottom: 10 }}>NEW ARRIVALS IN STOCK</div>
            <div style={{ fontSize: T.hero, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>Tech That<br /><span style={{ color: "#f97316" }}>Performs</span></div>
            <div style={{ fontSize: T.md, color: "#9ca3af", marginBottom: 18 }}>Latest smartphones, laptops &amp; accessories with warranty</div>
            <div style={{ background: "#f97316", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22, display: "inline-block" }}>Shop Now</div>
          </div>
          <div style={{ background: "#1f2937", borderRadius: 16, padding: 14, border: "1px solid #f9731633", width: 180 }}>
            <div style={{ height: 100, background: "linear-gradient(135deg,#f9731622,#f9731611)", borderRadius: 10, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>📱</div>
            <div style={{ fontSize: T.sm, color: "#fff", fontWeight: 700 }}>iPhone 15 Pro</div>
            <div style={{ fontSize: T.xs, color: "#9ca3af" }}>Latest Model</div>
            <div style={{ fontSize: T.md, color: "#f97316", fontWeight: 800 }}>PKR 299,000</div>
          </div>
        </div>
        <div style={{ padding: "14px 32px", background: "#1f2937" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {[["📱 Mobiles", "#f9731618"], ["💻 Laptops", "#3b82f618"], ["🎧 Audio", "#8b5cf618"], ["⌚ Wearables", "#10b98118"], ["🖥 Desktops", "#ec489918"]].map(([n, bg]) => (
              <div key={n} style={{ background: bg, borderRadius: 8, padding: "12px 8px", textAlign: "center", fontSize: T.sm, color: "#e5e7eb", fontWeight: 600 }}>{n}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, padding: "12px 32px", background: "#111827" }}>
          {[["Samsung S24", "PKR 189,000", "#1f2937"], ["MacBook Air", "PKR 348,000", "#1a2435"]].map(([n, p, bg]) => (
            <div key={n} style={{ background: bg, borderRadius: 10, padding: 12, flex: 1, border: "1px solid #f9731622" }}>
              <div style={{ height: 40, background: "linear-gradient(135deg,#f9731614,#00000011)", borderRadius: 6, marginBottom: 8 }} />
              <div style={{ fontSize: T.xs, color: "#e5e7eb", fontWeight: 600 }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#f97316", fontWeight: 700 }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 9 - Prime Properties
export function PrimePropertiesMockup() {
  return (
    <BrowserChrome url="primeproperties.pk">
      <div style={{ background: "#f8fafc", height: "100%", fontFamily: "system-ui" }}>
        {nav("#fff", "#1e293b", "🏢 PRIME PROPERTIES", ["Buy", "Rent", "Projects", "Agents"], "#1d4ed8")}
        <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a8a)", padding: "26px 32px" }}>
          <div style={{ fontSize: T.xs, color: "#93c5fd", letterSpacing: 2, marginBottom: 8 }}>LAHORE'S TRUSTED REAL ESTATE</div>
          <div style={{ fontSize: T.hero, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>Find Your<br /><span style={{ color: "#60a5fa" }}>Dream Property</span></div>
          <div style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "center" }}>
            <div style={{ background: "#f1f5f9", borderRadius: 8, padding: "8px 12px", fontSize: T.xs, color: "#94a3b8" }}>📍 Location</div>
            <div style={{ background: "#f1f5f9", borderRadius: 8, padding: "8px 12px", fontSize: T.xs, color: "#94a3b8" }}>🏠 Type</div>
            <div style={{ background: "#f1f5f9", borderRadius: 8, padding: "8px 12px", fontSize: T.xs, color: "#94a3b8" }}>💰 Budget</div>
            <div style={{ background: "#1d4ed8", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "8px 16px", borderRadius: 8 }}>Search</div>
          </div>
        </div>
        <div style={{ padding: "14px 32px", background: "#f8fafc" }}>
          <div style={{ fontSize: T.sm, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Featured Properties</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["DHA Phase 5 Villa", "PKR 3.5 Cr", "5 Bed · 4 Bath", "#dbeafe"], ["Bahria Town Apt", "PKR 1.2 Cr", "3 Bed · 2 Bath", "#ede9fe"], ["Gulberg Office", "PKR 85 Lac", "Commercial", "#dcfce7"]].map(([n, p, d, bg]) => (
              <div key={n} style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <div style={{ height: 55, background: `linear-gradient(135deg,${bg},#f0f9ff)` }} />
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: T.xs, color: "#1d4ed8", fontWeight: 700, marginBottom: 2 }}>{p}</div>
                  <div style={{ fontSize: 8, color: "#1e293b", fontWeight: 600 }}>{n}</div>
                  <div style={{ fontSize: 8, color: "#94a3b8" }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

// 10 - DreamHome Interiors
export function DreamHomeMockup() {
  return (
    <BrowserChrome url="dreamhomeinteriors.pk">
      <div style={{ background: "#faf7f0", height: "100%", fontFamily: "Georgia, serif" }}>
        {nav("#fff", "#1c1917", "✦ DREAMHOME INTERIORS", ["Projects", "Services", "Process", "Contact"], "#d97706")}
        <div style={{ background: "linear-gradient(135deg,#1c1917,#292524)", padding: "28px 32px", display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: T.xs, color: "#d97706", letterSpacing: 3, marginBottom: 10, textTransform: "uppercase" }}>Luxury Interior Design</div>
            <div style={{ fontSize: T.hero, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>Spaces That<br /><span style={{ color: "#d97706", fontStyle: "italic" }}>Inspire</span></div>
            <div style={{ fontSize: T.md, color: "#a8a29e", marginBottom: 20 }}>Bespoke residential &amp; commercial interiors crafted for Lahore's elite</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ background: "#d97706", color: "#fff", fontSize: T.sm, fontWeight: 600, padding: "10px 22px", borderRadius: 0 }}>View Portfolio</div>
              <div style={{ border: "1px solid #d9770666", color: "#d97706", fontSize: T.sm, padding: "10px 22px" }}>Consultation</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: 200 }}>
            {["#c4a882", "#8b7355", "#d4b896", "#a07850"].map((bg, i) => (
              <div key={i} style={{ height: i < 2 ? 70 : 50, background: `linear-gradient(135deg,${bg},${bg}88)`, borderRadius: 4 }} />
            ))}
          </div>
        </div>
        <div style={{ padding: "16px 32px", background: "#faf7f0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {[["Living Rooms", "#f5ede0"], ["Kitchens", "#eee5d5"], ["Bedrooms", "#f0e8d8"], ["Offices", "#e8dfd0"]].map(([n, bg]) => (
              <div key={n} style={{ background: bg, borderRadius: 8, overflow: "hidden", border: "1px solid #d9770622" }}>
                <div style={{ height: 60, background: `linear-gradient(135deg,${bg},#c4a88255)` }} />
                <div style={{ padding: "8px 10px", fontSize: T.xs, color: "#1c1917", fontWeight: 600 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "14px 32px", background: "#1c191710", borderTop: "1px solid #d9770622" }}>
          {[["150+", "Projects"], ["8+", "Years"], ["100%", "Satisfaction"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.xxl, fontWeight: 800, color: "#d97706", fontStyle: "italic" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#78716c" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 11 - TechLaunch SaaS
export function TechLaunchMockup() {
  return (
    <BrowserChrome url="techlaunch.pk">
      <div style={{ background: "#0f172a", height: "100%", fontFamily: "system-ui" }}>
        {nav("#0f172a", "#e2e8f0", "🚀 TECHLAUNCH", ["Product", "Pricing", "Docs", "Blog"], "#8b5cf6")}
        <div style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#312e81 100%)", padding: "28px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 200, height: 200, borderRadius: "50%", background: "#8b5cf633" }} />
          <div style={{ fontSize: T.xs, color: "#a78bfa", letterSpacing: 2, marginBottom: 8 }}>🚀 NOW IN BETA — LIMITED ACCESS</div>
          <div style={{ fontSize: T.hero, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>Automate Your<br /><span style={{ color: "#a78bfa" }}>Business Growth</span></div>
          <div style={{ fontSize: T.md, color: "#94a3b8", marginBottom: 20 }}>The AI-powered platform that Pakistani startups use to scale faster</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: "#8b5cf6", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22 }}>Start Free Trial</div>
            <div style={{ border: "1px solid #8b5cf666", color: "#a78bfa", fontSize: T.sm, padding: "10px 22px", borderRadius: 22 }}>Watch Demo</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "16px 32px", background: "#0f172a" }}>
          {[["⚡ AI Automation", "Save 10+ hrs/week with smart workflows", "#8b5cf618"], ["📊 Analytics", "Real-time insights on every metric", "#3b82f618"], ["🔗 Integrations", "Connect 200+ business tools instantly", "#10b98118"]].map(([t, d, bg]) => (
            <div key={t} style={{ background: bg, borderRadius: 10, padding: 14, border: "1px solid #ffffff11" }}>
              <div style={{ fontSize: T.md, color: "#e2e8f0", fontWeight: 700, marginBottom: 6 }}>{t}</div>
              <div style={{ fontSize: T.xs, color: "#94a3b8" }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 32px", background: "#1e1b4b", display: "flex", justifyContent: "space-around" }}>
          {[["2,400+", "Waitlist"], ["PKR 15M", "Raised"], ["99.9%", "Uptime"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.xxl, fontWeight: 800, color: "#a78bfa" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#64748b" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 12 - FinTechPay
export function FinTechPayMockup() {
  return (
    <BrowserChrome url="fintechpay.pk">
      <div style={{ background: "#0a1628", height: "100%", fontFamily: "system-ui" }}>
        {nav("#0a1628", "#e2e8f0", "💳 FINTECHPAY", ["Solutions", "Developers", "Enterprise", "Pricing"], "#10b981")}
        <div style={{ background: "linear-gradient(135deg,#0a1628,#0d2137)", padding: "22px 32px", display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "#10b981", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "3px 10px", borderRadius: 8, display: "inline-block", marginBottom: 10 }}>🔐 RBI Regulated · PCI DSS Compliant</div>
            <div style={{ fontSize: T.xxl + 4, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>Pakistan's Fastest<br /><span style={{ color: "#10b981" }}>Payment Gateway</span></div>
            <div style={{ fontSize: T.md, color: "#94a3b8", marginBottom: 18 }}>Process payments in 2.3 seconds · JazzCash · Easypaisa · Cards</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ background: "#10b981", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 22 }}>Get API Keys</div>
              <div style={{ border: "1px solid #10b98166", color: "#10b981", fontSize: T.sm, padding: "10px 22px", borderRadius: 22 }}>View Docs</div>
            </div>
          </div>
          <div style={{ background: "#0d2137", borderRadius: 12, padding: 14, width: 220, border: "1px solid #10b98133" }}>
            <div style={{ fontSize: T.xs, color: "#94a3b8", marginBottom: 10 }}>Live Transactions</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60, marginBottom: 10 }}>
              {[30, 50, 40, 70, 55, 80, 65, 90, 75, 100].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 9 ? "#10b981" : "#10b98133", borderRadius: 2 }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: T.lg, fontWeight: 800, color: "#10b981" }}>₨2.4M</div><div style={{ fontSize: 8, color: "#64748b" }}>Today</div></div>
              <div><div style={{ fontSize: T.lg, fontWeight: 800, color: "#3b82f6" }}>12,847</div><div style={{ fontSize: 8, color: "#64748b" }}>Transactions</div></div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, padding: "12px 32px", background: "#0d2137" }}>
          {[["JazzCash", "✓ Active", "#10b98122"], ["Easypaisa", "✓ Active", "#3b82f622"], ["Bank Transfer", "✓ Active", "#8b5cf622"], ["Cards", "✓ Active", "#f59e0b22"]].map(([n, s, bg]) => (
            <div key={n} style={{ background: bg, borderRadius: 8, padding: "10px 12px", border: "1px solid #ffffff11" }}>
              <div style={{ fontSize: T.sm, color: "#e2e8f0", fontWeight: 600 }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#10b981" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 13 - Ameer Portfolio
export function AmeerPortfolioMockup() {
  return (
    <BrowserChrome url="ameer-hamza-cv.web.app">
      <div style={{ background: "#050505", height: "100%", fontFamily: "system-ui" }}>
        {nav("#050505", "#e2e8f0", "// AMEER.DEV", ["Work", "Skills", "Resume", "Contact"], "#00ff88")}
        <div style={{ background: "#050505", padding: "28px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "#00ff8812" }} />
          <div style={{ fontSize: T.xs, color: "#00ff88", letterSpacing: 3, marginBottom: 10, fontFamily: "monospace" }}>&gt; FULLSTACK DEVELOPER_</div>
          <div style={{ fontSize: T.hero + 4, fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>Hi, I'm<br /><span style={{ color: "#00ff88" }}>Ameer Hamza</span></div>
          <div style={{ fontSize: T.md, color: "#6b7280", marginBottom: 20 }}>Building digital experiences that matter — React, Node.js, TypeScript</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: "#00ff88", color: "#000", fontSize: T.sm, fontWeight: 800, padding: "10px 22px", borderRadius: 4, fontFamily: "monospace" }}>View Work →</div>
            <div style={{ border: "1px solid #00ff8855", color: "#00ff88", fontSize: T.sm, padding: "10px 22px", borderRadius: 4, fontFamily: "monospace" }}>Download CV</div>
          </div>
        </div>
        <div style={{ padding: "14px 32px", background: "#0a0a0a" }}>
          <div style={{ fontSize: T.xs, color: "#00ff88", fontFamily: "monospace", marginBottom: 10 }}>// projects.featured</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[["GROWWEB Agency", "#00ff8818"], ["Fintech App", "#3b82f618"], ["SaaS Platform", "#8b5cf618"]].map(([n, bg]) => (
              <div key={n} style={{ background: bg, borderRadius: 6, padding: "10px 12px", border: "1px solid #ffffff11" }}>
                <div style={{ height: 30, background: "#00ff8814", borderRadius: 4, marginBottom: 8 }} />
                <div style={{ fontSize: T.xs, color: "#e2e8f0", fontWeight: 600 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 32px", background: "#00ff8808", borderTop: "1px solid #00ff8822" }}>
          {[["React", "95%"], ["Node.js", "90%"], ["TypeScript", "88%"]].map(([n, p]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: T.xs, color: "#00ff88", fontWeight: 700, fontFamily: "monospace" }}>{n}</div>
              <div style={{ width: 60, height: 4, background: "#ffffff14", borderRadius: 2, marginTop: 4 }}>
                <div style={{ width: p, height: "100%", background: "#00ff88", borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserChrome>
  );
}

// 14 - DigitalBoost Agency
export function DigitalBoostMockup() {
  return (
    <BrowserChrome url="digitalboostmarketing.pk">
      <div style={{ background: "#09090b", height: "100%", fontFamily: "system-ui" }}>
        {nav("#09090b", "#fafafa", "📈 DIGITALBOOST", ["Services", "Case Studies", "Team", "Get Quote"], "#ef4444")}
        <div style={{ background: "linear-gradient(135deg,#09090b,#1c0a0a)", padding: "26px 32px" }}>
          <div style={{ display: "inline-block", background: "#ef4444", color: "#fff", fontSize: T.xs, fontWeight: 700, padding: "4px 12px", borderRadius: 4, marginBottom: 12 }}>🏆 300+ CAMPAIGNS · PKR 50M+ REVENUE GENERATED</div>
          <div style={{ fontSize: T.hero, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>Results That<br /><span style={{ color: "#ef4444" }}>Actually Matter</span></div>
          <div style={{ fontSize: T.md, color: "#71717a", marginBottom: 18 }}>Pakistan's most results-driven digital marketing agency</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ background: "#ef4444", color: "#fff", fontSize: T.sm, fontWeight: 700, padding: "10px 22px", borderRadius: 4 }}>Get Free Audit</div>
            <div style={{ border: "1px solid #ef444466", color: "#ef4444", fontSize: T.sm, padding: "10px 22px", borderRadius: 4 }}>View Case Studies</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#27272a" }}>
          {[["300%", "Avg ROI", "#09090b"], ["8 Enterprise", "Clients Signed", "#0c0c0f"], ["150+", "Campaigns", "#09090b"], ["PKR 50M+", "Revenue", "#0c0c0f"]].map(([n, l, bg]) => (
            <div key={l} style={{ background: bg, padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontSize: T.xxl, fontWeight: 900, color: "#ef4444" }}>{n}</div>
              <div style={{ fontSize: T.xs, color: "#71717a" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 32px", background: "#09090b" }}>
          <div style={{ fontSize: T.sm, fontWeight: 700, color: "#fafafa", marginBottom: 10 }}>Our Services</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[["📱 Social Media", "#ef444418"], ["🔍 Google Ads", "#3b82f618"], ["📧 Email Marketing", "#10b98118"]].map(([n, bg]) => (
              <div key={n} style={{ background: bg, borderRadius: 6, padding: "10px 12px", fontSize: T.xs, color: "#e4e4e7", fontWeight: 600 }}>{n}</div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

export function ProjectMockup({ id }: { id: number }) {
  switch (id) {
    case 1:  return <ZaiqaMockup />;
    case 2:  return <AlNoorMockup />;
    case 3:  return <BrightFutureMockup />;
    case 4:  return <LittleStarsMockup />;
    case 5:  return <AlShifaMockup />;
    case 6:  return <DentalCareMockup />;
    case 7:  return <DesiMartMockup />;
    case 8:  return <TechGadgetsMockup />;
    case 9:  return <PrimePropertiesMockup />;
    case 10: return <DreamHomeMockup />;
    case 11: return <TechLaunchMockup />;
    case 12: return <FinTechPayMockup />;
    case 13: return <AmeerPortfolioMockup />;
    case 14: return <DigitalBoostMockup />;
    default: return null;
  }
}
