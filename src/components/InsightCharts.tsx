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
            { subject: 'AI搜索引擎流量监测', brand: 120, fullMark: 150 },
            { subject: '品牌AI情感度监测', brand: 98, fullMark: 150 },
            { subject: '品牌AI知名度监测', brand: 86, fullMark: 150 },
            { subject: '引用来源监测', brand: 99, fullMark: 150 },
            { subject: 'AI搜索热度', brand: 85, fullMark: 150 },
        ],
        'DeepSeek': [
            { subject: 'AI搜索引擎流量监测', brand: 140, fullMark: 150 },
            { subject: '品牌AI情感度监测', brand: 110, fullMark: 150 },
            { subject: '品牌AI知名度监测', brand: 100, fullMark: 150 },
            { subject: '引用来源监测', brand: 120, fullMark: 150 },
            { subject: 'AI搜索热度', brand: 100, fullMark: 150 },
        ],
        '豆包': [
            { subject: 'AI搜索引擎流量监测', brand: 110, fullMark: 150 },
            { subject: '品牌AI情感度监测', brand: 130, fullMark: 150 },
            { subject: '品牌AI知名度监测', brand: 90, fullMark: 150 },
            { subject: '引用来源监测', brand: 100, fullMark: 150 },
            { subject: 'AI搜索热度', brand: 90, fullMark: 150 },
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

    // 3. Source Distribution Data (Mock) - Treemap Format
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
            {/* Empty for now as all charts have been migrated */}
        </div>
    );
};

export default InsightCharts;
