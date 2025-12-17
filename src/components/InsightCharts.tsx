import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, Cell,
    PieChart, Pie
} from 'recharts';
import { TrendingUp, BarChart2, PieChart as PieChartIcon, MessageSquare } from 'lucide-react';

interface InsightChartsProps {
    brandName?: string;
}

const InsightCharts: React.FC<InsightChartsProps> = ({ brandName = '小鹏' }) => {
    
    // 1. AI Mention Trend Data (Mock)
    const trendData = [
        { date: '12-10', brand: 12, industry: 8 },
        { date: '12-11', brand: 15, industry: 9 },
        { date: '12-12', brand: 18, industry: 11 },
        { date: '12-13', brand: 14, industry: 10 },
        { date: '12-14', brand: 22, industry: 12 },
        { date: '12-15', brand: 25, industry: 14 },
        { date: '12-16', brand: 28, industry: 13 },
    ];

    // 2. Brand Ranking Data (Mock)
    const rankingData = [
        { name: '小鹏', value: 28, isMe: true },
        { name: '蔚来', value: 24, isMe: false },
        { name: '理想', value: 22, isMe: false },
        { name: '特斯拉', value: 19, isMe: false },
        { name: '极氪', value: 15, isMe: false },
        { name: '小米', value: 12, isMe: false },
    ];

    // 3. Sentiment Data (Mock)
    const sentimentData = [
        { name: '正面 (Positive)', value: 62, color: '#ef4444' }, // red-500
        { name: '中立 (Neutral)', value: 28, color: '#9ca3af' }, // gray-400
        { name: '负面 (Negative)', value: 10, color: '#fca5a5' }, // red-300
    ];

    // 4. Keywords Data (Mock)
    const positiveKeywords = [
        { word: '智驾领先', count: 88 },
        { word: '性价比高', count: 75 },
        { word: '续航扎实', count: 62 },
        { word: '外形科幻', count: 50 },
        { word: '充电快', count: 45 },
        { word: '空间大', count: 40 },
        { word: 'OTA频繁', count: 35 },
    ];

    const negativeKeywords = [
        { word: '内饰异味', count: 42 },
        { word: '隔音一般', count: 38 },
        { word: '售后网点少', count: 30 },
        { word: '底盘硬', count: 25 },
        { word: '车机偶尔卡顿', count: 20 },
    ];

    return (
        <div className="space-y-6 mb-8">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">品牌提及率</h2>
            </div>

            {/* Row 1: AI Mention Trend */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        AI提及率趋势分析 (AI Mention Rate Trend)
                    </h3>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-600"></span>
                            <span className="text-gray-600">{brandName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                            <span className="text-gray-600">行业均值</span>
                        </div>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} unit="%" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="brand" 
                                stroke="#dc2626" 
                                strokeWidth={3} 
                                dot={{ r: 4, fill: '#dc2626', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6 }}
                                name={brandName}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="industry" 
                                stroke="#9ca3af" 
                                strokeWidth={2} 
                                strokeDasharray="5 5"
                                dot={false}
                                name="行业均值"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row 2: Ranking & Sentiment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Ranking */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-red-600" />
                        品牌提及率排名
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rankingData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#4b5563', fontWeight: 500 }} 
                                    width={60}
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                    {rankingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.isMe ? '#dc2626' : '#e5e7eb'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-red-600" />
                        品牌情绪分布
                    </h3>
                    <div className="flex flex-col md:flex-row items-center h-[300px]">
                        <div className="w-full md:w-1/2 h-full">
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
                        <div className="w-full md:w-1/2 space-y-4 pl-4">
                            {sentimentData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-gray-900 font-bold">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 3: Keywords Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Positive Keywords */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        正面关键词 (Positive Keywords)
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {positiveKeywords.map((item, index) => (
                            <span 
                                key={index}
                                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors cursor-default"
                                style={{ 
                                    fontSize: Math.max(0.8, 1 + (item.count / 100) * 0.5) + 'rem',
                                    opacity: 0.6 + (item.count / 100) * 0.4
                                }}
                            >
                                {item.word}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Negative Keywords */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-red-600" />
                        负面关键词 (Negative Keywords)
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {negativeKeywords.map((item, index) => (
                            <span 
                                key={index}
                                className="px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors cursor-default"
                                style={{ 
                                    fontSize: Math.max(0.8, 1 + (item.count / 100) * 0.5) + 'rem',
                                    opacity: 0.6 + (item.count / 100) * 0.4
                                }}
                            >
                                {item.word}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightCharts;
