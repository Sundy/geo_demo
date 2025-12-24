import React from 'react';

interface SectionCardProps {
    title: string;
    icon: any;
    colorClass: string; // e.g. 'text-orange-500'
    children: React.ReactNode;
    rightElement?: React.ReactNode;
    className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
    title, 
    icon: Icon, 
    colorClass, 
    children, 
    rightElement,
    className = '' 
}) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 ${className}`}>
            {/* Unified Section Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
                        <Icon className={`w-5 h-5 ${colorClass}`} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h2>
                </div>
                {rightElement}
            </div>
            
            {/* Section Content */}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default SectionCard;