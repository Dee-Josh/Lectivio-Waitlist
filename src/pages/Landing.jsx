import React, { useState } from "react";
import { submitWaitlistEntry } from "../firebase";
import "./Landing.css";

// import {
//   BookOpen, Clock, BarChart3, Lightbulb, Calendar, ClipboardCheck,
//   CheckCircle2, Users, LineChart, Download, Sparkles, ChevronRight,
//   ChevronLeft, X, Menu
// } from "lucide-react";

// <Clock size={20} color="#4F46E5" />

const FEATURES = [
  { title: "Smart Attendance", desc: "Take and manage attendance easily, anywhere.", icon: `<Calendar size={20} color="#4F46E5" />` },
  { title: "Assessment Management", desc: "Create, organize and grade assignments, tests and exams.", icon: `<ClipboardCheck size={20} color="#4F46E5" />` },
  { title: "Automatic Grading", desc: "Fast score calculation and gradebook management.", icon: `<CheckCircle2 size={20} color="#4F46E5" />` },
  { title: "Student Management", desc: "Keep your student records organized and up to date.", icon: `<Users size={20} color="#4F46E5" />` },
  { title: "Course Management", desc: "Manage courses, materials and announcements.", icon: `<BookOpen size={20} color="#4F46E5" />` },
  { title: "Analytics & Insights", desc: "Track performance and make data-driven decisions.", icon: `<LineChart size={20} color="#4F46E5" />` },
  { title: "Export & Reports", desc: "Export results and reports in one click.", icon: `<Download size={20} color="#4F46E5" />` },
  { title: "AI Teaching Assistant", desc: "Get AI-powered help for lesson planning and more.", soon: true , icon: `<Sparkles size={20} color="#7C3AED" />` },
];

const FEATURE_CHOICES = [
  "Smart Attendance", "Automatic Score Grading", "Student Management",
  "Analytics & Reports", "AI Teaching Assistant", "Course Management", "Student Report Review", "Other",
];

// const NAV_LINKS = ["Features", "How It Works", "Roadmap", "About", "FAQ"];
const NAV_LINKS = ["Features", "Roadmap", "About", "FAQ"];

const initialForm = {
  fullName: "", email: "", institution: "", department: "",
  courses: "", classSize: "", challenge: "",
  wantedFeatures: [], wouldUse: "", wouldReceive: "", whichPlatform: "",  otherFeatures: "",
};

