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
  Zap
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  toggleCollapse, 
  isMobile = false,
  isOpen = false,
  onCloseMobile
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
