import React, { useState } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { MessageCircle, TrendingUp, Award, PieChart, ArrowUp, ArrowDown, BarChart2 } from 'lucide-react';

interface MentionRateAnalysisProps {
    brandName?: string;
}

const MentionRateAnalysis: React.FC<MentionRateAnalysisProps> = ({ brandName = '小鹏' }) => {
    const [trendTimeFilter, setTrendTimeFilter] = useState<'day' | 'week' | 'month'>('day');

    // 1. Metrics Data
    const metrics = [
        { 
            title: '提及率', 
            subtitle: 'Mention Rate',
            value: '4.7%', 
            change: '+0.5%', 
            isPositive: true,
            icon: MessageCircle,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        { 
            title: 'Top3 提及率', 
            subtitle: 'Top 3 Mention Rate',
            value: '12.5%', 
            change: '+1.2%', 
            isPositive: true,
            icon: TrendingUp,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50'
        },
        { 
            title: 'Top1 提及率', 
            subtitle: 'Top 1 Mention Rate',
            value: '40.8%', 
            change: '+1.8%', 
            isPositive: true,
            icon: Award,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        { 
            title: '提及份额 (SOV)', 
            subtitle: 'Share of Voice',
            value: '15.2%', 
            change: '-0.4%', 
            isPositive: false,
            icon: PieChart,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
    ];

    // 2. Trend Data (Mock)
    const trendDataMap = {
        day: [
            { date: '12-16', brand: 4.2, comp1: 3.8, comp2: 5.1 },
            { date: '12-17', brand: 4.5, comp1: 3.9, comp2: 4.8 },
            { date: '12-18', brand: 4.8, comp1: 4.1, comp2: 4.5 },
            { date: '12-19', brand: 5.2, comp1: 4.0, comp2: 4.2 },
            { date: '12-20', brand: 4.9, comp1: 4.2, comp2: 4.6 },
            { date: '12-21', brand: 4.7, comp1: 4.3, comp2: 4.9 },
            { date: '12-22', brand: 5.0, comp1: 4.1, comp2: 4.7 },
        ],
        week: [
            { date: 'Week 48', brand: 4.1, comp1: 3.5, comp2: 4.8 },
            { date: 'Week 49', brand: 4.3, comp1: 3.7, comp2: 4.6 },
            { date: 'Week 50', brand: 4.5, comp1: 3.8, comp2: 4.5 },
            { date: 'Week 51', brand: 4.7, comp1: 4.0, comp2: 4.3 },
            { date: 'Week 52', brand: 4.8, comp1: 4.1, comp2: 4.2 },
        ],
        month: [
            { date: '2024-08', brand: 3.8, comp1: 3.2, comp2: 5.5 },
            { date: '2024-09', brand: 4.0, comp1: 3.4, comp2: 5.2 },
            { date: '2024-10', brand: 4.2, comp1: 3.6, comp2: 4.9 },
            { date: '2024-11', brand: 4.5, comp1: 3.8, comp2: 4.6 },
            { date: '2024-12', brand: 4.7, comp1: 4.0, comp2: 4.4 },
        ]
    };

    // 3. Ranking Data (Mock)
    const rankingData = [
        { name: '小鹏', value: 28, isMe: true },
        { name: '蔚来', value: 24, isMe: false },
        { name: '理想', value: 22, isMe: false },
        { name: '特斯拉', value: 19, isMe: false },
        { name: '极氪', value: 15, isMe: false },
        { name: '小米', value: 12, isMe: false },
        { name: '比亚迪', value: 10, isMe: false },
        { name: '问界', value: 9, isMe: false },
    ];

    return (
        <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section Header */}

            {/* 1. Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">{metric.title}</p>
                            <p className="text-xs text-gray-400 mb-2">{metric.subtitle}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
                                <span className={`flex items-center text-xs font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                    {metric.change}
                                </span>
                            </div>
                        </div>
                        <div className={`p-2 rounded-lg ${metric.bg}`}>
                            <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Trend Chart (Takes 2/3 width) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            AI提及率趋势 (Mention Trend)
                        </h3>
                        {/* Time Filter */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {(['day', 'week', 'month'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTrendTimeFilter(t)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                        trendTimeFilter === t 
                                        ? 'bg-white text-blue-600 shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {t === 'day' ? '日' : t === 'week' ? '周' : '月'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendDataMap[trendTimeFilter]} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} unit="%" />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                <Line 
                                    type="monotone" 
                                    dataKey="brand" 
                                    name={brandName}
                                    stroke="#2563eb" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="comp1" 
                                    name="特斯拉"
                                    stroke="#9ca3af" 
                                    strokeWidth={2} 
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="comp2" 
                                    name="理想"
                                    stroke="#f59e0b" 
                                    strokeWidth={2} 
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Ranking Chart (Takes 1/3 width) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-purple-600" />
                        提及份额排名 (SOV Ranking)
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
                                    tick={{ fill: '#4b5563', fontWeight: 500, fontSize: 12 }} 
                                    width={50}
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {rankingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.isMe ? '#2563eb' : '#e5e7eb'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentionRateAnalysis;