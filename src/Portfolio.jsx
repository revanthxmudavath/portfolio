import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Cpu,
  Database,
  Server,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Briefcase,
  MapPin,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Utility ---
const cx = (...classes) => classes.filter(Boolean).join(" ");

// --- Design tokens: Modern–Retro palette ---
const palette = {
  bg: {
    base: "bg-[#0b0c10]",
    retro: "bg-[#0b0c10]",
  },
  text: {
    base: "text-[#e6f1ff]",
    dim: "text-[#9aa9bd]",
    accent: "text-[#f7d046]", // warm retro yellow
    neon: "text-[#66fcf1]", // teal neon
    pink: "text-[#ff6ec7]", // synthwave pink
  },
  glass: "backdrop-blur-md bg-white/5 border border-white/10",
};

// --- Content (from your resumes) ---
const PROFILE = {
  name: "Revanth Mudavath",
  title: "AI / Data / Software Engineer",
  blurb:
    "I build practical intelligent systems—multi-agent apps, scalable data pipelines, and robust backends—that reduce friction and give time back.",
  location: "Oregon State University · Corvallis, OR",
  phone: "+1 (458) 272-8380",
  email: "mudavatr@oregonstate.edu",
  linkedin: "https://www.linkedin.com/in/revanth-mudavath",
  github: "https://github.com/revanthxmudavath",
};

const TRACKS = [
  { key: "ai", label: "AI Engineer", icon: Cpu },
  { key: "data", label: "Data Engineer", icon: Database },
  { key: "se", label: "Software Engineer", icon: Server },
];

const EDUCATION = [
  {
    school: "Oregon State University",
    degree: "M.Eng. in Computer Science (GPA: 3.7)",
    time: "Sep 2024 – Dec 2026",
  },
  {
    school: "Vasavi College of Engineering (VCE)",
    degree: "B.E. in Computer Science (GPA: 3.3) · Best Project of 2024",
    time: "Sep 2020 – Jun 2024",
  },
];

const EXPERIENCE = [
  {
    company: "Zelis",
    role: "Software Engineer Intern",
    time: "Jan 2024 – Jun 2024 · Hyderabad",
    bullets: [
      "Built Salesforce workflows cutting manual input by 30% and lifting productivity by 15% across 3 departments.",
      "Shipped 5 interactive dashboards + 12 automated reports; sped up data‑driven decisions by ~40–50%.",
      "Added automated error checks to improve reporting accuracy across teams.",
    ],
  },
  {
    company: "Tata Consultancy Services",
    role: "Summer Intern",
    time: "Jun 2023 – Aug 2023 · Hyderabad",
    bullets: [
      "Developed and maintained a PowerApps mobile app; +40% user engagement.",
      "Optimized workflows with Power Automate; ~50% faster query executions and real‑time access to critical data.",
    ],
  },
];

const PROJECTS = [
  {
    title: "AI Travel Planner",
    url: "https://github.com/Skateslavasker/AI_Travel_Planner",
    tags: ["AI", "Agents", "LangChain", "FastAPI", "Streamlit", "Docker"],
    highlight:
      "Multi‑agent LLM system orchestrating Google Maps, Airbnb MCP, Calendar MCP, and AccuWeather to generate realistic itineraries.",
    impact:
      "Reduced hard‑coded logic by 50%+; portable demo via Streamlit + Docker.",
    track: ["ai", "se"],
  },
  {
    title: "Intelligent Pantry Chef",
    url: "https://github.com/Skateslavasker/Intelligent_Pantry_Chef",
    tags: ["AI", "Vision", "LangChain", "OAuth", "FastAPI", "Docker"],
    highlight:
      "Full‑stack recipe generator that turns ingredients or images into zero‑waste meals; modular pipelines for OCR → recipe → nutrition.",
    impact: "CI/CD with GitHub Actions; 70% lower deployment friction.",
    track: ["ai", "data", "se"],
  },
  {
    title: "YouTube Data Analysis",
    url: "https://github.com/Skateslavasker/youtube-data-analysis",
    tags: ["AWS", "Glue", "PySpark", "Athena", "QuickSight"],
    highlight:
      "Processed 200k+ records across 10 regions; uncovered content trends using an hourly ETL to S3 (raw → cleansed → analytics).",
    impact: "Delivered 5–7 interactive QuickSight dashboards for analytics.",
    track: ["data"],
  },
  {
    title: "SpeedScore (Mobile)",
    url: "https://www.speedscore.org",
    tags: ["React‑Native", "Redux", "TypeScript", "Node.js"],
    highlight:
      "Tournament creation flow matching web JSON schema; global modal + error handling; Buddies feature with live updates.",
    impact: "Reduced manual errors ~30%; fewer runtime failures via centralized feedback.",
    track: ["se"],
  },
  {
    title: "Microservices URL Shortener",
    url: "https://github.com/Skateslavasker/urlshort",
    tags: ["Express", "PostgreSQL", "Redis", "Docker"],
    highlight:
      "API gateway + services for shortening & redirection; SHA‑256 keys + Redis caching.",
    impact: "Cut DB queries by ~60%; modular deployment with Docker Compose.",
    track: ["se", "data"],
  },
];

