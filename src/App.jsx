import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = [
  { href: "about", label: "about" },
  { href: "skills", label: "skills" },
  { href: "experience", label: "experience" },
  { href: "courses", label: "courses" },
  { href: "projects", label: "projects" },
  { href: "education", label: "education" },
  { href: "contact", label: "contact" },
];

const CHIPS = [
  {
    label: "MERN Stack",
    hi: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Azure Cloud",
    hi: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Python",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "Git",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Docker",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    label: "Agile/Scrum",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Automation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
  },
];

const STATS = [
  { num: "1+", label: "YRS EXPERIENCE" },
  { num: "BSc", label: "COMP SCIENCE" },
  { num: "MSc", label: "IN PROGRESS" },
  { num: "LT", label: "VILNIUS BASED" },
];

const SKILL_GROUPS = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "DEVELOPMENT",
    tags: [
      { label: "JavaScript", hot: true },
      { label: "Node.js", hot: true },
      { label: "React", hot: true },
      { label: "MongoDB" },
      { label: "Express.js" },
      { label: "REST APIs" },
      { label: "Python" },
      { label: "SQL" },
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "CLOUD & DEVOPS",
    tags: [
      { label: "Azure Cloud ✓", hot: true },
      { label: "Git / GitHub", hot: true },
      { label: "Docker" },
      { label: "Linux basics" },
      { label: "CI/CD" },
      { label: "Kubernetes" },
      { label: "Terraform" },
      { label: "Ansible" },
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    title: "TOOLS & METHODS",
    tags: [
      { label: "Agile / Scrum", hot: true },
      { label: "Jira" },
      { label: "Confluence" },
      { label: "Microsoft 365" },
      { label: "Google Workspace" },
      { label: "Replit" },
    ],
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "SOFT SKILLS",
    tags: [
      { label: "Analytical thinking", hot: true },
      { label: "Problem solving", hot: true },
      { label: "Communication" },
      { label: "Collaboration" },
      { label: "Adaptability" },
      { label: "Fast learner" },
    ],
  },
];

const EXPERIENCE = [
  {
    live: true,
    date: "FEB 2026 – PRESENT",
    role: "Master's Student — Organizational Innovation & Management",
    company: "Kazimieras Simonavičius University · Vilnius, Lithuania 🇱🇹",
    bullets: [
      "Studying process optimization, digital transformation, and management innovation",
      "Applying organizational theory to IT systems design and infrastructure planning",
      "Actively self-studying Azure, Linux, Docker, and DevOps pipelines alongside coursework",
    ],
  },
  {
    live: false,
    date: "SEP 2024 – JAN 2026 · 16 MONTHS",
    role: "Junior Software Engineer",
    company: "ITS Tech World · Gujranwala, Pakistan",
    bullets: [
      "Developed and maintained full-stack web applications using MongoDB, Express.js, React, and Node.js",
      "Built and optimized RESTful APIs for efficient, scalable data handling across production systems",
      "Collaborated cross-functionally on feature development, debugging, and release cycles",
      "Translated business requirements into technical solutions through direct stakeholder engagement",
      "Improved application performance through systematic code review and optimization",
      "Established Git-based collaborative workflows and version control best practices for the team",
    ],
  },
];

const COURSES = [
  {
    badge: "IN PROGRESS",
    badgeType: "progress",
    provider: "UDEMY · IMRAN TELI",
    title: "Decoding DevOps — Basics to Advanced with AI",
    desc: "Comprehensive hands-on DevOps bootcamp: Linux, networking, scripting, Git, Jenkins, GitHub Actions, GitLab CI/CD, Terraform, Ansible, Docker, Kubernetes, AWS, Prometheus, Grafana, ArgoCD GitOps, and AI-powered DevOps workflows.",
    tags: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Ansible",
      "AWS",
      "Jenkins",
      "GitLab CI",
      "Prometheus",
      "Grafana",
      "ArgoCD",
    ],
    link: "https://www.udemy.com/course/decodingdevops/",
    linkLabel: "View on Udemy",
    logoType: "udemy",
  },
  {
    badge: "IN PROGRESS",
    badgeType: "progress",
    provider: "MICROSOFT LEARN · OFFICIAL PLAN",
    title: "Azure Skills Learning Path",
    desc: "Structured Microsoft Learn plan with milestone-based curriculum covering Azure fundamentals, cloud administration, networking, security, and infrastructure management — with built-in labs and knowledge checks.",
    tags: [
      "Azure",
      "Cloud concepts",
      "Azure Admin",
      "Networking",
      "Security",
      "IaC",
      "AZ-900 prep",
    ],
    link: "https://learn.microsoft.com/en-us/plans/6ey7h68p2zk3j2",
    linkLabel: "View learning plan",
    logoType: "ms",
  },
  {
    badge: "COMPLETED ✓",
    badgeType: "done",
    provider: "MICROSOFT LEARN · APRIL 2026",
    title: "Introduction to Azure Cloud Shell",
    desc: "Official Microsoft certification covering Azure Cloud Shell fundamentals — navigating the Azure portal, managing resources via Bash and PowerShell, and operating Azure's browser-based cloud terminal environment.",
    tags: ["Azure Cloud Shell", "Bash", "PowerShell", "Azure Portal"],
    link: "https://learn.microsoft.com/en-us/users/arslanali-7417/achievements/print/wvutb8bn",
    linkLabel: "View certificate",
    logoType: "azure",
  },
];