export default function Landing() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [step, setStep] = useState(1); // 1-3 survey, 4 thank you
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const openFlow = () => { setStep(1); setError(""); setFlowOpen(true); };
  const closeFlow = () => setFlowOpen(false);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const toggleFeature = (name) =>
    setForm((f) => ({
      ...f,
      wantedFeatures: f.wantedFeatures.includes(name)
        ? f.wantedFeatures.filter((n) => n !== name)
        : [...f.wantedFeatures, name],
    }));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await submitWaitlistEntry(form);
      setStep(4);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      {/* ---------- Header ---------- */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-mark">L</div>
            Lectivio
          </div>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => <a key={l} href={"#"+l}>{l}</a>)}
          </nav>
          <button className="btn btn-primary btn-header" onClick={openFlow}>
            Join Early Access
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
          {NAV_LINKS.map((l) => <a key={l} href={"#"+l}>{l}</a>)}
            <button className="btn btn-primary" onClick={openFlow}>Join Early Access</button>
          </div>
        )}
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">For Lecturers. By Innovation.</span>
          <h1>Your Virtual<br /><span className="text-indigo">Teaching Assistant</span></h1>
          <p className="hero-sub">
            Spend less time on administration and more time teaching, inspiring and making impact.
          </p>

          <div className="hero-points">
            <div>
                <p><Clock size={20} color="#4F46E5" /></p>
              <div className="hero-point-title">Save Time</div>
              <div className="hero-point-desc">Automate repetitive academic tasks.</div>
            </div>
            <div>
                <p><BarChart3 size={20} color="#4F46E5" /></p>
              <div className="hero-point-title">Stay Organized</div>
              <div className="hero-point-desc">Manage courses, students and records in one place.</div>
            </div>
            <div>
              <p><Lightbulb size={20} color="#4F46E5" /></p>  
              <div className="hero-point-title">Make Better Decisions</div>
              <div className="hero-point-desc">Get insights that help you track performance.</div>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={openFlow}>Join Early Access</button>
            <button className="btn btn-secondary">See How It Works</button>
          </div>
          <p className="hero-note">Join lecturers who are helping shape the future of Lectivio</p>
        </div>

        <div className="hero-visual">
          {/* <div className="dashboard-card">
            <div className="dashboard-body">
              <div className="dashboard-greeting">Good evening, Dr. Ada 👋</div>
              <div className="dashboard-sub">Here's what's happening in your classes today.</div>
              <div className="dashboard-stats">
                <div className="stat"><span>6</span><small>My Courses</small></div>
                <div className="stat"><span>248</span><small>Total Students</small></div>
                <div className="stat"><span>8</span><small>Pending</small></div>
                <div className="stat"><span>72%</span><small>Avg. Score</small></div>
              </div>
              <div className="dashboard-chart">
                {[40, 55, 45, 65, 50, 80, 70].map((h, i) => (
                  <div key={i} className="bar" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="dashboard-footer">Save hours every week on admin →</div>
          </div> */}
          <img className="dashboard-image" src="src\assets\dashboard.png" alt="Dashboard Image" />
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="features" id="Features">
        <span className="eyebrow">FEATURES</span>
        <h2>Everything you need, all in one place.</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-item">
              <div className="feature-icon">
                <span>{f.icon}</span>
              </div>
              <div>
                <div className="feature-title">
                  {f.title}
                  {f.soon && <span className="badge">Coming Soon</span>}
                </div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Roadmap ---------- */}
      <section className="roadmap" id="Roadmap">
        <div className="roadmap-left">
          <span className="eyebrow eyebrow-light">OUR ROADMAP</span>
          <h2>Built in phases.<br />Designed for impact.</h2>
          <div className="phases">
            <div className="phase">
              <div className="phase-num done">✓</div>
              <div>
                <div className="phase-title">Phase 1 · MVP Essentials</div>
                <ul>
                  <li>Course & student management</li>
                  <li>Attendance tracking</li>
                  <li>Assessment & grading</li>
                  <li>Reports & analytics</li>
                </ul>
              </div>
            </div>
            <div className="phase">
              <div className="phase-num">2</div>
              <div>
                <div className="phase-title">Phase 2 · Advanced Tools</div>
                <ul>
                  <li>Advanced analytics</li>
                  <li>Bulk operations</li>
                  <li>Communication tools</li>
                  <li>Mobile experience</li>
                </ul>
              </div>
            </div>
            <div className="phase">
              <div className="phase-num">3</div>
              <div>
                <div className="phase-title">Phase 3 · AI & Beyond</div>
                <ul>
                  <li>AI teaching assistant</li>
                  <li>Smart recommendations</li>
                  <li>Predictive insights</li>
                  <li>More integrations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="feedback-panel">
          <span className="eyebrow eyebrow-light">HELP US BUILD LECTIVIO</span>
          <h3>Your insights. Our blueprint.</h3>
          <p>
            We're building Lectivio to solve real problems faced by lecturers every day. Share your
            challenges and feature ideas to help shape the platform you'll love to use.
          </p>
          <ul className="checklist">
            <li>It only takes 3–5 minutes</li>
            <li>Help shape features you'll actually use</li>
            <li>Be among the first to try Lectivio</li>
          </ul>
          <button className="btn btn-light" onClick={openFlow}>Join Early Access & Share Feedback</button>
          <p className="fine-print">100% free. No commitment.</p>
        </div>
      </section>

      <section className="landing-platform" id="About">
        <div className="landing-platform-description">
            <span className="landing-eyebrow center eyebrow landing-badge">Built for modern teaching</span>
            <h2 className="center">A platform that works <span className="text-accent">beautifully, anywhere.</span></h2>
            <p className="muted platform-description-text">
            Use Lectivio on any device. Manage your classes on the go and stay
            productive always.
            </p>
            <div className="landing-platform-badges">
                <div className="landing-platform-badge">
                    <span>🌐</span> Web App <small>Access in browser</small>
                </div>
                <div className="landing-platform-badge soon">
                    <span>📱</span> Google Play <small>Coming soon</small>
                </div>
                <div className="landing-platform-badge soon">
                    <span>🍎</span> App Store <small>Coming soon</small>
                </div>
            </div>
        </div>
        <div className="landing-platform-image">
            <img src="./src/assets/devices.png" alt="Lectivio across different devices" />
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Lectivio. Built for lecturers, by innovation.
      </footer>

      {/* ---------- Waitlist modal ---------- */}
      {flowOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeFlow()}>
          <div className="modal">
            {step <= 3 && (
              <button className="modal-close" onClick={closeFlow} aria-label="Close">✕</button>
            )}

            {step === 1 && (
              <StepShell step={1} total={3} title="Help Us Build Lectivio" subtitle="Your feedback shapes the future.">
                <Field label="Full Name (optional)">
                  <input className="input" value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)} placeholder="Dr. Ada Lovelace" />
                </Field>
                <Field label="Email Address">
                  <input className="input" type="email" value={form.email}
                    onChange={(e) => update("email", e.target.value)} placeholder="ada@university.edu" />
                </Field>
                <Field label="Institution">
                  <input className="input" value={form.institution}
                    onChange={(e) => update("institution", e.target.value)} placeholder="e.g. Federal University Oye-Ekiti" />
                </Field>
                <Field label="Department">
                  <input className="input" value={form.department}
                    onChange={(e) => update("department", e.target.value)} placeholder="e.g. Electrical Engineering" />
                </Field>
                <NavButtons onNext={() => setStep(2)} nextDisabled={!form.email} />
              </StepShell>
            )}

            {step === 2 && (
              <StepShell step={2} total={3} title="Tell us about your classes" subtitle="This helps us design for real workloads.">
                <Field label="Courses you currently teach">
                  <input className="input" value={form.courses}
                    onChange={(e) => update("courses", e.target.value)} placeholder="e.g. Control Systems, Digital Electronics" />
                </Field>
                <Field label="Approximate number of students per class">
                  <input className="input" value={form.classSize}
                    onChange={(e) => update("classSize", e.target.value)} placeholder="e.g. 40–60" />
                </Field>
                <Field label="What is your biggest challenge in managing your courses?">
                  <textarea className="input textarea" value={form.challenge}
                    onChange={(e) => update("challenge", e.target.value)} placeholder="e.g. Grading takes too long every semester" />
                </Field>
                <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} />
              </StepShell>
            )}

            {step === 3 && (
              <StepShell step={3} total={3} title="Almost there!" subtitle="Which features would save you the most time?">
                <div className="checkbox-grid">
                  {FEATURE_CHOICES.map((f) => (
                    <label key={f} className={`checkbox-option ${form.wantedFeatures.includes(f) ? "checked" : ""}`}>
                      <input type="checkbox" checked={form.wantedFeatures.includes(f)} onChange={() => toggleFeature(f)} />
                      {f}
                    </label>
                  ))}
                </div>
                <Field label="If Lectivio solved your biggest challenge, would you be willing to use it?">
                  <div className="segmented">
                    {["Yes", "Maybe", "No"].map((v) => (
                      <button key={v} type="button"
                        className={`segmented-btn ${form.wouldUse === v ? "active" : ""}`}
                        onClick={() => update("wouldUse", v)}>
                        {v}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Would you like to be sent the link of the platform when we launch?">
                  <div className="segmented">
                    {["Yes", "Maybe", "No"].map((v) => (
                      <button key={v} type="button"
                        className={`segmented-btn ${form.wouldReceive === v ? "active" : ""}`}
                        onClick={() => update("wouldReceive", v)}>
                        {v}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="If yes, where do you want to recieve it?">
                  <div className="segmented">
                    {["Whatsapp", "Email", "Both"].map((v) => (
                      <button key={v} type="button"
                        className={`segmented-btn ${form.whichPlatform === v ? "active" : ""}`}
                        onClick={() => update("whichPlatform", v)}>
                        {v}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Any other features that would help your lecturing work (optional)">
                  <textarea className="input textarea-sm" value={form.otherFeatures}
                    onChange={(e) => update("otherFeatures", e.target.value)} placeholder="Tell us anything else on your mind" />
                </Field>
                {error && <p className="form-error">{error}</p>}
                <NavButtons onBack={() => setStep(2)} onNext={handleSubmit}
                  nextLabel={submitting ? "Submitting…" : "Submit"} nextDisabled={submitting} />
              </StepShell>
            )}

            {step === 4 && (
              <div className="thank-you">
                <div className="thank-you-icon">✓</div>
                <h3>Thank You!</h3>
                <p>
                  You're now on our early access list. We appreciate your time and look forward to
                  building Lectivio with you.
                </p>
                <div className="benefits-grid">
                  <div>✓ Early access to new features</div>
                  <div>✓ Opportunity to influence product development</div>
                  <div>✓ Priority onboarding when we launch</div>
                  <div>✓ A community of forward-thinking lecturers like you</div>
                </div>
                <button className="btn btn-primary" onClick={closeFlow}>Back to Home</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StepShell({ step, total, title, subtitle, children }) {
  return (
    <div className="step-shell">
      <div className="progress-bar">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`progress-seg ${i < step ? "filled" : ""}`} />
        ))}
      </div>
      <div className="step-count">Step {step} of {total}</div>
      <h3>{title}</h3>
      <p className="step-subtitle">{subtitle}</p>
      <div className="step-fields">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextDisabled, nextLabel = "Next" }) {
  return (
    <div className="nav-buttons">
      {onBack && <button className="btn btn-outline" onClick={onBack}>← Back</button>}
      <button className="btn btn-primary" onClick={onNext} disabled={nextDisabled}>{nextLabel}</button>
    </div>
  );
}
