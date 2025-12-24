import React, { useState, useEffect } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    LineChart, Line, Legend, Brush, ReferenceLine, AreaChart, Area
} from 'recharts';
import { Activity, Flame, Search, MapPin, Calendar, TrendingUp, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchHeatAnalysisProps {
    brandName?: string;
    timeRange?: string;
}

const SearchHeatAnalysis: React.FC<SearchHeatAnalysisProps> = ({ brandName = '小鹏', timeRange = '近7天' }) => {
    const navigate = useNavigate();
    
    // Trend Time Filter State (Defaults to 'day' to match 24H trend, but can be toggled)
    const [trendUnit, setTrendUnit] = useState<'day' | 'week' | 'month'>('day');

    // 1. Mock Data for Lists
    const industryHotSearch = [
        { rank: 1, question: '2024年值得买的新能源SUV有哪些？', keyword: '新能源SUV推荐', heat: 9850 },
        { rank: 2, question: '纯电动车续航里程真实排行', keyword: '续航排行', heat: 8720 },
        { rank: 3, question: '800V高压快充车型优缺点分析', keyword: '800V快充', heat: 7650 },
        { rank: 4, question: '家用6座/7座SUV哪款性价比高？', keyword: '家用SUV性价比', heat: 6980 },
        { rank: 5, question: '自动驾驶辅助系统哪个品牌最好用？', keyword: '智驾对比', heat: 6540 },
        { rank: 6, question: '新能源车电池寿命和更换成本', keyword: '电池寿命', heat: 5890 },
    ];

    const brandHotSearch = [
        { rank: 1, question: '小鹏G6和Model Y怎么选？', keyword: 'G6 vs Model Y', heat: 9200 },
        { rank: 2, question: '小鹏XNGP在哪些城市能用？', keyword: 'XNGP开城', heat: 8100 },
        { rank: 3, question: '小鹏G9内饰有没有异味？', keyword: 'G9内饰', heat: 6800 },
        { rank: 4, question: '小鹏汽车最新的OTA升级内容', keyword: 'OTA升级', heat: 5400 },
        { rank: 5, question: '小鹏MONA M03试驾体验', keyword: 'MONA M03', heat: 4900 },
        { rank: 6, question: '小鹏充电桩安装费用多少？', keyword: '充电桩安装', heat: 4200 },
    ];

    const competitorHotSearch = [
        { rank: 1, question: '特斯拉Model Y改款什么时候出？', keyword: 'Model Y改款', heat: 9500 },
        { rank: 2, question: '小米SU7提车周期要多久？', keyword: '小米SU7交付', heat: 8900 },
        { rank: 3, question: '蔚来BaaS方案划算吗？', keyword: '蔚来BaaS', heat: 7200 },
        { rank: 4, question: '理想L6落地价多少？', keyword: '理想L6价格', heat: 6800 },
        { rank: 5, question: '极氪001新款有什么区别？', keyword: '极氪001改款', heat: 5600 },
        { rank: 6, question: '比亚迪汉荣耀版配置参数', keyword: '比亚迪汉', heat: 5100 },
    ];

    // 2. Mock Data for Charts
    const cityData = [
        { name: '上海', value: 92 }, { name: '北京', value: 78 }, { name: '深圳', value: 75 }, 
        { name: '广州', value: 72 }, { name: '杭州', value: 58 }, { name: '成都', value: 55 },
        { name: '苏州', value: 52 }, { name: '武汉', value: 48 }, { name: '南京', value: 45 },
        { name: '重庆', value: 42 }, 
    ];

    // Dynamic Trend Data based on Filter
    const getTrendData = () => {
        if (trendUnit === 'day') {
            // Daily Granularity (e.g., last 10 days)
            return [
                { time: '12-14', heat: 5200 }, { time: '12-15', heat: 5800 }, { time: '12-16', heat: 6100 },
                { time: '12-17', heat: 5900 }, { time: '12-18', heat: 6800 }, { time: '12-19', heat: 8500 },
                { time: '12-20', heat: 9200 }, { time: '12-21', heat: 8800 }, { time: '12-22', heat: 7500 },
                { time: '12-23', heat: 8100 },
            ];
        } else if (trendUnit === 'week') {
            // Weekly Granularity (e.g., last 8 weeks) - Displaying start date of the week or Week Num
            return [
                { time: '10.28-11.03', heat: 35000 }, 
                { time: '11.04-11.10', heat: 38000 }, 
                { time: '11.11-11.17', heat: 42000 },
                { time: '11.18-11.24', heat: 40500 }, 
                { time: '11.25-12.01', heat: 45000 }, 
                { time: '12.02-12.08', heat: 48000 },
                { time: '12.09-12.15', heat: 52000 },
                { time: '12.16-12.22', heat: 55000 },
            ];
        } else {
            // Monthly Granularity (e.g., last 6 months)
            return [
                { time: '2024-07', heat: 120000 }, 
                { time: '2024-08', heat: 135000 }, 
                { time: '2024-09', heat: 150000 },
                { time: '2024-10', heat: 142000 }, 
                { time: '2024-11', heat: 168000 }, 
                { time: '2024-12', heat: 185000 },
            ];
        }
    };

    const trendData = getTrendData();
    const avgHeat = Math.round(trendData.reduce((acc, curr) => acc + curr.heat, 0) / trendData.length);

    // Custom Dot Component
    const CustomDot = (props: any) => {
        const { cx, cy, stroke, payload, value } = props;
        
        // Highlight logic: e.g., if heat is significantly higher than avg or specific points
        const isHigh = value > avgHeat * 1.1;
        const isLow = value < avgHeat * 0.9;
        
        if (isHigh || isLow) {
             return (
                <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="white" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="4" stroke={isHigh ? "#ef4444" : "#f59e0b"} strokeWidth="2" fill="white" />
                    <circle cx="6" cy="6" r="6" stroke={isHigh ? "#ef4444" : "#f59e0b"} strokeWidth="2" fill="none" opacity="0.3" />
                </svg>
            );
        }
        return null; // Don't render default dots for normal points to keep it clean like the reference
    };

    // Helper Component for List
    const SearchList = ({ title, icon: Icon, data, colorClass }: { title: string, icon: any, data: any[], colorClass: string }) => {
        // Only show top 3 items
        const displayedData = data.slice(0, 3);

        return (
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 min-w-[300px] flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${colorClass} bg-opacity-10`}>
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                    </div>
                    {title}
                </h3>
                <div className="space-y-3 flex-1">
                    {/* Header */}
                    <div className="flex text-xs font-medium text-gray-400 pb-2 border-b border-gray-50">
                        <span className="w-8 text-center">排名</span>
                        <span className="flex-1 px-2">热门问题 / 意向词</span>
                        <span className="w-16 text-right">热度</span>
                    </div>
                    {/* Rows */}
                    {displayedData.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm group hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-default">
                            <span className={`w-8 text-center font-bold ${item.rank <= 3 ? 'text-red-500' : 'text-gray-400'}`}>
                                {item.rank}
                            </span>
                            <div className="flex-1 px-2 min-w-0">
                                <div className="font-medium text-gray-800 truncate" title={item.question}>
                                    {item.question}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                    <Search className="w-3 h-3 text-gray-300" />
                                    {item.keyword}
                                </div>
                            </div>
                            <div className="w-16 text-right font-medium text-orange-500 flex items-center justify-end gap-1">
                                <Flame className="w-3 h-3" />
                                {(item.heat / 1000).toFixed(1)}k
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View More Button (Navigates to Detail Page) */}
                <div className="mt-4 pt-2 border-t border-gray-50 text-center">
                    <button 
                        onClick={() => navigate('/insight/search-detail')}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 w-full py-1 transition-colors"
                    >
                        查看更多 <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-orange-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-500" />
                    AI搜索热度详情分析 (Search Heat Analysis)
                </h2>
                <span className="text-sm text-gray-500 ml-2 font-medium bg-gray-100 px-2 py-0.5 rounded text-xs">
                    统计周期: {timeRange}
                </span>
            </div>

            {/* Row 1: Search Lists */}
            <div className="flex flex-col lg:flex-row gap-6">
                <SearchList 
                    title="行业热门搜索" 
                    icon={Search} 
                    data={industryHotSearch} 
                    colorClass="text-blue-600" 
                />
                <SearchList 
                    title="品牌热门搜索" 
                    icon={Flame} 
                    data={brandHotSearch} 
                    colorClass="text-red-600" 
                />
                <SearchList 
                    title="竞品热门搜索" 
                    icon={TrendingUp} 
                    data={competitorHotSearch} 
                    colorClass="text-purple-600" 
                />
            </div>

            {/* Row 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* City Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        热门城市分布 (Top 10 Cities)
                    </h3>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#6b7280', fontSize: 10 }} 
                                    interval={0}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <Tooltip 
                                    cursor={{ fill: '#f9fafb' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="热度指数" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Trend Chart - Refined Style */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                                <span className="font-bold text-gray-800 text-sm">{brandName}</span>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span>同比 <span className="text-green-500">+155.41%</span></span>
                                <span className="w-px h-3 bg-gray-300"></span>
                                <span>环比 <span className="text-green-500">+77.38%</span></span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                平均值 {(avgHeat / 1000).toFixed(1)}万
                            </div>
                        </div>
                        
                        {/* Time Unit Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button 
                                onClick={() => setTrendUnit('day')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${trendUnit === 'day' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                按日
                            </button>
                            <button 
                                onClick={() => setTrendUnit('week')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${trendUnit === 'week' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                按周
                            </button>
                            <button 
                                onClick={() => setTrendUnit('month')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${trendUnit === 'month' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                按月
                            </button>
                        </div>
                    </div>

                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis 
                                    dataKey="time" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#9ca3af', fontSize: 11 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#9ca3af', fontSize: 11 }} 
                                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}万`}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: number) => [`${(value / 1000).toFixed(2)}万`, '热度']}
                                />
                                <ReferenceLine y={avgHeat} stroke="#93c5fd" strokeDasharray="3 3" label={{ position: 'right', value: `${(avgHeat/1000).toFixed(1)}万`, fill: '#3b82f6', fontSize: 10 }} />
                                <Line 
                                    type="linear" 
                                    dataKey="heat" 
                                    stroke="#3b82f6" 
                                    strokeWidth={2} 
                                    dot={<CustomDot />}
                                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
                                    name="搜索热度"
                                />
                                <Brush 
                                    dataKey="time" 
                                    height={30} 
                                    stroke="#e5e7eb"
                                    fill="#f9fafb"
                                    tickFormatter={() => ''}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchHeatAnalysis;