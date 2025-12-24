import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Info } from 'lucide-react';

interface HotWord {
    id: string;
    text: string;
    value: number; // Heat value determining size
    distance: number; // 0-100, distance from center (relevance)
    angle: number; // 0-360 position
    color: string;
    type: 'positive' | 'negative' | 'neutral';
}

interface HotWordsAnalysisProps {
    brandName?: string;
}

const HotWordsAnalysis: React.FC<HotWordsAnalysisProps> = ({ brandName = '小鹏' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedWord, setSelectedWord] = useState<HotWord | null>(null);

    // Mock Data Generator
    const generateWords = (): HotWord[] => {
        const words = [
            // Center Node (Brand)
            { id: 'center', text: brandName, value: 100, distance: 0, angle: 0, color: '#3b82f6', type: 'neutral' },

            // Inner Circle (High Relevance)
            { id: '1', text: 'G6性价比', value: 85, distance: 25, angle: 45, color: '#ef4444', type: 'positive' },
            { id: '2', text: 'XNGP智驾', value: 80, distance: 30, angle: 120, color: '#ef4444', type: 'positive' },
            { id: '3', text: '800V快充', value: 75, distance: 28, angle: 200, color: '#ef4444', type: 'positive' },
            { id: '4', text: '续航扎实', value: 70, distance: 35, angle: 300, color: '#ef4444', type: 'positive' },
            
            // Middle Circle (Medium Relevance)
            { id: '5', text: '内饰异味', value: 60, distance: 55, angle: 20, color: '#10b981', type: 'negative' },
            { id: '6', text: '售后服务', value: 55, distance: 60, angle: 90, color: '#f59e0b', type: 'neutral' },
            { id: '7', text: '空间表现', value: 50, distance: 58, angle: 160, color: '#ef4444', type: 'positive' },
            { id: '8', text: '车机流畅', value: 48, distance: 62, angle: 240, color: '#ef4444', type: 'positive' },
            { id: '9', text: '外观设计', value: 45, distance: 52, angle: 320, color: '#f59e0b', type: 'neutral' },

            // Outer Circle (Low Relevance / Specific Topics)
            { id: '10', text: '保险费用', value: 35, distance: 80, angle: 10, color: '#f59e0b', type: 'neutral' },
            { id: '11', text: '二手保值', value: 32, distance: 85, angle: 70, color: '#10b981', type: 'negative' },
            { id: '12', text: '自动泊车', value: 30, distance: 78, angle: 130, color: '#ef4444', type: 'positive' },
            { id: '13', text: '充电桩安装', value: 28, distance: 82, angle: 190, color: '#f59e0b', type: 'neutral' },
            { id: '14', text: '异响问题', value: 25, distance: 88, angle: 250, color: '#10b981', type: 'negative' },
            { id: '15', text: '交付周期', value: 22, distance: 84, angle: 310, color: '#f59e0b', type: 'neutral' },
            { id: '16', text: '竞品对比', value: 20, distance: 90, angle: 350, color: '#f59e0b', type: 'neutral' },
        ];
        return words as HotWord[];
    };

    const words = generateWords();

    // Helper to calculate position
    const getPosition = (distance: number, angle: number) => {
        // Convert distance to % (0-50% from center)
        // We leave some padding, so max distance 100 maps to 45% radius
        const radius = (distance / 100) * 42; 
        const radian = (angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(radian);
        const y = 50 + radius * Math.sin(radian);
        return { x, y };
    };

    // Helper to calculate size based on value
    const getSize = (value: number, isCenter: boolean) => {
        if (isCenter) return 120; // Center bubble fixed size
        // Map 0-100 value to 40-100px range
        return 40 + (value / 100) * 60;
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-1 bg-blue-500 rounded-full"></div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        热词关联分析 (Hot Words Correlation)
                    </h2>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        正面
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        中性
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        负面
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="relative w-full aspect-[2/1] min-h-[500px] bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden border border-slate-100">
                
                {/* Background Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[30%] h-[60%] border border-blue-100 rounded-full absolute opacity-60"></div>
                    <div className="w-[60%] h-[120%] border border-blue-100 rounded-full absolute opacity-40"></div>
                    <div className="w-[90%] h-[180%] border border-blue-100 rounded-full absolute opacity-20"></div>
                    
                    {/* Axis Labels */}
                    <div className="absolute w-full flex justify-between px-10 text-xs font-medium text-blue-300">
                        <span>弱 (Weak)</span>
                        <span>弱 (Weak)</span>
                    </div>
                    <div className="absolute w-full border-t border-dashed border-blue-200 opacity-30"></div>
                </div>

                {/* Bubbles */}
                <div className="absolute inset-0">
                    {words.map((word) => {
                        const { x, y } = getPosition(word.distance, word.angle);
                        const size = getSize(word.value, word.id === 'center');
                        
                        return (
                            <div
                                key={word.id}
                                className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-lg hover:z-20 group`}
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    backgroundColor: word.color,
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: word.id === 'center' ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
                                    opacity: 0.9
                                }}
                                onMouseEnter={() => setSelectedWord(word)}
                                onMouseLeave={() => setSelectedWord(null)}
                            >
                                <div className="text-center px-2 pointer-events-none">
                                    <div className={`font-bold leading-tight ${word.id === 'center' ? 'text-xl text-white' : 'text-white text-sm'}`}>
                                        {word.text}
                                    </div>
                                    {/* Tooltip on Hover */}
                                    <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none`}>
                                        <div className="font-bold mb-0.5">{word.text}</div>
                                        <div>热度: {word.value} | 相关性: {100 - word.distance}%</div>
                                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend/Info Box */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-gray-100 shadow-sm text-xs text-gray-500 max-w-[200px]">
                    <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        <p>气泡大小代表“搜索热度”，距离中心远近代表“与品牌的相关性强弱”。</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotWordsAnalysis;