import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { 
  Briefcase, 
  User, 
  LayoutDashboard, 
  FileText, 
  LogOut,
  MessageSquare,
  Home as HomeIcon
} from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    } catch (error) {
      console.log("Not authenticated");
    }
  };

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  const isEmployer = user?.user_type === "employer";

  const employerLinks = [
    { title: "Home", url: createPageUrl("Home"), icon: HomeIcon },
    { title: "Post Job", url: createPageUrl("PostJob"), icon: FileText },
    { title: "My Dashboard", url: createPageUrl("EmployerDashboard"), icon: LayoutDashboard },
    { title: "Messages", url: createPageUrl("Messages"), icon: MessageSquare },
  ];

  const jobSeekerLinks = [
    { title: "Home", url: createPageUrl("Home"), icon: HomeIcon },
    { title: "My Dashboard", url: createPageUrl("JobSeekerDashboard"), icon: LayoutDashboard },
    { title: "Messages", url: createPageUrl("Messages"), icon: MessageSquare },
  ];

  const navLinks = user ? (isEmployer ? employerLinks : jobSeekerLinks) : [];

  if (currentPageName === "RoleSelection" || !user) {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <Link to={createPageUrl("Home")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">SkillMatch</h2>
              <p className="text-xs text-slate-500">Your Career Partner</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Navigation</p>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.url}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    location.pathname === link.url
                      ? "bg-teal-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Account</p>
            <Link
              to={createPageUrl("Profile")}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.full_name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.full_name}</p>
              <p className="text-xs text-slate-500">{isEmployer ? "Employer" : "Job Seeker"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}
