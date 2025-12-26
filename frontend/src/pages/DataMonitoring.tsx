import React, { useState } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
    TrendingUp, TrendingDown, Calendar, Search, Filter, 
    ChevronDown, ChevronUp, Download, FileText,
    ArrowUpRight, ArrowDownRight, Activity, Zap, CheckCircle2, XCircle, Eye, HelpCircle,
    Bot, Sparkles, Moon, MessageSquare, Database, Target
} from 'lucide-react';

// --- Types ---

interface MonitoringPlan {
    id: number;
    name: string;
    coreIntent: string;
    startDate: string;
    status: 'active' | 'completed';
}

interface PlatformMetric {
    platform: string;
    isVisible: boolean;
    isRecommended: boolean;
    isTop3: boolean;
    isTop1: boolean;
    rank: number | string;
    archiveUrl: string;
}

interface IntentMetric {
    id: number;
    intent: string; // 核心意图或衍生问题
    hitWord: string; // 命中露出词
    checkCount: number; // 检测次数
    citationRate: string; // 引用率
    recommendationRate: string; // 推荐率
    top3Rate: string; // 前三率
    top1Rate: string; // 置顶率
    lastCheckTime: string;
    platforms: PlatformMetric[];
}

// --- Mock Data ---

const PLANS: MonitoringPlan[] = [
    { id: 101, name: '2025款纯电SUV首发评测', coreIntent: '20万左右性价比最高的电车推荐', startDate: '2024-12-01', status: 'active' },
    { id: 102, name: '春节自驾游安全指南', coreIntent: '长途驾驶电车注意事项', startDate: '2024-12-10', status: 'active' },
];

