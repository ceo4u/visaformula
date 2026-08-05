import React, { useState, useEffect } from 'react';
import { BarChart3, Shield, X, RefreshCw, Smartphone, Monitor, User, Tag, Calendar, ExternalLink } from 'lucide-react';

interface ClickLog {
  id: string;
  adId: string;
  adTitle: string;
  adType: 'classified' | 'sponsored';
  category?: string;
  destination?: string;
  userEmail: string;
  userName: string;
  userRole: string;
  device: string;
  pageUrl: string;
  timestamp: string;
}

export function AdClickAnalyticsViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<ClickLog[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'classified' | 'sponsored'>('all');

  const fetchLogs = () => {
    try {
      // 1. Try fetching from LocalStorage buffer first
      const localDataStr = localStorage.getItem('vf_ad_click_logs');
      let combinedLogs: ClickLog[] = localDataStr ? JSON.parse(localDataStr) : [];

      // 2. Try fetching from backend API endpoint
      fetch('/api/analytics/track-click')
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.logs) && data.logs.length > 0) {
            // Merge local and server logs without duplicates
            const serverLogs: ClickLog[] = data.logs;
            const logMap = new Map<string, ClickLog>();
            [...serverLogs, ...combinedLogs].forEach(item => {
              if (item && item.id) logMap.set(item.id, item);
            });
            setLogs(Array.from(logMap.values()));
          } else {
            setLogs(combinedLogs);
          }
        })
        .catch(() => setLogs(combinedLogs));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  const filteredLogs = logs.filter(l => filterType === 'all' || l.adType === filterType);
  const classifiedCount = logs.filter(l => l.adType === 'classified').length;
  const sponsoredCount = logs.filter(l => l.adType === 'sponsored').length;

  return (
    <>
      {/* Analytics Floating Trigger Button for Admin/Dev Testing */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 sm:left-6 z-40 bg-[#0c1a2e] hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5 transition-all opacity-80 hover:opacity-100 cursor-pointer"
        title="View Ad Clicks Analytics"
      >
        <BarChart3 className="w-3.5 h-3.5 text-[#00a896]" />
        <span className="hidden sm:inline">Ad Clicks ({logs.length})</span>
      </button>

      {/* Analytics Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in font-sans">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-slide-left">
            
            {/* Drawer Header */}
            <div className="p-4 bg-[#0c1a2e] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#00a896]/20 border border-[#00a896]/40 flex items-center justify-center text-[#00a896]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">Ad Clicks Tracking Analytics</h2>
                  <p className="text-xs text-slate-400">Who clicked on Classified &amp; Sponsored Ads</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchLogs}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                  title="Refresh Logs"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Clicks</div>
                <div className="text-xl font-black text-slate-900 mt-0.5">{logs.length}</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Classified Clicks</div>
                <div className="text-xl font-black text-indigo-900 mt-0.5">{classifiedCount}</div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-[11px] font-bold text-[#00a896] uppercase tracking-wider">Sponsored Clicks</div>
                <div className="text-xl font-black text-[#00a896] mt-0.5">{sponsoredCount}</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-1.5">
                {(['all', 'classified', 'sponsored'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      filterType === type
                        ? 'bg-slate-950 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type} ({type === 'all' ? logs.length : type === 'classified' ? classifiedCount : sponsoredCount})
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem('vf_ad_click_logs');
                  setLogs([]);
                }}
                className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
              >
                Clear Local Logs
              </button>
            </div>

            {/* Logs List Table */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-2">
                  <BarChart3 className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
                  <p className="text-sm font-semibold">No ad clicks recorded yet</p>
                  <p className="text-xs">Click on any Classified Ad or Sponsored Banner to see real-time tracking here!</p>
                </div>
              ) : (
                filteredLogs.map(log => (
                  <div
                    key={log.id || log.timestamp}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          log.adType === 'sponsored'
                            ? 'bg-teal-50 text-[#00a896] border border-teal-200'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {log.adType}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{log.adTitle}</h4>
                      </div>

                      <span className="text-[10px] text-slate-400 shrink-0">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-600 border-t border-slate-100 pt-2 mt-0.5">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{log.userEmail}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold uppercase">{log.userRole}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {log.device === 'mobile' ? <Smartphone className="w-3.5 h-3.5 text-slate-400" /> : <Monitor className="w-3.5 h-3.5 text-slate-400" />}
                        <span className="capitalize">{log.device}</span>
                      </div>

                      {log.category && (
                        <div className="flex items-center gap-1 text-slate-500">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          <span>{log.category}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
