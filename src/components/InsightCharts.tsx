import React, { useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, Cell,
    PieChart, Pie,
    Treemap,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { TrendingUp, BarChart2, PieChart as PieChartIcon, MessageSquare, Target, Hexagon } from 'lucide-react';

interface InsightChartsProps {
    brandName?: string;
}

const InsightCharts: React.FC<InsightChartsProps> = ({ brandName = '小鹏' }) => {
    // Keyword Toggle State
    const [activeKeywordTab, setActiveKeywordTab] = useState<'positive' | 'negative'>('negative');
    
    // Trend Time Filter State
    const [trendTimeFilter, setTrendTimeFilter] = useState<'day' | 'week' | 'month'>('day');

    // Radar Platform Filter State
    const [radarPlatform, setRadarPlatform] = useState<string>('Average');
    // Competitor Selection State (Multi-select)
    const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(['特斯拉']);

    const competitorsConfig = [
        { name: '特斯拉', color: '#525252' }, // neutral-700
        { name: '理想', color: '#f59e0b' },   // amber-500
        { name: '蔚来', color: '#3b82f6' },   // blue-500
        { name: '小米', color: '#f97316' },   // orange-500
        { name: '极氪', color: '#8b5cf6' },   // violet-500
    ];

    const toggleCompetitor = (name: string) => {
        setSelectedCompetitors(prev => 
            prev.includes(name) 
                ? prev.filter(c => c !== name) 
                : [...prev, name]
        );
    };

    const getCompetitorColor = (name: string) => {
        return competitorsConfig.find(c => c.name === name)?.color || '#9ca3af';
    };

    // 0. AI Brand Asset Radar Data (New)
    // Modified to include competitor data structure
    // A = Brand, [CompetitorName] = Competitor Data
    const radarDataMap: Record<string, any[]> = {
        'Average': [
            { subject: 'AI可见性 (Visibility)', brand: 120, fullMark: 150 },
            { subject: '情感健康度 (Sentiment)', brand: 98, fullMark: 150 },
            { subject: '推荐强度 (Recommendation)', brand: 86, fullMark: 150 },
            { subject: '内容准确性 (Accuracy)', brand: 99, fullMark: 150 },
            { subject: '话题权威性 (Authority)', brand: 85, fullMark: 150 },
            { subject: '交互潜力 (Interaction)', brand: 65, fullMark: 150 },
        ],
        'DeepSeek': [
            { subject: 'AI可见性 (Visibility)', brand: 140, fullMark: 150 },
            { subject: '情感健康度 (Sentiment)', brand: 110, fullMark: 150 },
            { subject: '推荐强度 (Recommendation)', brand: 100, fullMark: 150 },
            { subject: '内容准确性 (Accuracy)', brand: 120, fullMark: 150 },
            { subject: '话题权威性 (Authority)', brand: 100, fullMark: 150 },
            { subject: '交互潜力 (Interaction)', brand: 80, fullMark: 150 },
        ],
        '豆包': [
            { subject: 'AI可见性 (Visibility)', brand: 110, fullMark: 150 },
            { subject: '情感健康度 (Sentiment)', brand: 130, fullMark: 150 },
            { subject: '推荐强度 (Recommendation)', brand: 90, fullMark: 150 },
            { subject: '内容准确性 (Accuracy)', brand: 100, fullMark: 150 },
            { subject: '话题权威性 (Authority)', brand: 90, fullMark: 150 },
            { subject: '交互潜力 (Interaction)', brand: 70, fullMark: 150 },
        ]
    };

    // Simulate competitor data variation based on selection
    const getRadarData = () => {
        const baseData = radarDataMap[radarPlatform] || radarDataMap['Average'];
        
        return baseData.map(item => {
            const newItem: any = { ...item };
            // Generate mock data for each selected competitor
            selectedCompetitors.forEach(comp => {
                // Mock logic: generate different values based on competitor name length
                let baseValue = 100;
                if (comp === '特斯拉') baseValue = 130;
                if (comp === '理想') baseValue = 115;
                if (comp === '蔚来') baseValue = 120;
                if (comp === '小米') baseValue = 105;
                if (comp === '极氪') baseValue = 95;
                
                // Add some randomness based on subject length to vary the shape
                const variation = (item.subject.length % 5) * 5; 
                newItem[comp] = Math.min(150, Math.max(50, baseValue + variation));
            });
            return newItem;
        });
    };

    const currentRadarData = getRadarData();

    // 1. AI Mention Trend Data (Mock)
    const trendDataMap = {
        day: [
            { date: '12-10', brand: 12 },
            { date: '12-11', brand: 15 },
            { date: '12-12', brand: 18 },
            { date: '12-13', brand: 14 },
            { date: '12-14', brand: 22 },
            { date: '12-15', brand: 25 },
            { date: '12-16', brand: 28 },
        ],
        week: [
            { date: 'Week 46', brand: 45 },
            { date: 'Week 47', brand: 52 },
            { date: 'Week 48', brand: 48 },
            { date: 'Week 49', brand: 60 },
            { date: 'Week 50', brand: 65 },
        ],
        month: [
            { date: '2024-08', brand: 180 },
            { date: '2024-09', brand: 210 },
            { date: '2024-10', brand: 195 },
            { date: '2024-11', brand: 230 },
            { date: '2024-12', brand: 250 },
        ]
    };

    // Simulate trend variation
    const getTrendData = () => {
        const base = trendDataMap[trendTimeFilter];
        return base.map(item => {
            const newItem: any = { ...item };
            selectedCompetitors.forEach(comp => {
                 // Mock logic
                let baseValue = item.brand;
                if (comp === '特斯拉') baseValue += 10;
                if (comp === '理想') baseValue -= 5;
                if (comp === '蔚来') baseValue += 5;
                if (comp === '小米') baseValue -= 2;
                if (comp === '极氪') baseValue -= 8;
                
                // Add randomness based on date
                const variation = (item.date.length % 3) * 2;
                newItem[comp] = Math.max(0, baseValue + variation);
            });
            return newItem;
        });
    };

    const currentTrendData = getTrendData();

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
    // Enhanced with colors for cloud effect
    const colors = [
        'text-red-600', 'text-orange-500', 'text-blue-500', 'text-green-600', 
        'text-purple-600', 'text-indigo-500', 'text-pink-500', 'text-teal-600',
        'text-cyan-600', 'text-sky-500', 'text-rose-500', 'text-amber-600'
    ];

    const getRandomColor = (index: number) => colors[index % colors.length];

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
        // We split the sorted items into 5 layers vertically to simulate a sphere/cloud
        const total = sorted.length;
        
        // Dynamic chunk sizes based on total count
        const centerCount = Math.max(1, Math.floor(total * 0.15)); // Top ~15% (Biggest)
        const innerCount = Math.max(2, Math.floor(total * 0.35));  // Next ~35% (Medium)
        // The rest go to outer
        
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

    // 5. Source Distribution Data (Mock) - Treemap Format
    const sourceData = [
        { name: '百家号', value: 11.22, domain: 'baijiahao.baidu', color: '#34a853' },
        { name: '搜狐网', value: 5.95, domain: 'sohu.com', color: '#f57c00' },
        { name: '网易', value: 3.43, domain: '163.com', color: '#0277bd' },
        { name: '搜狐WAP', value: 3.37, domain: 'm.sohu.com', color: '#ef4444' },
        { name: '新浪财经', value: 3.09, domain: 'finance.sina', color: '#26a69a' },
        { name: '微信公众号', value: 3.00, domain: 'mp.weixin.qq', color: '#9c27b0' },
        { name: '今日头条', value: 2.61, domain: 'm.toutiao', color: '#ec407a' },
        { name: '博客园', value: 2.04, domain: 'cnblogs', color: '#03a9f4' },
        { name: '东方财富', value: 1.87, domain: 'pdf.dfcfw', color: '#ff5722' },
        { name: '哔哩哔哩', value: 1.59, domain: 'bilibili', color: '#8bc34a' },
    ];

    // Custom Content for Treemap Node
    const renderCustomizedContent = (props: any) => {
        const { root, depth, x, y, width, height, index, name, value, domain, color } = props;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: color,
                        stroke: '#fff',
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                    }}
                />
                {width > 50 && height > 50 && (
                    <foreignObject x={x} y={y} width={width} height={height}>
                        <div className="h-full w-full p-2 text-white overflow-hidden flex flex-col justify-start">
                            <div className="font-bold text-sm truncate">{name}</div>
                            <div className="text-xs opacity-80 truncate">{domain}</div>
                            <div className="text-xs font-medium mt-1">{value}%</div>
                        </div>
                    </foreignObject>
                )}
            </g>
        );
    };

    return (
        <div className="space-y-6 mb-8">
            {/* Section Header */}
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-800">全域诊断概览 (Global Diagnosis Overview)</h2>
                </div>
                
                {/* Competitor Selector */}
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 w-fit">
                    <span className="text-sm font-medium text-gray-500 px-2 shrink-0">对比竞品:</span>
                    <div className="flex gap-2 flex-wrap">
                        {competitorsConfig.map(comp => (
                            <button
                                key={comp.name}
                                onClick={() => toggleCompetitor(comp.name)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                                    selectedCompetitors.includes(comp.name) 
                                    ? 'bg-white shadow-sm border border-gray-200 font-bold' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                }`}
                                style={selectedCompetitors.includes(comp.name) ? { color: comp.color, borderColor: comp.color } : {}}
                            >
                                <span className={`w-2 h-2 rounded-full ${selectedCompetitors.includes(comp.name) ? '' : 'bg-gray-300'}`} 
                                      style={selectedCompetitors.includes(comp.name) ? { backgroundColor: comp.color } : {}} 
                                />
                                {comp.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 1: AI Brand Asset Radar & Mention Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI Brand Asset Radar */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <Hexagon className="w-5 h-5 text-red-600" />
                            数字品牌资产雷达 (Digital Brand Assets)
                        </h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-6 pl-7">对比维度：{brandName} vs 竞品 ({selectedCompetitors.length})</p>
                    
                    <div className="h-[300px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentRadarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name={brandName}
                                    dataKey="brand"
                                    stroke="#dc2626"
                                    strokeWidth={3}
                                    fill="#dc2626"
                                    fillOpacity={0.2}
                                />
                                {selectedCompetitors.map(compName => (
                                    <Radar
                                        key={compName}
                                        name={compName}
                                        dataKey={compName}
                                        stroke={getCompetitorColor(compName)}
                                        strokeWidth={2}
                                        fill={getCompetitorColor(compName)}
                                        fillOpacity={0.1}
                                    />
                                ))}
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Mention Trend */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-red-600" />
                            AI提及率趋势分析 (AI Mention Rate Trend)
                        </h3>
                        <div className="flex gap-2 text-sm items-center">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button 
                                    onClick={() => setTrendTimeFilter('day')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${trendTimeFilter === 'day' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    日
                                </button>
                                <button 
                                    onClick={() => setTrendTimeFilter('week')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${trendTimeFilter === 'week' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    周
                                </button>
                                <button 
                                    onClick={() => setTrendTimeFilter('month')}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${trendTimeFilter === 'month' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    月
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
                                {selectedCompetitors.map(compName => (
                                    <Line 
                                        key={compName}
                                        type="monotone" 
                                        dataKey={compName}
                                        stroke={getCompetitorColor(compName)}
                                        strokeWidth={2} 
                                        strokeDasharray="5 5"
                                        dot={false}
                                        name={compName}
                                    />
                                ))}
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row 2: Ranking & Sentiment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Ranking */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-red-600" />
                        品牌提及率排名 (Brand Share of Voice)
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
                        品牌情绪分布 (Sentiment Analysis)
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

            {/* Row 3: Keywords Cloud & Source Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Keywords Cloud (Unified & Refactored) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    {/* Header with Toggle */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-red-600" />
                            行业情绪词 (Industry Sentiment Words)
                        </h3>
                        
                        {/* Pill Toggle */}
                        <div className="flex bg-white border border-gray-200 rounded-full p-1 shadow-sm w-full md:w-auto">
                            <button
                                onClick={() => setActiveKeywordTab('positive')}
                                className={`flex-1 md:w-32 py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeKeywordTab === 'positive'
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                正面关键词
                            </button>
                            <button
                                onClick={() => setActiveKeywordTab('negative')}
                                className={`flex-1 md:w-32 py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
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
                    <div className="border border-gray-100 rounded-2xl bg-white">
                        {renderWordCloud()}
                    </div>
                </div>

                {/* Source Distribution */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-red-600" />
                        信源分布 (Source Distribution)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <Treemap
                                data={sourceData}
                                dataKey="value"
                                aspectRatio={4 / 3}
                                stroke="#fff"
                                fill="#8884d8"
                                content={renderCustomizedContent}
                            >
                                <Tooltip 
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
                                                    <p className="font-bold text-gray-800">{data.name}</p>
                                                    <p className="text-sm text-gray-500">{data.domain}</p>
                                                    <p className="text-sm font-medium text-red-600 mt-1">{data.value}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </Treemap>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightCharts;
