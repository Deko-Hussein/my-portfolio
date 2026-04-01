import { useNavigate } from "react-router-dom";

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const menus = ["home", "projects", "skills", "services", "messages"];

  return (
    <div className="w-64 bg-black text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <div className="space-y-3">
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => setActiveTab(menu)}
            className={`block w-full text-left px-4 py-3 rounded-lg ${
              activeTab === menu ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            {menu.charAt(0).toUpperCase() + menu.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-600 px-4 py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;