const SKILLS = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "Java", "SQL"],
  },
  {
    label: "AI / ML",
    items: ["LangChain", "Agno", "CrewAI", "OpenAI", "PyTorch", "TensorFlow"],
  },
  {
    label: "Data & Cloud",
    items: ["PySpark", "AWS Glue", "Lambda", "S3", "Athena", "QuickSight", "PostgreSQL", "Redis"],
  },
  {
    label: "Web & Backend",
    items: ["FastAPI", "Express", "Node.js", "REST", "OAuth/JWT", "React‑Native", "Streamlit"],
  },
  {
    label: "DevOps",
    items: ["Docker", "GitHub Actions", "CI/CD"],
  },
];

// --- Retro background ---
const RetroBackdrop = () => (
  <div className="pointer-events-none fixed inset-0 -z-10">
    {/* grid */}
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(102,252,241,0.10)_1px,transparent_1px)] [background-size:14px_14px]" />
    {/* gradient horizon */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1f2833] via-transparent to-transparent" />
    {/* scanlines */}
    <div className="absolute inset-0 mix-blend-overlay opacity-10 bg-[repeating-linear-gradient(180deg,transparent,transparent_2px,rgba(255,255,255,0.05)_3px,transparent_4px)]" />
  </div>
);

// --- Badge ---
const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs text-white/90 bg-white/5">
    {children}
  </span>
);

// --- Section wrapper ---
const Section = ({ id, title, icon, children }) => (
  <section id={id} className="scroll-mt-28">
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{title}</h2>
      </div>
      <div className="grid gap-6">{children}</div>
    </div>
  </section>
);