const MOCK_PLATFORM_DATA: Record<string, {
    metrics: { intentRate: string; citationRate: string; recRate: string; top1Rate: string; longTail: number };
    trend: { date: string; rate: number; optimizedRate: number; event: string | null }[];
}> = {
    'all': {
        metrics: { intentRate: '82.5%', citationRate: '72.8%', recRate: '58.2%', top1Rate: '21.4%', longTail: 15 },
        trend: [
            { date: '12-01', rate: 12, optimizedRate: 5, event: null },
            { date: '12-05', rate: 15, optimizedRate: 8, event: null },
            { date: '12-10', rate: 18, optimizedRate: 15, event: '计划启动' },
            { date: '12-15', rate: 25, optimizedRate: 30, event: null },
            { date: '12-20', rate: 42, optimizedRate: 55, event: '内容发布' },
            { date: '12-25', rate: 58, optimizedRate: 70, event: null },
            { date: '12-30', rate: 65, optimizedRate: 82, event: null },
            { date: '01-05', rate: 72, optimizedRate: 88, event: null },
        ]
    },
    'Deepseek': {
        metrics: { intentRate: '90.2%', citationRate: '85.4%', recRate: '68.5%', top1Rate: '32.1%', longTail: 8 },
        trend: [
            { date: '12-01', rate: 15, optimizedRate: 10, event: null },
            { date: '12-05', rate: 20, optimizedRate: 12, event: null },
            { date: '12-10', rate: 25, optimizedRate: 20, event: '计划启动' },
            { date: '12-15', rate: 35, optimizedRate: 40, event: null },
            { date: '12-20', rate: 55, optimizedRate: 65, event: '内容发布' },
            { date: '12-25', rate: 75, optimizedRate: 85, event: null },
            { date: '12-30', rate: 82, optimizedRate: 92, event: null },
            { date: '01-05', rate: 88, optimizedRate: 95, event: null },
        ]
    },
    '豆包': {
        metrics: { intentRate: '78.5%', citationRate: '68.2%', recRate: '52.4%', top1Rate: '18.5%', longTail: 6 },
        trend: [
            { date: '12-01', rate: 10, optimizedRate: 5, event: null },
            { date: '12-05', rate: 12, optimizedRate: 6, event: null },
            { date: '12-10', rate: 15, optimizedRate: 10, event: '计划启动' },
            { date: '12-15', rate: 20, optimizedRate: 25, event: null },
            { date: '12-20', rate: 35, optimizedRate: 45, event: '内容发布' },
            { date: '12-25', rate: 48, optimizedRate: 60, event: null },
            { date: '12-30', rate: 55, optimizedRate: 70, event: null },
            { date: '01-05', rate: 62, optimizedRate: 78, event: null },
        ]
    },
    '腾讯元宝': {
        metrics: { intentRate: '75.0%', citationRate: '65.1%', recRate: '48.9%', top1Rate: '15.2%', longTail: 4 },
        trend: [
            { date: '12-01', rate: 8, optimizedRate: 4, event: null },
            { date: '12-05', rate: 10, optimizedRate: 5, event: null },
            { date: '12-10', rate: 12, optimizedRate: 8, event: '计划启动' },
            { date: '12-15', rate: 18, optimizedRate: 15, event: null },
            { date: '12-20', rate: 30, optimizedRate: 25, event: '内容发布' },
            { date: '12-25', rate: 42, optimizedRate: 35, event: null },
            { date: '12-30', rate: 50, optimizedRate: 45, event: null },
            { date: '01-05', rate: 58, optimizedRate: 52, event: null },
        ]
    },
    '千问': {
        metrics: { intentRate: '81.3%', citationRate: '70.5%', recRate: '55.3%', top1Rate: '20.1%', longTail: 7 },
        trend: [
            { date: '12-01', rate: 11, optimizedRate: 6, event: null },
            { date: '12-05', rate: 14, optimizedRate: 8, event: null },
            { date: '12-10', rate: 17, optimizedRate: 12, event: '计划启动' },
            { date: '12-15', rate: 24, optimizedRate: 20, event: null },
            { date: '12-20', rate: 40, optimizedRate: 35, event: '内容发布' },
            { date: '12-25', rate: 56, optimizedRate: 48, event: null },
            { date: '12-30', rate: 63, optimizedRate: 58, event: null },
            { date: '01-05', rate: 70, optimizedRate: 65, event: null },
        ]
    },
    'Kimi': {
        metrics: { intentRate: '86.7%', citationRate: '75.8%', recRate: '62.1%', top1Rate: '25.4%', longTail: 9 },
        trend: [
            { date: '12-01', rate: 13, optimizedRate: 7, event: null },
            { date: '12-05', rate: 16, optimizedRate: 9, event: null },
            { date: '12-10', rate: 20, optimizedRate: 15, event: '计划启动' },
            { date: '12-15', rate: 28, optimizedRate: 25, event: null },
            { date: '12-20', rate: 45, optimizedRate: 40, event: '内容发布' },
            { date: '12-25', rate: 62, optimizedRate: 55, event: null },
            { date: '12-30', rate: 70, optimizedRate: 65, event: null },
            { date: '01-05', rate: 78, optimizedRate: 72, event: null },
        ]
    },
    '文心一言': {
        metrics: { intentRate: '72.1%', citationRate: '62.4%', recRate: '45.8%', top1Rate: '12.5%', longTail: 5 },
        trend: [
            { date: '12-01', rate: 9, optimizedRate: 4, event: null },
            { date: '12-05', rate: 11, optimizedRate: 5, event: null },
            { date: '12-10', rate: 13, optimizedRate: 7, event: '计划启动' },
            { date: '12-15', rate: 19, optimizedRate: 12, event: null },
            { date: '12-20', rate: 32, optimizedRate: 20, event: '内容发布' },
            { date: '12-25', rate: 45, optimizedRate: 30, event: null },
            { date: '12-30', rate: 52, optimizedRate: 38, event: null },
            { date: '01-05', rate: 60, optimizedRate: 45, event: null },
        ]
    }
};

const INTENT_METRICS: IntentMetric[] = [
    {
        id: 1,
        intent: '2025年性价比高的新能源SUV推荐',
        hitWord: '小鹏G6',
        checkCount: 5,
        citationRate: '80%',
        recommendationRate: '60%',
        top3Rate: '40%',
        top1Rate: '20%',
        lastCheckTime: '2025-12-17 14:20',
        platforms: [
            { platform: 'Deepseek', isVisible: true, isRecommended: true, isTop3: true, isTop1: false, rank: 2, archiveUrl: '#' },
            { platform: 'Kimi', isVisible: true, isRecommended: true, isTop3: false, isTop1: false, rank: 5, archiveUrl: '#' },
            { platform: '豆包', isVisible: true, isRecommended: false, isTop3: false, isTop1: false, rank: 8, archiveUrl: '#' },
        ]
    },
    {
        id: 2,
        intent: '20万左右纯电SUV续航最扎实的',
        hitWord: '小鹏G6',
        checkCount: 8,
        citationRate: '90%',
        recommendationRate: '75%',
        top3Rate: '50%',
        top1Rate: '25%',
        lastCheckTime: '2025-12-17 12:00',
        platforms: [
            { platform: 'Deepseek', isVisible: true, isRecommended: true, isTop3: true, isTop1: true, rank: 1, archiveUrl: '#' },
            { platform: '千问', isVisible: true, isRecommended: true, isTop3: true, isTop1: false, rank: 3, archiveUrl: '#' },
        ]
    }
];

