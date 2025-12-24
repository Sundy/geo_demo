import React, { useState } from 'react';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer 
} from 'recharts';
import { PieChart as PieChartIcon, MessageSquare } from 'lucide-react';

interface SentimentAnalysisProps {
    brandName?: string;
}

const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ brandName = '小鹏' }) => {
    // Keyword Toggle State
    const [activeKeywordTab, setActiveKeywordTab] = useState<'positive' | 'negative'>('negative');

    // 1. Sentiment Data (Mock)
    const sentimentData = [
        { name: '正面 (Positive)', value: 62, color: '#ef4444' }, // red-500
        { name: '中立 (Neutral)', value: 28, color: '#9ca3af' }, // gray-400
        { name: '负面 (Negative)', value: 10, color: '#fca5a5' }, // red-300
    ];

    // 2. Keywords Data (Mock)
    const colors = [
        'text-red-600', 'text-orange-500', 'text-blue-500', 'text-green-600', 
        'text-purple-600', 'text-indigo-500', 'text-pink-500', 'text-teal-600',
        'text-cyan-600', 'text-sky-500', 'text-rose-500', 'text-amber-600'
    ];

    const positiveKeywords = [
        { word: '智驾领先', count: 88 },
        { word: '性价比高', count: 75 },
        { word: '续航扎实', count: 62 },
        { word: '外形科幻', count: 50 },
        { word: '充电快', count: 45 },
        { word: '空间大', count: 40 },
        { word: 'OTA频繁', count: 35 },
        { word: '语音交互流畅', count: 32 },
        { word: '高速NGP好用', count: 28 },
        { word: '自动泊车精准', count: 25 },
        { word: '底盘调教舒适', count: 22 },
        { word: '内饰用料实在', count: 18 },
        { word: '能耗控制优秀', count: 15 },
        { word: '外观时尚', count: 12 },
        { word: '科技感强', count: 10 },
    ];

    const negativeKeywords = [
        { word: '持续亏损', count: 95 },
        { word: '盈利能力存疑', count: 85 },
        { word: '市场竞争压力大', count: 80 },
        { word: '价格战', count: 75 },
        { word: '毛利率偏低', count: 70 },
        { word: '现金流承压', count: 65 },
        { word: '过度依赖价格战', count: 60 },
        { word: '品牌认知度弱', count: 55 },
        { word: '难以为继', count: 50 },
        { word: '内饰异味', count: 42 },
        { word: '隔音一般', count: 38 },
        { word: '售后网点少', count: 30 },
        { word: '底盘硬', count: 25 },
        { word: '车机偶尔卡顿', count: 20 },
        { word: '保值率低', count: 18 },
        { word: '营销力度不足', count: 15 },
        { word: '交付周期长', count: 12 },
        { word: '异响问题', count: 10 },
    ];

    // Helper to render the Cloud with "Center-Heavy" layout
    const renderWordCloud = () => {
        const raw = activeKeywordTab === 'positive' ? positiveKeywords : negativeKeywords;
        const sorted = [...raw].sort((a, b) => b.count - a.count);
        
        // Distribution Logic
        const total = sorted.length;
        
        // Dynamic chunk sizes based on total count
        const centerCount = Math.max(1, Math.floor(total * 0.15)); // Top ~15% (Biggest)
        const innerCount = Math.max(2, Math.floor(total * 0.35));  // Next ~35% (Medium)
        
        const centerItems = sorted.slice(0, centerCount);
        const innerItems = sorted.slice(centerCount, centerCount + innerCount);
        const outerItems = sorted.slice(centerCount + innerCount);
        
        // Split Inner and Outer into Top/Bottom halves for symmetry
        const innerTop = innerItems.slice(0, Math.ceil(innerItems.length / 2));
        const innerBottom = innerItems.slice(Math.ceil(innerItems.length / 2));
        
        const outerTop = outerItems.slice(0, Math.ceil(outerItems.length / 2));
        const outerBottom = outerItems.slice(Math.ceil(outerItems.length / 2));
        
        // Helper to organize a horizontal row with "Center Heaviest" logic
        const organizeRow = (items: typeof raw) => {
            const res: typeof raw = [];
            let left = true;
            items.forEach(item => {
                if(left) res.push(item); // Push right
                else res.unshift(item);  // Push left
                left = !left;
            });
            return res;
        };

        const renderRow = (items: typeof raw, baseSizeMult: number, className: string) => (
            <div className={`flex flex-wrap justify-center items-end gap-x-4 gap-y-2 ${className}`}>
                {organizeRow(items).map((item) => {
                    const colorIndex = item.word.length + item.count;
                    return (
                        <span 
                            key={item.word}
                            className={`font-bold cursor-default transition-all duration-300 hover:scale-110 leading-none ${colors[colorIndex % colors.length]}`}
                            style={{ 
                                fontSize: Math.max(0.6, 0.4 + (item.count / 100) * 2.5 * baseSizeMult) + 'rem',
                                opacity: 0.5 + (item.count / 100) * 0.5,
                                textShadow: item.count > 60 ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                            }}
                            title={`${item.word}: ${item.count}`}
                        >
                            {item.word}
                        </span>
                    );
                })}
            </div>
        );

        return (
            <div className="flex flex-col items-center justify-center py-6 min-h-[350px] select-none">
                {/* Layer 1: Outer Top (Smallest) */}
                {renderRow(outerTop, 0.8, "mb-2 opacity-80")}
                
                {/* Layer 2: Inner Top (Medium) */}
                {renderRow(innerTop, 0.9, "mb-1 opacity-90")}
                
                {/* Layer 3: Center (Biggest) */}
                {renderRow(centerItems, 1.1, "z-10 my-2")}
                
                {/* Layer 4: Inner Bottom (Medium) */}
                {renderRow(innerBottom, 0.9, "mt-1 opacity-90")}
                
                {/* Layer 5: Outer Bottom (Smallest) */}
                {renderRow(outerBottom, 0.8, "mt-2 opacity-80")}
            </div>
        );
    };

    return (
        <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-green-500" />
                    情感度分析 (Sentiment Analysis)
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sentiment Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-red-600" />
                        品牌情绪分布 (Sentiment Distribution)
                    </h3>
                    <div className="flex flex-col items-center h-[300px]">
                        <div className="w-full h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sentimentData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sentimentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full space-y-2 mt-4">
                            {sentimentData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-700 text-sm font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-gray-900 font-bold">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Industry Sentiment Words (Takes 2/3 width) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    {/* Header with Toggle */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                            行业情绪词 (Industry Sentiment Words)
                        </h3>
                        
                        {/* Pill Toggle */}
                        <div className="flex bg-white border border-gray-200 rounded-full p-1 shadow-sm w-full md:w-auto">
                            <button
                                onClick={() => setActiveKeywordTab('positive')}
                                className={`flex-1 md:w-28 py-1.5 px-4 rounded-full text-xs font-medium transition-all duration-300 ${
                                    activeKeywordTab === 'positive'
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                正面关键词
                            </button>
                            <button
                                onClick={() => setActiveKeywordTab('negative')}
                                className={`flex-1 md:w-28 py-1.5 px-4 rounded-full text-xs font-medium transition-all duration-300 ${
                                    activeKeywordTab === 'negative'
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                负面关键词
                            </button>
                        </div>
                    </div>

                    {/* Word Cloud Container */}
                    <div className="border border-gray-100 rounded-2xl bg-white h-[300px] flex items-center justify-center overflow-hidden">
                        {renderWordCloud()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentimentAnalysis;