import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  Search, 
  Layers, 
  PenTool, 
  Activity, 
  ShoppingBag,
  Hexagon,
  BookOpen,
  Settings
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const mainNavItems = [
    { path: '/insight', label: '洞察与诊断', icon: <BarChart2 size={20} /> },
    { path: '/intent', label: '定位搜索意图', icon: <Search size={20} /> },
    { path: '/content', label: '内容创作及发布', icon: <PenTool size={20} /> },
    { path: '/monitoring', label: '数据监测追踪', icon: <Activity size={20} /> },
    { path: '/conversion', label: '电商转化追踪', icon: <ShoppingBag size={20} /> },
  ];

  const settingNavItems = [
    { path: '/knowledge', label: '知识库管理', icon: <BookOpen size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo">
          <Hexagon className="logo-icon" size={32} />
          <span className="logo-text">AceFlow</span>
        </div>
        <p className="logo-subtitle">GEO 智能体系统</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {mainNavItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-8 mb-2 px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">企业设置</p>
        </div>
        <ul>
          {settingNavItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
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
    </aside>
  );
};

export default Sidebar;
