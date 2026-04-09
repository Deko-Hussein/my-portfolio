import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBriefcase,
  FiInbox,
  FiLayers,
  FiStar,
  FiTool,
} from "react-icons/fi";
import API from "../services/api";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function DashboardHome({ setActiveTab }) {
  const [overview, setOverview] = useState({
    projects: [],
    skills: [],
    services: [],
    messages: [],
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [projectsRes, skillsRes, servicesRes, messagesRes] = await Promise.all([
          API.get("/projects"),
          API.get("/skills"),
          API.get("/services"),
          API.get("/messages"),
        ]);

        setOverview({
          projects: projectsRes.data.data || [],
          skills: skillsRes.data.data || [],
          services: servicesRes.data.data || [],
          messages: messagesRes.data.data || [],
        });
      } catch (error) {
        console.error(error);
        setMessage("Failed to load dashboard overview");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const admin = (() => {
    try {
      return JSON.parse(localStorage.getItem("admin") || "{}");
    } catch {
      return {};
    }
  })();

  const unreadMessages = overview.messages.filter((item) => !item.isRead).length;
  const featuredProjects = overview.projects.filter((item) => item.featured).length;

  const statCards = [
    {
      label: "Projects",
      value: overview.projects.length,
      detail: `${featuredProjects} featured`,
      icon: FiBriefcase,
      action: "projects",
    },
    {
      label: "Skills",
      value: overview.skills.length,
      detail: "Grouped by category",
      icon: FiLayers,
      action: "skills",
    },
    {
      label: "Services",
      value: overview.services.length,
      detail: "Visible service offers",
      icon: FiTool,
      action: "services",
    },
    {
      label: "Messages",
      value: overview.messages.length,
      detail: `${unreadMessages} unread`,
      icon: FiInbox,
      action: "messages",
    },
  ];

  const categoryBreakdown = ["Frontend", "Backend", "Database", "Other Skills", "Tools"].map((category) => ({
    category,
    total: overview.skills.filter((skill) => (skill.category || "Tools") === category).length,
  }));

  const recentProjects = overview.projects.slice(0, 3);
  const recentMessages = overview.messages.slice(0, 4);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(15,23,42,0.42),rgba(15,23,42,0.96))] p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/90">
            Overview
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            {admin?.name ? `Welcome back, ${admin.name}.` : "Welcome back."}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            This is your live content workspace. Track what is published, what needs
            updating, and where new messages are waiting.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("projects")}
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Manage Projects
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/[0.09]"
            >
              Open Inbox
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
            Snapshot
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Unread messages</p>
              <p className="mt-2 text-3xl font-semibold text-slate-50">{unreadMessages}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Featured projects</p>
              <div className="mt-2 flex items-center gap-2">
                <FiStar className="text-cyan-300" size={18} />
                <p className="text-3xl font-semibold text-slate-50">{featuredProjects}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">Last refresh</p>
              <p className="mt-2 text-lg font-medium text-slate-100">
                {loading ? "Loading..." : new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {message && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {message}
        </div>
      )}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.label}
              onClick={() => setActiveTab(card.action)}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-left transition hover:border-cyan-400/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 text-cyan-200">
                  <Icon size={18} />
                </span>
                <FiArrowRight className="text-slate-500" size={18} />
              </div>
              <p className="mt-5 text-sm text-slate-400">{card.label}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-50">{card.value}</h2>
              <p className="mt-2 text-sm text-slate-500">{card.detail}</p>
            </button>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Recent Work
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">Latest projects</h2>
            </div>
            <button
              onClick={() => setActiveTab("projects")}
              className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
            >
              View all
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {recentProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-5 text-sm text-slate-400">
                No projects added yet.
              </div>
            ) : (
              recentProjects.map((project) => (
                <article
                  key={project._id}
                  className="rounded-2xl border border-white/10 bg-slate-950/35 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {project.description}
                      </p>
                    </div>
                    {project.featured && (
                      <span className="rounded-full bg-cyan-400/12 px-3 py-1 text-xs font-semibold text-cyan-200">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(project.techStack || []).slice(0, 4).map((item, index) => (
                      <span
                        key={`${project._id}-${index}`}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                  Skills
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50">Category spread</h2>
              </div>
              <button
                onClick={() => setActiveTab("skills")}
                className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
              >
                Manage
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {categoryBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{item.category}</span>
                    <span>{item.total}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-900/80">
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{
                        width: `${overview.skills.length ? (item.total / overview.skills.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                  Inbox
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-50">Recent messages</h2>
              </div>
              <button
                onClick={() => setActiveTab("messages")}
                className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
              >
                Open
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {recentMessages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-5 text-sm text-slate-400">
                  No messages yet.
                </div>
              ) : (
                recentMessages.map((item) => (
                  <article
                    key={item._id}
                    className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">{item.name}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                          {item.subject || "General inquiry"}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          item.isRead
                            ? "bg-white/[0.06] text-slate-300"
                            : "bg-cyan-400/12 text-cyan-200"
                        }`}
                      >
                        {item.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                      {item.message}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
