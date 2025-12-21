import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  Search, 
  PenTool, 
  Activity, 
  ShoppingBag,
  Hexagon,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Bot,
  MessageSquare
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenChat?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  toggleCollapse, 
  isMobile = false,
  isOpen = false,
  onCloseMobile,
  onOpenChat
}) => {
  const mainNavItems = [
    { path: '/insight', label: '洞察与诊断', icon: <BarChart2 size={20} /> },
    { path: '/intent', label: '定位搜索意图', icon: <Search size={20} /> },
    { path: '/content', label: '内容创作及发布', icon: <PenTool size={20} /> },
    { path: '/monitoring', label: '数据监测追踪', icon: <Activity size={20} /> },
    { path: '/conversion', label: '电商转化追踪', icon: <ShoppingBag size={20} /> },
  ];

  const settingNavItems = [
    { path: '/knowledge', label: '向量知识库', icon: <BookOpen size={20} /> },
    { path: '/qualifications', label: '资质及荣誉', icon: <Award size={20} /> },
  ];

  const toolNavItems = [
    { path: '/tools/realtime-search', label: '实时查询', icon: <Zap size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div className="mobile-overlay" onClick={onCloseMobile} />
      )}

      <aside className={`sidebar glass-panel ${isCollapsed ? 'collapsed' : ''} ${isMobile && isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Hexagon className="logo-icon" size={32} />
            <span className="logo-text">AceFlow</span>
          </div>
          <p className="logo-subtitle">让品牌被AI看见</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {mainNavItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={isMobile ? onCloseMobile : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 mb-2 px-4 enterprise-label">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">工具</p>
          </div>
          <ul>
            {toolNavItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={isMobile ? onCloseMobile : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 mb-2 px-4 enterprise-label">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">企业设置</p>
          </div>
          <ul>
            {settingNavItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={isMobile ? onCloseMobile : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Agent Chat Entry - Redesigned for Alignment & Attraction */}
          <div className="mt-6 px-4 mb-4">
            <button 
                onClick={onOpenChat}
                className={`
                    w-full flex items-center text-left relative overflow-hidden transition-all duration-300 group
                    ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
                    rounded-2xl border-2 border-red-100 bg-gradient-to-br from-white to-red-50/50
                    hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50 hover:-translate-y-0.5
                `}
                title="AI Agent 对话"
            >
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-100/40 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform" />

                {/* Icon Container - Strictly aligned with nav-icon (min-w-24px) */}
                <span className={`nav-icon flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isCollapsed ? '' : 'mr-3'}`}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-200 rounded-full blur opacity-20 group-hover:opacity-40 animate-pulse" />
                        <MessageSquare size={22} className="text-red-600 relative z-10" fill="currentColor" fillOpacity={0.1} />
                        {/* Notification Dot */}
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full z-20" />
                    </div>
                </span>

                {/* Text Content */}
                <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 group-hover:text-red-700 leading-none mb-1 flex items-center justify-between w-full">
                            AI Agent
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-md font-bold transform scale-90 origin-right">LIVE</span>
                        </span>
                        <span className="text-xs text-gray-500 group-hover:text-red-500/80 font-medium">
                            点击开启智能对话
                        </span>
                    </div>
                </div>
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">A</div>
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">管理员</span>
            </div>
          </div>
        </div>

        {/* Desktop Collapse Toggle */}
        {!isMobile && (
            <button 
                onClick={toggleCollapse}
                className="absolute -right-3 top-24 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 shadow-sm transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
