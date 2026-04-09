import { useNavigate } from "react-router-dom";

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const menus = ["home", "projects", "skills", "services", "messages"];
  const labels = {
    home: "Overview",
    projects: "Projects",
    skills: "Skills",
    services: "Services",
    messages: "Messages",
  };

  return (
    <aside className="w-full max-w-[290px] rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,_rgba(15,23,42,0.94),_rgba(2,6,23,0.98))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
          Admin Space
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-50">
          Portfolio Dashboard
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          Manage the content your public portfolio reads from the backend.
        </p>
      </div>

      <div className="space-y-2">
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => setActiveTab(menu)}
            className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
              activeTab === menu
                ? "border border-cyan-400/30 bg-cyan-400/12 text-cyan-200 shadow-[0_12px_28px_rgba(6,182,212,0.15)]"
                : "border border-transparent bg-white/[0.03] text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-slate-100"
            }`}
          >
            {labels[menu]}
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-10 w-full rounded-2xl border border-rose-500/25 bg-rose-500/12 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/18"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
