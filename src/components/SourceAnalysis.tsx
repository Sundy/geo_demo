import React, { useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    LineChart, Line, Legend, Treemap
} from 'recharts';
import { Globe, TrendingUp, ThumbsUp, FileText, ArrowUp, ArrowDown } from 'lucide-react';

interface SourceAnalysisProps {
    brandName?: string;
}

const SourceAnalysis: React.FC<SourceAnalysisProps> = ({ brandName = '小鹏' }) => {
    // 1. Source Metrics (Cards)
    const metrics = [
        { 
            title: '来源权重', 
            subtitle: 'Source Weight',
            value: '8.5', 
            max: '/10',
            change: '+0.3', 
            isPositive: true,
            icon: Globe,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        },
        { 
            title: '来源偏好度', 
            subtitle: 'Source Favorability',
            value: '高', 
            change: '稳定', 
            isPositive: true,
            icon: ThumbsUp,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
    ];

    // 2. Source Trend Data (Mock)
    const trendData = [
        { date: '12-16', weight: 8.1, favorability: 75 },
        { date: '12-17', weight: 8.3, favorability: 78 },
        { date: '12-18', weight: 8.2, favorability: 76 },
        { date: '12-19', weight: 8.5, favorability: 82 },
        { date: '12-20', weight: 8.4, favorability: 80 },
        { date: '12-21', weight: 8.6, favorability: 85 },
        { date: '12-22', weight: 8.5, favorability: 83 },
    ];

    // 3. Top Articles Data (Mock)
    const topArticles = [
        { rank: 1, title: '小鹏G6深度评测：智驾能否改变用车习惯？', source: '懂车帝', heat: 8520, sentiment: 'positive' },
        { rank: 2, title: '新能源汽车冬季续航大比拼，结果出人意料', source: '汽车之家', heat: 7890, sentiment: 'neutral' },
        { rank: 3, title: '800V平台普及加速，小鹏技术护城河还在吗？', source: '36氪', heat: 6540, sentiment: 'neutral' },
        { rank: 4, title: '用户真实口碑：提车3个月后的真实感受', source: '小红书', heat: 5980, sentiment: 'positive' },
        { rank: 5, title: '小鹏发布最新财报，毛利率显著提升', source: '新浪财经', heat: 5210, sentiment: 'positive' },
    ];

    // 4. Source Distribution Data (Mock) - Treemap Format
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
        <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section Header */}


            {/* Metrics & Trend Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Metrics Cards */}
                <div className="space-y-4">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow h-[140px]">
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">{metric.title}</p>
                                <p className="text-xs text-gray-400 mb-3">{metric.subtitle}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold text-gray-800">
                                        {metric.value}
                                        {metric.max && <span className="text-sm text-gray-400 font-normal">{metric.max}</span>}
                                    </h3>
                                </div>
                                <div className={`flex items-center text-xs font-medium mt-2 ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.isPositive && metric.change !== '稳定' ? <ArrowUp className="w-3 h-3 mr-1" /> : null}
                                    {metric.change}
                                    <span className="text-gray-400 ml-1 font-normal">较上周</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-lg ${metric.bg}`}>
                                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Middle Column: Source Trend */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        来源趋势 (Source Trend)
                    </h3>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} domain={[0, 10]} />
                                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} unit="%" />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="weight" 
                                    name="来源权重"
                                    stroke="#8b5cf6" 
                                    strokeWidth={3} 
                                    dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                                />
                                <Line 
                                    yAxisId="right"
                                    type="monotone" 
                                    dataKey="favorability" 
                                    name="偏好度"
                                    stroke="#10b981" 
                                    strokeWidth={2} 
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row 2: Top Articles & Source Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Top Articles List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Top引用文章 (Top Cited Articles)
                    </h3>
                    <div className="space-y-4">
                        {topArticles.map((article, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-default">
                                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-gray-100 text-xs font-bold ${idx < 3 ? 'text-red-600 bg-red-50' : 'text-gray-500'}`}>
                                    {article.rank}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                            {article.source}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                                            article.sentiment === 'positive' ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'
                                        }`}>
                                            {article.sentiment === 'positive' ? '正面' : '中立'}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs font-medium text-gray-400 whitespace-nowrap pt-1">
                                    热度 {article.heat}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Source Distribution (Integrated) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-red-600" />
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

export default SourceAnalysis;