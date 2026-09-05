import React from "react";
import { ChevronLeft, LogOut, X } from "lucide-react";

export function SidebarNavigation({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  activeTab,
  setActiveTab,
  navSections,
  allNavItems,
  setSelectedApplicationId,
  handleLogout
}: {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navSections: Array<{
    title: string;
    items: Array<{
      id: string;
      label: string;
      icon: any;
      count?: number;
      badge?: string;
      badgeColor?: string;
    }>;
  }>;
  allNavItems?: Array<{
    id: string;
    label: string;
    icon: any;
    count?: number;
    badge?: string;
    badgeColor?: string;
  }>;
  applicationsCount?: number;
  luggagePercent?: number;
  readinessScore?: number;
  setSelectedApplicationId?: (id: string | null) => void;
  handleLogout: () => void;
}) {
  const safeNavItems = allNavItems || (navSections || []).flatMap((s: any) => s.items || []);
  return (
    <>
      {/* Desktop Collapsible Left Sidebar */}
      <aside className={`hidden lg:flex bg-white border-r border-slate-200/80 flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${isSidebarCollapsed ? "w-20" : "w-64"}`}>
        <div className="p-3.5 space-y-5 overflow-y-auto max-h-[calc(100vh-120px)] no-scrollbar">
          <div className="flex items-center justify-between px-2 pb-1 border-b border-slate-100">
            {!isSidebarCollapsed ? (
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Menu
              </span>
            ) : <div className="w-3" />}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="p-1 rounded-lg border border-slate-200/80 hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Grouped Navigation Sections */}
          <nav className="space-y-4">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {!isSidebarCollapsed && (
                  <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                    {section.title}
                  </h5>
                )}
                <div className="space-y-0.5">
                  {section.items.map(item => {
                    const isActive = activeTab === item.id;
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          if (item.id === "cases") {
                            setSelectedApplicationId(null);
                          }
                        }}
                        title={item.label}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-slate-100 text-slate-950 font-bold shadow-2xs"
                            : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComp className={`w-4 h-4 shrink-0 ${isActive ? "text-slate-950 stroke-[2.2]" : "text-slate-500 stroke-[1.8]"}`} />
                          {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                        </div>
                        {!isSidebarCollapsed && (
                          item.count !== undefined ? (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 min-w-[20px] text-center">
                              {item.count}
                            </span>
                          ) : item.badge ? (
                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${item.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                              {item.badge}
                            </span>
                          ) : null
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold text-xs text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
        <aside className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl flex flex-col justify-between p-4 transform transition-transform duration-300 overflow-y-auto ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <img src="/logo.png?v=3" alt="TravlTik Logo" className="h-9 sm:h-10 max-h-[42px] w-auto object-contain" />
              <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {safeNavItems.map((item: any) => {
                const isActive = activeTab === item.id;
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id === "cases") {
                        setSelectedApplicationId(null);
                      }
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 hover:bg-rose-50 transition-all mt-4 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </aside>
      </div>
    </>
  );
}
