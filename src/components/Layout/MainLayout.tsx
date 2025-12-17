import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Hexagon } from 'lucide-react';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileMenuOpen(false);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const getMainContentStyle = () => {
        if (isMobile) {
            return { marginLeft: 0, width: '100%' };
        }
        const sidebarWidth = isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
        return { marginLeft: `calc(${sidebarWidth} + 4vh)` };
    };

    return (
        <div className="app-container flex-col md:flex-row">
            {/* Mobile Header */}
            {isMobile && (
                <header className="fixed top-0 left-0 right-0 h-[60px] bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                        <Hexagon className="text-red-600 w-8 h-8" />
                        <span className="font-bold text-xl text-gray-800">AceFlow</span>
                    </div>
                    <button 
                        onClick={toggleMobileMenu}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </header>
            )}

            <Sidebar 
                isCollapsed={isSidebarCollapsed} 
                toggleCollapse={toggleSidebar}
                isMobile={isMobile}
                isOpen={isMobileMenuOpen}
                onCloseMobile={closeMobileMenu}
            />
            
            <main 
                className="main-content" 
                style={{
                    ...getMainContentStyle(),
                    marginTop: isMobile ? '60px' : '0', // Adjust for mobile header
                    padding: isMobile ? '20px' : '30px'
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