// --- Navbar ---
const Nav = ({ active, setActive }) => {
  const items = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div className={cx("fixed top-4 left-1/2 -translate-x-1/2 z-50", palette.glass, "rounded-2xl shadow-lg")}> 
      <nav className="flex items-center gap-1 px-2 py-2">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => {
              e.preventDefault();
              setActive(it.id);
              const el = document.getElementById(it.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={cx(
              "px-3 md:px-4 py-2 rounded-xl text-sm transition",
              active === it.id ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10"
            )}
          >
            {it.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

// --- Hero with story hook ---
const Hero = ({ track, setTrack }) => {
  return (
    <header id="home" className="pt-28 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4 text-[#66fcf1]">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm tracking-widest uppercase">Modern–Retro Portfolio</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Hi, I’m <span className="text-[#66fcf1]">{PROFILE.name}</span> — I turn messy, real‑world problems into <span className="text-[#f7d046]">ship‑ready systems</span>.
            </h1>
            <p className="mt-5 text-white/80 leading-relaxed">
              My story isn’t about chasing buzzwords. It’s about building things that <em>actually help</em> people: agents that plan your week,
              pipelines that unlock insight, backends that never blink. From OSU’s labs to internships in Hyderabad, I’ve obsessed over one idea —
              <strong>software should give you time back</strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {TRACKS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTrack(key)}
                  className={cx(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition",
                    track === key
                      ? "bg-[#66fcf1]/10 border-[#66fcf1]/40 text-[#66fcf1]"
                      : "border-white/15 text-white/80 hover:bg-white/10"
                  )}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-white/80 hover:bg-white/10"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-white/80 hover:bg-white/10"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-white/80 hover:bg-white/10"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
              <Badge>Based at {PROFILE.location}</Badge>
              <Badge>Phone {PROFILE.phone}</Badge>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className={cx("relative rounded-3xl p-6 md:p-8", palette.glass)}>
              <div className="absolute -top-6 -right-6 rotate-12 text-[#ff6ec7] text-xs tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                RETRO MODE
              </div>
              <div className="text-sm text-white/80">Current Focus</div>
              <div className="mt-2 text-2xl font-bold text-white">{TRACKS.find((t) => t.key === track)?.label}</div>
              <div className="mt-4 text-white/70 leading-relaxed">
                {track === "ai" && <p>Multi‑agent systems, context‑aware tools, and RAG pipelines that orchestrate maps, calendars, and weather to act end‑to‑end.</p>}
                {track === "data" && <p>PySpark + AWS data stacks that stream/transform, model, and visualize at scale — with clean layers and automated checks.</p>}
                {track === "se" && <p>Strong backends and mobile UX — expressive APIs, resilient caching, and error systems that make apps feel instant.</p>}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  "LangChain · Agents",
                  "FastAPI · Node",
                  "PySpark · AWS",
                  "Docker · CI/CD",
                  "Postgres · Redis",
                  "React‑Native",
                ].map((t) => (
                  <div
                    key={t}
                    className="text-xs text-white/75 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

// --- Experience Cards ---
const ExperienceSection = () => (
  <Section id="experience" title="Experience" icon={<Briefcase className="w-6 h-6 text-[#f7d046]" />}> 
    <div className="grid md:grid-cols-2 gap-6">
      {EXPERIENCE.map((e) => (
        <div key={e.company} className={cx("rounded-3xl p-6", palette.glass)}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{e.role}</h3>
              <div className="text-white/70">{e.company}</div>
            </div>
            <Badge>{e.time}</Badge>
          </div>
          <ul className="mt-4 list-disc pl-5 text-white/80 space-y-2">
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

// --- Projects Gallery ---
const ProjectsSection = ({ filter }) => {
  const list = useMemo(() => PROJECTS.filter((p) => p.track.includes(filter)), [filter]);
  return (
    <Section id="projects" title="Featured Projects" icon={<Cpu className="w-6 h-6 text-[#66fcf1]" />}> 
      <div className="grid md:grid-cols-2 gap-6">
        {list.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className={cx(
              "group rounded-3xl p-6 transition",
              palette.glass,
              "hover:bg-white/[0.08]"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#66fcf1] transition">
                {p.title}
              </h3>
              <ExternalLink className="w-4 h-4 text-white/60" />
            </div>
            <p className="mt-2 text-white/80">{p.highlight}</p>
            <p className="mt-2 text-white/60 text-sm">{p.impact}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

// --- Skills ---
const SkillsSection = () => (
  <Section id="skills" title="Skills" icon={<Server className="w-6 h-6 text-[#ff6ec7]" />}> 
    <div className="grid md:grid-cols-3 gap-6">
      {SKILLS.map((s) => (
        <div key={s.label} className={cx("rounded-3xl p-6", palette.glass)}>
          <h3 className="text-white font-semibold mb-3">{s.label}</h3>
          <div className="flex flex-wrap gap-2">
            {s.items.map((i) => (
              <Badge key={i}>{i}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

// --- Education ---
const EducationSection = () => (
  <Section id="education" title="Education" icon={<GraduationCap className="w-6 h-6 text-[#f7d046]" />}> 
    <div className="grid md:grid-cols-2 gap-6">
      {EDUCATION.map((ed) => (
        <div key={ed.school} className={cx("rounded-3xl p-6", palette.glass)}>
          <h3 className="text-white font-semibold">{ed.school}</h3>
          <div className="text-white/80">{ed.degree}</div>
          <div className="mt-2">
            <Badge>{ed.time}</Badge>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

// --- Contact ---
const ContactSection = () => (
  <Section id="contact" title="Contact" icon={<Mail className="w-6 h-6 text-[#66fcf1]" />}> 
    <div className={cx("rounded-3xl p-6", palette.glass)}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-semibold">Let’s build something useful.</h3>
          <p className="mt-2 text-white/80">Open to AI, Data, and Software roles, internships, and collaborations.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-white/90 hover:bg-white/10"
            >
              <Mail className="w-4 h-4" /> {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-white/90 hover:bg-white/10"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-white/90 hover:bg-white/10"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
        <div className="grid gap-3 content-start">
          <div className="text-white/80">
            <MapPin className="inline w-4 h-4 mr-2" /> Corvallis, Oregon
          </div>
          <div className="text-white/80">
            <Phone className="inline w-4 h-4 mr-2" /> {PROFILE.phone}
          </div>
          <div className="pt-2">
            <a
              href="https://www.linkedin.com/in/revanth-mudavath"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-white/90 hover:bg-white/10"
            >
              <Download className="w-4 h-4" /> View Resume (LinkedIn)
            </a>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// --- Footer ---
const Footer = () => (
  <footer className="py-10">
    <div className="max-w-6xl mx-auto px-4 md:px-6 text-center text-white/60">
      © {new Date().getFullYear()} {PROFILE.name}. Crafted with a modern‑retro vibe.
    </div>
  </footer>
);

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [track, setTrack] = useState("ai");

  useEffect(() => {
    const onScroll = () => {
      const ids = ["home", "experience", "projects", "skills", "education", "contact"];
      const y = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cx(palette.bg.base, palette.text.base, "min-h-screen font-sans scroll-smooth")}> 
      <RetroBackdrop />
      <Nav active={active} setActive={setActive} />
      <main>
        <Hero track={track} setTrack={setTrack} />
        <ExperienceSection />
        <ProjectsSection filter={track} />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}