const PROJECTS = [
  {
    title: "DayWise",
    desc: "A productivity application designed to streamline daily workflows with intelligent task management and automation concepts. Built end-to-end as an independent project using AI-assisted tooling.",
    tags: ["Replit", "AI-assisted dev", "Workflow automation", "UX design"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
  },

  {
    title: "MERN Stack Applications",
    desc: "Multiple production-grade full-stack applications built at ITS Tech World — RESTful backends, React frontends, MongoDB schemas, and optimized API layers serving real users.",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "REST API", "Git"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

const EDUCATION = [
  {
    current: true,
    pill: "CURRENTLY ENROLLED",
    degree: "MSc — Organizational Innovation & Management",
    school: "Kazimieras Simonavičius University · Vilnius, LT",
    meta: "Feb 2026 – present · EQF Level 7 · Management & Administration",
  },
  {
    current: false,
    pill: "GRADUATED 2023",
    degree: "BSc — Computer Science",
    school: "COMSATS University Islamabad · Lahore, PK",
    meta: "2019 – 2023 · EQF Level 6 · Database design · ICT · Software development",
  },
];

const CONTACT_LINKS = [
  {
    href: "mailto:developerarslan4@gmail.com",
    label: "developerarslan4@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/arslan-ali-86105721a/",
    label: "linkedin.com/in/arslan-ali-86105721a",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "tel:+37067193962",
    label: "(+370) 671 93962 · Vilnius, LT",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14h0v2.92z" />
      </svg>
    ),
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);
  return active;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
function Reveal({ children, dir = "up", delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  const base = {
    transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms ease`,
    opacity: visible ? 1 : 0,
  };
  const transform = visible
    ? "none"
    : dir === "left"
    ? "translateX(-28px)"
    : "translateY(32px)";
  return (
    <div ref={ref} style={{ ...base, transform, ...style }}>
      {children}
    </div>
  );
}

function SectionHeader({ num, title }) {
  return (
    <Reveal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          marginBottom: "3.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--fm)",
            fontSize: "0.68rem",
            color: "var(--dim)",
            letterSpacing: "0.12em",
          }}
        >
          {num}
        </span>
        <h2
          style={{
            fontFamily: "var(--ff)",
            fontSize: "clamp(1.8rem,3.5vw,2.7rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>
    </Reveal>
  );
}

function CourseLogo({ type }) {
  const styles = {
    udemy: {
      background: "rgba(163,113,247,0.12)",
      border: "1px solid rgba(163,113,247,0.2)",
    },
    ms: {
      background: "rgba(0,120,212,0.1)",
      border: "1px solid rgba(0,120,212,0.2)",
    },
    azure: {
      background: "rgba(0,229,160,0.1)",
      border: "1px solid rgba(0,229,160,0.2)",
    },
  };
  return (
    <div
      style={{
        width: 46,
        height: 46,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...styles[type],
      }}
    >
      {type === "udemy" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 6v6c0 5.25 3.4 10.15 8 11.38C16.6 22.15 20 17.25 20 12V6L12 2z"
            stroke="#a371f7"
            strokeWidth="1.5"
            fill="rgba(163,113,247,0.15)"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="#a371f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === "ms" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="9" height="9" fill="#0078d4" />
          <rect x="13" y="2" width="9" height="9" fill="#50d9ff" />
          <rect x="2" y="13" width="9" height="9" fill="#7fba00" />
          <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
        </svg>
      )}
      {type === "azure" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="3"
            stroke="#00e5a0"
            strokeWidth="1.5"
          />
          <path
            d="M6 8l4 4-4 4"
            stroke="#00e5a0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16h6"
            stroke="#00e5a0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.href));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // null | "sending" | "sent" | "error"

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("developerarslan4@gmail.com").then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleFormChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
        :root{
          --bg:#050508;--surface:#0d0d14;--card:#111119;--card2:#161621;
          --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.12);
          --accent:#00e5a0;--adim:rgba(0,229,160,0.12);
          --accent2:#7c6ff7;--a2dim:rgba(124,111,247,0.12);
          --accent3:#f5a623;
          --text:#eeeef5;--muted:#7878a0;--dim:#3a3a55;
          --ff:'Syne',sans-serif;--fm:'JetBrains Mono',monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:var(--ff);font-size:16px;line-height:1.6;overflow-x:hidden}
        @keyframes blink{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,229,160,0.4)}50%{opacity:0.5;box-shadow:0 0 0 8px rgba(0,229,160,0)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes livep{0%,100%{box-shadow:0 0 0 0 rgba(0,229,160,0.5)}50%{box-shadow:0 0 0 8px rgba(0,229,160,0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .av-ring::after{content:'';position:absolute;inset:-3px;border-radius:50%;background:linear-gradient(135deg,#00e5a0,#7c6ff7);z-index:-1;opacity:0.25;animation:spin 6s linear infinite}
        .live-dot{animation:livep 2s ease-in-out infinite}
        .blink-dot{animation:blink 2s ease-in-out infinite}
        .hero-n1{animation:slideIn 0.7s 0.3s both}
        .hero-n2{animation:slideIn 0.7s 0.5s both}
        .hero-n3{animation:slideIn 0.7s 0.7s both}
        .hcard-anim{animation:slideIn 0.7s 0.9s both}
        .sk-hover:hover{border-color:var(--border2) !important;transform:translateY(-4px)}
        .sk-hover:hover .sk-topline{opacity:1 !important}
        .card-hover:hover{border-color:var(--border2) !important;transform:translateY(-5px)}
        .card-hover:hover .card-topline{opacity:1 !important}
        .proj-hover:hover{border-color:var(--border2) !important;transform:translateY(-5px)}
        .proj-hover:hover .proj-topline{opacity:1 !important}
        .stat-hover:hover{border-color:var(--border2) !important;transform:translateY(-3px)}
        .edu-hover:hover{border-color:var(--border2) !important;transform:translateY(-3px)}
        .clink-hover:hover{border-color:var(--accent) !important;color:var(--accent) !important;background:var(--adim) !important;transform:translateX(5px)}
        .clink-hover:hover .clink-icon{background:var(--adim) !important;border-color:rgba(0,229,160,0.3) !important}
        .nav-a:hover{color:var(--accent) !important}
        .nav-a:hover .nav-underline{width:100% !important}
        .chip-item:hover,.chip-hi{border-color:rgba(0,229,160,0.3) !important;color:var(--accent) !important;background:var(--adim) !important}
        .sk-tag-hot,.sk-tag:hover{background:var(--adim) !important;border-color:rgba(0,229,160,0.25) !important;color:var(--accent) !important}
        .bp-btn:hover{background:#1afdb3 !important;transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,229,160,0.25)}
        .bg-btn:hover{border-color:var(--accent2) !important;color:var(--accent2) !important;background:var(--a2dim) !important}
        .clink-ext:hover{gap:0.75rem !important}
        input,textarea{outline:none}
        input:focus,textarea:focus{border-color:var(--accent) !important;box-shadow:0 0 0 2px rgba(0,229,160,0.1) !important}
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr !important}
          .hcard-wrap{display:none !important}
          .about-grid{grid-template-columns:1fr !important;gap:2.5rem !important}
          .contact-grid{grid-template-columns:1fr !important;gap:2.5rem !important}
          .edu-grid{grid-template-columns:1fr !important}
        }
        @media(max-width:680px){
          .nav-desktop{display:none !important}
          .nav-mobile-btn{display:flex !important}
          .footer-inner{flex-direction:column;gap:0.8rem;text-align:center}
        }
        @media(min-width:681px){
          .nav-mobile-btn{display:none !important}
          .mobile-menu{display:none !important}
        }
      `}</style>

      {/* BG GRID */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 70% -10%,rgba(0,229,160,0.06) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at -10% 80%,rgba(124,111,247,0.05) 0%,transparent 60%),linear-gradient(rgba(0,229,160,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,160,0.018) 1px,transparent 1px)",
          backgroundSize: "100% 100%,100% 100%,56px 56px,56px 56px",
        }}
      />

      {/* SCROLL PROGRESS */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          width: `${progress}%`,
          background: "linear-gradient(90deg,var(--accent),var(--accent2))",
          zIndex: 999,
          transition: "width 0.1s linear",
          pointerEvents: "none",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 5%",
          background: "rgba(5,5,8,0.82)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => scrollTo("about")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--ff)",
            fontWeight: 800,
            fontSize: "1.3rem",
            background: "linear-gradient(135deg,var(--accent),var(--accent2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}
        >
          AA.
        </button>

        {/* Desktop nav */}
        <ul
          className="nav-desktop"
          style={{ display: "flex", gap: "2rem", listStyle: "none" }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="nav-a"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color:
                    activeSection === l.href ? "var(--accent)" : "var(--muted)",
                  fontFamily: "var(--fm)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  transition: "color 0.2s",
                  position: "relative",
                  paddingBottom: 2,
                }}
              >
                {l.label}
                <div
                  className="nav-underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: activeSection === l.href ? "100%" : 0,
                    height: 1,
                    background: "var(--accent)",
                    transition: "width 0.3s",
                  }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen((p) => !p)}
          style={{
            background: "none",
            border: "1px solid var(--border2)",
            borderRadius: 6,
            padding: "0.4rem 0.6rem",
            cursor: "pointer",
            color: "var(--text)",
            display: "none",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 1.5,
                background: "var(--text)",
                transition: "all 0.2s",
                transform: mobileOpen
                  ? i === 0
                    ? "rotate(45deg) translate(4px,4px)"
                    : i === 2
                    ? "rotate(-45deg) translate(4px,-4px)"
                    : "scaleX(0)"
                  : "none",
              }}
            />
          ))}
        </button>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="mobile-menu"
            style={{
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              background: "rgba(5,5,8,0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem 5% 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color:
                    activeSection === l.href ? "var(--accent)" : "var(--muted)",
                  fontFamily: "var(--fm)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.08em",
                  textAlign: "left",
                  padding: "0.4rem 0",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "8rem 5% 5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="hero-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 260px",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="hero-n1"
              style={{
                fontFamily: "var(--fm)",
                fontSize: "0.72rem",
                color: "var(--accent)",
                letterSpacing: "0.2em",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                className="blink-dot"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  flexShrink: 0,
                }}
              />
              OPEN TO WORK · VILNIUS, LITHUANIA
            </div>
            <h1
              style={{
                fontFamily: "var(--ff)",
                fontWeight: 800,
                fontSize: "clamp(4rem,9vw,8rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              <span
                className="hero-n1"
                style={{ color: "var(--text)", display: "block" }}
              >
                Arslan
              </span>
              <span
                className="hero-n2"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                  display: "block",
                }}
              >
                Ali
              </span>
              <span
                className="hero-n3"
                style={{
                  background:
                    "linear-gradient(135deg,var(--accent),var(--accent2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block",
                }}
              >
                Engineer.
              </span>
            </h1>
            <p
              style={{
                maxWidth: 480,
                color: "var(--muted)",
                fontSize: "0.96rem",
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              CS graduate based in{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                Vilnius, Lithuania
              </strong>{" "}
              — bridging{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                full-stack development
              </strong>{" "}
              with{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                DevOps & Cloud
              </strong>
              . Currently pursuing a Master's while actively building Azure,
              Linux, and CI/CD skills.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2.8rem",
              }}
            >
              {CHIPS.map((c) => (
                <span
                  key={c.label}
                  className={`chip-item${c.hi ? " chip-hi" : ""}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    fontFamily: "var(--fm)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.05em",
                    padding: "0.32rem 0.85rem",
                    borderRadius: 999,
                    border: "1px solid var(--border2)",
                    color: "var(--muted)",
                    cursor: "default",
                    transition: "all 0.25s",
                  }}
                >
                  <span style={{ width: 11, height: 11, flexShrink: 0 }}>
                    {c.icon}
                  </span>
                  {c.label}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("contact")}
                className="bp-btn"
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  padding: "0.9rem 2.2rem",
                  background: "var(--accent)",
                  color: "#050508",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "all 0.25s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Get in touch
              </button>
              <a
                href="https://www.linkedin.com/in/arslan-ali-86105721a/"
                target="_blank"
                rel="noreferrer"
                className="bg-btn"
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  padding: "0.9rem 2.2rem",
                  background: "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border2)",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Hero card */}
          <div
            className="hcard-wrap hcard-anim"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              padding: "2rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 0%,rgba(0,229,160,0.08) 0%,transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              className="av-ring"
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                margin: "0 auto 1.2rem",
                background:
                  "linear-gradient(135deg,var(--accent),var(--accent2))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "#050508",
                position: "relative",
                zIndex: 1,
              }}
            >
              AA
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                marginBottom: "0.2rem",
              }}
            >
              Arslan Ali
            </div>
            <div
              style={{
                fontFamily: "var(--fm)",
                fontSize: "0.65rem",
                color: "var(--accent)",
                letterSpacing: "0.1em",
              }}
            >
              IT & DEVOPS ENGINEER
            </div>
            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "1.2rem 0",
              }}
            />
            {[
              ["Location", "Vilnius, LT 🇱🇹"],
              ["Degree", "BSc + MSc"],
              ["Exp.", "1+ years"],
              ["Available", "Immediately"],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  marginBottom: "0.6rem",
                }}
              >
                <span style={{ color: "var(--muted)" }}>{k}</span>
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  {v}
                </span>
              </div>
            ))}
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--fm)",
                  fontSize: "0.63rem",
                  color: "var(--accent)",
                  background: "var(--adim)",
                  border: "1px solid rgba(0,229,160,0.2)",
                  padding: "0.28rem 0.75rem",
                  borderRadius: 999,
                  marginTop: "0.8rem",
                }}
              >
                <span
                  className="blink-dot"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
                OPEN TO WORK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader num="01" title="About Me" />
          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            <Reveal dir="left">
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: "0.96rem",
                  lineHeight: 1.9,
                }}
              >
                {[
                  <>
                    I'm a{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      Computer Science graduate
                    </strong>{" "}
                    from COMSATS University, now based in{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      Vilnius, Lithuania
                    </strong>
                    , pursuing a Master's in Organizational Innovation and
                    Management at KSU.
                  </>,
                  <>
                    My professional background is in{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      full-stack web development
                    </strong>{" "}
                    (MERN stack). I'm channeling that into{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      DevOps and IT Administration
                    </strong>{" "}
                    — where developer systems-thinking meets infrastructure
                    engineering.
                  </>,
                  <>
                    I recently earned the Microsoft{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      Azure Cloud Shell
                    </strong>{" "}
                    certificate, and I'm actively working through a
                    comprehensive{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      DevOps bootcamp
                    </strong>{" "}
                    and a structured{" "}
                    <strong style={{ color: "var(--text)", fontWeight: 600 }}>
                      Microsoft Azure Learning Path
                    </strong>
                    .
                  </>,
                  <>
                    I thrive in fast-paced environments, adapt quickly, and
                    bring genuine curiosity to every technical challenge.
                  </>,
                ].map((p, i) => (
                  <p key={i} style={{ marginTop: i > 0 ? "1rem" : 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="stat-hover"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      padding: "1.5rem",
                      transition: "all 0.25s",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--ff)",
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        color: "var(--accent)",
                        lineHeight: 1,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--fm)",
                        fontSize: "0.65rem",
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    gridColumn: "1/-1",
                    background:
                      "linear-gradient(135deg,rgba(0,229,160,0.07),rgba(124,111,247,0.07))",
                    border: "1px solid rgba(0,229,160,0.18)",
                    borderRadius: 12,
                    padding: "1.2rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(0,229,160,0.12)",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00e5a0"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="M6 8l4 4-4 4" />
                      <path d="M12 16h6" />
                    </svg>
                  </div>
                  <div>
                    <strong
                      style={{
                        color: "var(--accent)",
                        fontSize: "0.88rem",
                        display: "block",
                        fontWeight: 600,
                      }}
                    >
                      Microsoft Azure Cloud Shell
                    </strong>
                    <span
                      style={{ color: "var(--muted)", fontSize: "0.78rem" }}
                    >
                      Certificate · April 2026 · Microsoft Learn
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader num="02" title="Skills" />
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))",
                gap: "1.2rem",
              }}
            >
              {SKILL_GROUPS.map((g) => (
                <div
                  key={g.title}
                  className="sk-hover"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "1.8rem",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="sk-topline"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background:
                        "linear-gradient(90deg,var(--accent),var(--accent2))",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem",
                      fontFamily: "var(--fm)",
                      fontSize: "0.66rem",
                      color: "var(--accent)",
                      letterSpacing: "0.12em",
                      marginBottom: "1.3rem",
                    }}
                  >
                    <span style={{ width: 15, height: 15, flexShrink: 0 }}>
                      {g.icon}
                    </span>
                    {g.title}
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "var(--border)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.45rem",
                    }}
                  >
                    {g.tags.map((t) => (
                      <span
                        key={t.label}
                        className={`sk-tag${t.hot ? " sk-tag-hot" : ""}`}
                        style={{
                          fontSize: "0.73rem",
                          padding: "0.25rem 0.7rem",
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--text)",
                          border: "1px solid var(--border)",
                          fontFamily: "var(--fm)",
                          transition: "all 0.2s",
                          cursor: "default",
                        }}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader num="03" title="Experience" />
          <Reveal>
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "0.7rem",
                  bottom: 0,
                  width: 1,
                  background:
                    "linear-gradient(to bottom,var(--accent),var(--dim))",
                }}
              />
              {EXPERIENCE.map((e, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    paddingLeft: "2.5rem",
                    paddingBottom: i < EXPERIENCE.length - 1 ? "3.5rem" : 0,
                  }}
                >
                  <div
                    className={e.live ? "live-dot" : ""}
                    style={{
                      position: "absolute",
                      left: "-2rem",
                      top: "0.6rem",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: e.live ? "var(--accent)" : "var(--bg)",
                      border: "2px solid var(--accent)",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.66rem",
                      color: "var(--dim)",
                      letterSpacing: "0.1em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {e.date}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ff)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {e.role}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.76rem",
                      color: "var(--accent2)",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                    </svg>
                    {e.company}
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      color: "var(--muted)",
                      fontSize: "0.87rem",
                    }}
                  >
                    {e.bullets.map((b, j) => (
                      <li
                        key={j}
                        style={{
                          padding: "0.3rem 0",
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                          lineHeight: 1.65,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent)",
                            flexShrink: 0,
                            fontSize: "0.72rem",
                            marginTop: "0.1rem",
                          }}
                        >
                          ▹
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* COURSES */}
      <section
        id="courses"
        style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader num="04" title="Courses & Certifications" />
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))",
                gap: "1.5rem",
              }}
            >
              {COURSES.map((c) => (
                <div
                  key={c.title}
                  className="card-hover"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "2rem",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.9rem",
                  }}
                >
                  <div
                    className="card-topline"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background:
                        "linear-gradient(90deg,var(--accent),var(--accent2))",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      fontFamily: "var(--fm)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.08em",
                      padding: "0.18rem 0.6rem",
                      borderRadius: 999,
                      ...(c.badgeType === "done"
                        ? {
                            background: "var(--adim)",
                            color: "var(--accent)",
                            border: "1px solid rgba(0,229,160,0.2)",
                          }
                        : {
                            background: "rgba(245,166,35,0.1)",
                            color: "var(--accent3)",
                            border: "1px solid rgba(245,166,35,0.2)",
                          }),
                    }}
                  >
                    {c.badge}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <CourseLogo type={c.logoType} />
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--fm)",
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          color: "var(--muted)",
                          marginBottom: "0.1rem",
                        }}
                      >
                        {c.provider}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--ff)",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.3,
                        }}
                      >
                        {c.title}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.83rem",
                      color: "var(--muted)",
                      lineHeight: 1.75,
                      flex: 1,
                    }}
                  >
                    {c.desc}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.38rem",
                    }}
                  >
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--fm)",
                          fontSize: "0.63rem",
                          padding: "0.18rem 0.55rem",
                          borderRadius: 3,
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--dim)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="clink-ext"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      fontFamily: "var(--fm)",
                      fontSize: "0.7rem",
                      color: "var(--accent)",
                      textDecoration: "none",
                      transition: "gap 0.2s",
                      marginTop: "auto",
                    }}
                  >
                    {c.linkLabel}
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader num="05" title="Projects" />
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
                gap: "1.5rem",
              }}
            >
              {PROJECTS.map((p) => (
                <div
                  key={p.num}
                  className="proj-hover"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "2rem",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="proj-topline"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background:
                        "linear-gradient(90deg,var(--accent),var(--accent2))",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.63rem",
                      color: "var(--dim)",
                      letterSpacing: "0.12em",
                      marginBottom: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ width: 13, height: 13 }}>{p.icon}</span>
                    PROJECT / {p.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ff)",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--muted)",
                      lineHeight: 1.75,
                      marginBottom: "1.3rem",
                    }}
                  >
                    {p.desc}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.38rem",
                    }}
                  >
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--fm)",
                          fontSize: "0.63rem",
                          padding: "0.2rem 0.55rem",
                          borderRadius: 3,
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--dim)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="clink-ext"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        fontFamily: "var(--fm)",
                        fontSize: "0.7rem",
                        color: "var(--accent)",
                        textDecoration: "none",
                        transition: "gap 0.2s",
                        marginTop: "1rem",
                      }}
                    >
                      View project{" "}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader num="06" title="Education" />
          <Reveal>
            <div
              className="edu-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              {EDUCATION.map((e) => (
                <div
                  key={e.degree}
                  className="edu-hover"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: "2rem",
                    transition: "all 0.25s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {e.current && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background:
                          "linear-gradient(90deg,var(--accent),var(--accent2))",
                      }}
                    />
                  )}
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--fm)",
                      fontSize: "0.6rem",
                      padding: "0.18rem 0.65rem",
                      borderRadius: 999,
                      letterSpacing: "0.08em",
                      marginBottom: "0.8rem",
                      ...(e.current
                        ? {
                            background: "var(--adim)",
                            color: "var(--accent)",
                            border: "1px solid rgba(0,229,160,0.2)",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            color: "var(--muted)",
                            border: "1px solid var(--border)",
                          }),
                    }}
                  >
                    {e.pill}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--ff)",
                      fontSize: "1.02rem",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {e.degree}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.73rem",
                      color: "var(--accent2)",
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    {e.school}
                  </div>
                  <div style={{ fontSize: "0.79rem", color: "var(--muted)" }}>
                    {e.meta}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "6rem 5%",
          position: "relative",
          zIndex: 1,
          background: "var(--surface)",
        }}
      >
        <div
          className="contact-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left: CTA + contact links */}
          <Reveal dir="left">
            <h2
              style={{
                fontFamily: "var(--ff)",
                fontSize: "clamp(2.2rem,4vw,3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: "1.2rem",
              }}
            >
              Let's build
              <br />
              something{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg,var(--accent),var(--accent2))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                great.
              </span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.92rem",
                lineHeight: 1.85,
                marginBottom: "2.2rem",
              }}
            >
              I'm actively seeking{" "}
              <strong style={{ color: "var(--text)" }}>
                IT Administration
              </strong>{" "}
              and <strong style={{ color: "var(--text)" }}>DevOps</strong> roles
              in Lithuania and across the EU. Whether you're hiring,
              collaborating, or just want to connect — I'd love to hear from
              you.
            </p>

            {/* Copy email button */}
            <button
              onClick={copyEmail}
              className="bp-btn"
              style={{
                fontFamily: "var(--fm)",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                padding: "0.9rem 2.2rem",
                background: "var(--accent)",
                color: "#050508",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {copiedEmail ? (
                <>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Email copied!
                </>
              ) : (
                <>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy email
                </>
              )}
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {CONTACT_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="clink-hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "var(--text)",
                    padding: "1.1rem 1.4rem",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    transition: "all 0.25s",
                    fontSize: "0.88rem",
                  }}
                >
                  <div
                    className="clink-icon"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      flexShrink: 0,
                      transition: "all 0.25s",
                    }}
                  >
                    <span style={{ width: 15, height: 15 }}>{l.icon}</span>
                  </div>
                  {l.label}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal delay={150}>
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "2.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--fm)",
                  fontSize: "0.7rem",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                  marginBottom: "1.5rem",
                }}
              >
                SEND A MESSAGE
              </div>
              {formStatus === "sent" ? (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "var(--adim)",
                      border: "1px solid rgba(0,229,160,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.2rem",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--ff)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message sent!
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
                    Thanks for reaching out. I'll get back to you soon.
                  </div>
                  <button
                    onClick={() => setFormStatus(null)}
                    style={{
                      marginTop: "1.5rem",
                      fontFamily: "var(--fm)",
                      fontSize: "0.72rem",
                      color: "var(--accent)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  {[
                    {
                      name: "name",
                      label: "Your name",
                      type: "text",
                      placeholder: "Firstname Lastname",
                    },
                    {
                      name: "email",
                      label: "Email address",
                      type: "email",
                      placeholder: "you@company.com",
                    },
                  ].map((f) => (
                    <div key={f.name}>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--fm)",
                          fontSize: "0.65rem",
                          color: "var(--muted)",
                          letterSpacing: "0.1em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {f.label.toUpperCase()}
                      </label>
                      <input
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={formData[f.name]}
                        onChange={handleFormChange}
                        required
                        style={{
                          width: "100%",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          padding: "0.75rem 1rem",
                          color: "var(--text)",
                          fontFamily: "var(--fm)",
                          fontSize: "0.85rem",
                          transition: "all 0.2s",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--fm)",
                        fontSize: "0.65rem",
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        marginBottom: "0.5rem",
                      }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell me about the opportunity or what you'd like to discuss..."
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      style={{
                        width: "100%",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 6,
                        padding: "0.75rem 1rem",
                        color: "var(--text)",
                        fontFamily: "var(--fm)",
                        fontSize: "0.85rem",
                        resize: "vertical",
                        transition: "all 0.2s",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bp-btn"
                    disabled={formStatus === "sending"}
                    style={{
                      fontFamily: "var(--fm)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.06em",
                      padding: "0.9rem",
                      background:
                        formStatus === "sending"
                          ? "rgba(0,229,160,0.6)"
                          : "var(--accent)",
                      color: "#050508",
                      border: "none",
                      borderRadius: 6,
                      cursor: formStatus === "sending" ? "wait" : "pointer",
                      fontWeight: 600,
                      transition: "all 0.25s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {formStatus === "sending" ? (
                      <>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ animation: "spin 1s linear infinite" }}
                        >
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "2rem 5%",
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="footer-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--fm)",
              fontSize: "0.68rem",
              color: "var(--dim)",
              letterSpacing: "0.05em",
            }}
          >
            © 2026 <span style={{ color: "var(--accent)" }}>Arslan Ali</span> —
            Vilnius, Lithuania
          </div>
          <div
            style={{
              fontFamily: "var(--fm)",
              fontSize: "0.68rem",
              color: "var(--dim)",
              letterSpacing: "0.05em",
            }}
          >
            Open to IT Admin & DevOps roles{" "}
            <span style={{ color: "var(--accent)" }}>·</span> EU work
            authorization
          </div>
        </div>
      </footer>
    </>
  );
}
