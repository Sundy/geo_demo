import React, { useState, useEffect } from 'react';
import { Hexagon } from 'lucide-react';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Hexagon className="text-red-600 w-8 h-8" />
                    <span className="font-bold text-2xl text-gray-900">Aceflow</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <a href="#hero" className="text-gray-700 hover:text-red-600 font-medium transition-colors">首页</a>
                    <a href="#market" className="text-gray-700 hover:text-red-600 font-medium transition-colors">市场趋势</a>
                    <a href="#solutions" className="text-gray-700 hover:text-red-600 font-medium transition-colors">解决方案</a>
                    <a href="#global" className="text-gray-700 hover:text-red-600 font-medium transition-colors">品牌出海</a>
                    <a href="#cases" className="text-gray-700 hover:text-red-600 font-medium transition-colors">客户案例</a>
                </div>
                <button 
                    onClick={() => window.location.href = '/insight'}
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-200 transform hover:-translate-y-0.5"
                >
                    进入控制台
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
