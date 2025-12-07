import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  Search, 
  Layers, 
  PenTool, 
  Activity, 
  ShoppingBag,
  Hexagon
} from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/insight', label: '洞察与诊断', icon: <BarChart2 size={20} /> },
    { path: '/intent', label: '定位搜索意图', icon: <Search size={20} /> },
    { path: '/platform', label: '平台选择策略', icon: <Layers size={20} /> },
    { path: '/content', label: '内容策略及创作', icon: <PenTool size={20} /> },
    { path: '/monitoring', label: '数据监测追踪', icon: <Activity size={20} /> },
    { path: '/conversion', label: '电商转化追踪', icon: <ShoppingBag size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo">
          <Hexagon className="logo-icon" size={32} />
          <span className="logo-text">云智推</span>
        </div>
        <p className="logo-subtitle">GEO 智能体系统</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
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