const DataMonitoring: React.FC = () => {
    const [selectedPlanId, setSelectedPlanId] = useState<number>(PLANS[0].id);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'custom'>('30d');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [isExporting, setIsExporting] = useState(false);
    const [chartTimeScale, setChartTimeScale] = useState<'day' | 'week' | 'month'>('day');
    
    // State to track expanded items
    const [expandedIntentIds, setExpandedIntentIds] = useState<number[]>([]);

    const currentPlan = PLANS.find(p => p.id === selectedPlanId);

    const toggleExpand = (id: number) => {
        setExpandedIntentIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Get dynamic data based on selected platform
    const currentData = MOCK_PLATFORM_DATA[selectedPlatform] || MOCK_PLATFORM_DATA['all'];
    const { metrics, trend } = currentData;

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert('监测报告已导出！');
        }, 1500);
    };

    return (
        <div className="page-container fade-in p-6">
            <header className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">数据监测追踪 (Data Monitoring)</h1>
                        <p className="text-gray-500">基于创作计划的全链路效果追踪，可视化呈现 GEO 优化价值。</p>
                    </div>
                </div>
                
                {/* Plan Selector & Filter Bar */}
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        {/* Plan Select */}
                        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm w-fit">
                            <span className="text-sm font-medium text-gray-500 pl-2">监测计划:</span>
                            <select 
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block p-2 min-w-[200px]"
                                value={selectedPlanId}
                                onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                            >
                                {PLANS.map(plan => (
                                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Bar Style */}
                        <div className="flex items-center gap-4 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm w-fit">
                             {/* Platforms */}
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                <button 
                                    onClick={() => setSelectedPlatform('all')}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                        selectedPlatform === 'all' 
                                        ? 'bg-red-600 text-white shadow-md' 
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    全平台
                                </button>
                                
                                <button 
                                    onClick={() => setSelectedPlatform('Deepseek')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                                        selectedPlatform === 'Deepseek'
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <Bot className="w-3.5 h-3.5" /> DeepSeek
                                </button>

                                <button 
                                    onClick={() => setSelectedPlatform('豆包')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                                        selectedPlatform === '豆包'
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <Sparkles className="w-3.5 h-3.5" /> 豆包
                                </button>

                                <button 
                                    onClick={() => setSelectedPlatform('腾讯元宝')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                                        selectedPlatform === '腾讯元宝'
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <MessageSquare className="w-3.5 h-3.5" /> 腾讯元宝
                                </button>

                                <button 
                                    onClick={() => setSelectedPlatform('千问')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                                        selectedPlatform === '千问'
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <Zap className="w-3.5 h-3.5" /> 千问
                                </button>

                                <button 
                                    onClick={() => setSelectedPlatform('Kimi')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                                        selectedPlatform === 'Kimi'
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <Moon className="w-3.5 h-3.5" /> Kimi
                                </button>

                                <button 
                                    onClick={() => setSelectedPlatform('文心一言')}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border whitespace-nowrap ${
                                        selectedPlatform === '文心一言'
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'bg-white text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <MessageSquare className="w-3.5 h-3.5" /> 文心
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <Target className="w-6 h-6 text-orange-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +18.2%
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.intentRate}</div>
                    <div className="text-sm text-gray-500">意图达成率 (Intent Rate)</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <Zap className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +24.5%
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.citationRate}</div>
                    <div className="text-sm text-gray-500">引用率 (Citation Rate)</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Activity className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +12.3%
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.recRate}</div>
                    <div className="text-sm text-gray-500">推荐率 (Rec. Rate)</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-yellow-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +8.5%
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.top1Rate}</div>
                    <div className="text-sm text-gray-500">置顶率 (Top 1 Rate)</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Search className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            稳定
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.longTail} 个</div>
                    <div className="text-sm text-gray-500">覆盖长尾意图数量</div>
                </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">意图渗透率趋势 (Intent Penetration)</h3>
                        <p className="text-sm text-gray-500">核心意图：{currentPlan?.coreIntent}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 justify-end">
                        {/* Time Range */}
                        <div className="flex items-center gap-2">
                            {['7d', '30d', 'custom'].map((range) => (
                                <button 
                                    key={range}
                                    onClick={() => setTimeRange(range as any)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                                        timeRange === range 
                                        ? 'bg-red-50 text-red-600 border border-red-100' 
                                        : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                                    }`}
                                >
                                    {range === '7d' ? '近7天' : range === '30d' ? '近30天' : '自定义'}
                                </button>
                            ))}
                        </div>

                        {timeRange === 'custom' && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                                <input 
                                    type="date" 
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50"
                                />
                                <span className="text-gray-400">-</span>
                                <input 
                                    type="date" 
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50"
                                />
                            </div>
                        )}

                        <div className="w-px h-6 bg-gray-200 mx-1"></div>

                        <div className="flex gap-2">
                            {['day', 'week', 'month'].map((scale) => (
                                <button 
                                    key={scale}
                                    onClick={() => setChartTimeScale(scale as any)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                        chartTimeScale === scale 
                                        ? 'bg-gray-900 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {scale === 'day' ? '日' : scale === 'week' ? '周' : '月'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} unit="%" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="rate" 
                                stroke="#ef4444" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorRate)" 
                                name="总体意图渗透率"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="optimizedRate" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                fillOpacity={1} 
                                fill="url(#colorOptimized)" 
                                name="优化词增长曲线"
                            />
                            {/* Event Markers */}
                            {trend.map((entry, index) => (
                                entry.event && (
                                    <ReferenceLine 
                                        key={index} 
                                        x={entry.date} 
                                        stroke="#3b82f6" 
                                        strokeDasharray="3 3"
                                        label={{ position: 'top', value: entry.event, fill: '#3b82f6', fontSize: 12 }} 
                                    />
                                )
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detail List */}
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">意图监测详情 (Intent Details)</h3>
                    <button 
                        onClick={handleExport}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        {isExporting ? '导出中...' : '下载数据'}
                    </button>
                </div>

                {INTENT_METRICS.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Header Row */}
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">提示词内容</div>
                                    <div className="text-lg font-bold text-gray-900 flex items-center gap-3">
                                        {item.intent}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        命中露出词：<span className="font-medium text-gray-800">{item.hitWord}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 text-center">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">检测次数</div>
                                        <div className="font-bold text-gray-900">{item.checkCount}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">引用率</div>
                                        <div className="font-bold text-gray-900">{item.citationRate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">推荐率</div>
                                        <div className="font-bold text-gray-900">{item.recommendationRate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">前三率</div>
                                        <div className="font-bold text-gray-900">{item.top3Rate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">置顶率</div>
                                        <div className="font-bold text-gray-900">{item.top1Rate}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400 mb-2">检测时间: {item.lastCheckTime}</div>
                                    <button 
                                        onClick={() => toggleExpand(item.id)}
                                        className="flex items-center gap-1 text-red-600 text-sm font-medium hover:text-red-700 bg-white border border-red-200 px-3 py-1.5 rounded-lg shadow-sm"
                                    >
                                        {expandedIntentIds.includes(item.id) ? '收起结果' : '查看详情'}
                                        {expandedIntentIds.includes(item.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details Table */}
                        {expandedIntentIds.includes(item.id) && (
                            <div className="p-6 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                                    <div>
                                        平台选择: <span className="font-medium text-gray-900">DeepSeek, Kimi, 豆包...</span> 
                                        <span className="mx-2 text-gray-300">|</span> 
                                        检测时间: {item.lastCheckTime}
                                    </div>
                                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                                        <Download className="w-4 h-4" /> 数据下载
                                    </button>
                                </div>
                                <div className="overflow-x-auto rounded-lg border border-gray-100">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                                            <tr>
                                                <th className="px-4 py-3">平台</th>
                                                <th className="px-4 py-3">测试提示词</th>
                                                <th className="px-4 py-3">露出词</th>
                                                <th className="px-4 py-3 text-center">是否被推荐</th>
                                                <th className="px-4 py-3 text-center">是否前三</th>
                                                <th className="px-4 py-3 text-center">是否置顶</th>
                                                <th className="px-4 py-3 text-center">排名</th>
                                                <th className="px-4 py-3 text-right">测试存档</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {item.platforms.map((platform, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">{platform.platform}</td>
                                                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate" title={item.intent}>{item.intent}</td>
                                                    <td className="px-4 py-3 text-gray-900">{item.hitWord}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        {platform.isRecommended ? (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-gray-200 mx-auto" />
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        {platform.isTop3 ? (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-gray-200 mx-auto" />
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        {platform.isTop1 ? (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-gray-200 mx-auto" />
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center font-bold text-gray-700">{platform.rank}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <a href={platform.archiveUrl} className="text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1">
                                                            <FileText className="w-3.5 h-3.5" /> 查看档案
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataMonitoring;