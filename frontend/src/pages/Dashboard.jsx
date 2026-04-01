import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardProjects from "../components/DashboardProjects";
import DashboardSkills from "../components/DashboardSkills";
import DashboardServices from "../components/DashboardServices";
import DashboardHome from "../components/DashboardHome";
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
      // case "messages":
        // return <DashboardMessage/>;
      default:
        return <DashboardHome/>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;