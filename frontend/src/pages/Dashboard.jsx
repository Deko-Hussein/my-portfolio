import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardProjects from "../components/DashboardProjects";
import DashboardSkills from "../components/DashboardSkills";
import DashboardServices from "../components/DashboardServices";
import DashboardHome from "../components/DashboardHome";
import DashboardMessages from "../components/DashboardMessages";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <DashboardProjects/>;
      case "skills":
        return <DashboardSkills/>;
      case "services":
        return <DashboardServices/>;
      case "messages":
        return <DashboardMessages/>;
      default:
        return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 md:px-6 md:py-6">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="min-w-0 flex-1 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_35%),linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(2,6,23,0.96))] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)] md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
