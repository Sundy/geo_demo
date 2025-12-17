import React from 'react';
import { Hexagon } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Hexagon className="text-red-600 w-6 h-6" />
                        <span className="font-bold text-xl text-white">Aceflow</span>
                    </div>
                    <div className="flex gap-8 text-sm">
                        <a href="#" className="hover:text-white transition-colors">关于我们</a>
                        <a href="#" className="hover:text-white transition-colors">服务条款</a>
                        <a href="#" className="hover:text-white transition-colors">隐私政策</a>
                        <a href="#" className="hover:text-white transition-colors">联系我们</a>
                    </div>
                </div>
                <div className="mt-8 text-center md:text-left text-xs text-gray-600">
                    &copy; 2025 Aceflow Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
