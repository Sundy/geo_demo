import React, { useState } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
    TrendingUp, TrendingDown, Calendar, Search, Filter, 
    ArrowUpRight, ArrowDownRight, Activity, Zap, CheckCircle2, XCircle, Eye, HelpCircle,
    Bot, Sparkles, Moon, MessageSquare
} from 'lucide-react';

// --- Types ---

interface MonitoringPlan {
    id: number;
    name: string;
    coreIntent: string;
    startDate: string;
    status: 'active' | 'completed';
}

interface IntentMetric {
    id: number;
    intent: string; // 核心意图或衍生问题
    isVisible: boolean; // 是否露出
    rank: 'Top 1' | 'Top 3' | '上榜'; // 排名
    impressionRate: string; // 展现率
    growth: number; // 环比增长
    aiSummary: string; // AI 评价摘要
    platform: string; // 来源平台
    lastUpdated: string;
}

// --- Mock Data ---

const PLANS: MonitoringPlan[] = [
    { id: 101, name: '2025款纯电SUV首发评测', coreIntent: '20万左右性价比最高的电车推荐', startDate: '2024-12-01', status: 'active' },
    { id: 102, name: '春节自驾游安全指南', coreIntent: '长途驾驶电车注意事项', startDate: '2024-12-10', status: 'active' },
];

const TREND_DATA = [
    { date: '12-01', rate: 12, event: null },
    { date: '12-05', rate: 15, event: null },
    { date: '12-10', rate: 18, event: '计划启动' },
    { date: '12-15', rate: 25, event: null },
    { date: '12-20', rate: 42, event: '内容发布' },
    { date: '12-25', rate: 58, event: null },
    { date: '12-30', rate: 65, event: null },
    { date: '01-05', rate: 72, event: null },
];

const INTENT_METRICS: IntentMetric[] = [
    {
        id: 1,
        intent: '20万左右性价比最高的电车推荐',
        isVisible: true,
        rank: 'Top 1',
        impressionRate: '85%',
        growth: 15.5,
        aiSummary: 'AI首推小鹏G6，强调其800V架构与智驾优势，引用了汽车之家评测。',
        platform: 'Deepseek',
        lastUpdated: '10分钟前'
    },
    {
        id: 2,
        intent: '2025纯电SUV续航真实排行',
        isVisible: true,
        rank: 'Top 3',
        impressionRate: '62%',
        growth: 8.2,
        aiSummary: '位于特斯拉Model Y之后，但被标注为"续航达成率最高"。',
        platform: '千问',
        lastUpdated: '1小时前'
    },
    {
        id: 3,
        intent: '小鹏G6怎么样值得买吗',
        isVisible: true,
        rank: 'Top 1',
        impressionRate: '92%',
        growth: 24.0,
        aiSummary: '正面评价为主，大量引用了知乎用户真实用车反馈。',
        platform: '豆包',
        lastUpdated: '2小时前'
    },
    {
        id: 4,
        intent: '20万预算买电车还是油车',
        isVisible: true,
        rank: '上榜',
        impressionRate: '45%',
        growth: -2.1,
        aiSummary: '在对比列表中被提及，但主要推荐倾向于混合动力车型。',
        platform: 'Kimi',
        lastUpdated: '昨日'
    }
];

const DataMonitoring: React.FC = () => {
    const [selectedPlanId, setSelectedPlanId] = useState<number>(101);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
    const [isExporting, setIsExporting] = useState(false);

    const currentPlan = PLANS.find(p => p.id === selectedPlanId);

    const filteredMetrics = INTENT_METRICS.filter(item => 
        selectedPlatform === 'all' || item.platform === selectedPlatform
    );

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
                            {/* Time Range */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-1.5 text-red-600 font-medium text-sm hover:bg-red-50 rounded-full transition-colors border border-red-100">
                                    <Calendar className="w-4 h-4" />
                                    {timeRange === '7d' ? '近7天' : timeRange === '30d' ? '近30天' : '近90天'}
                                </button>
                            </div>

                            <div className="w-px h-6 bg-gray-200"></div>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <Zap className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +24.5%
                        </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">72.8%</div>
                    <div className="text-sm text-gray-500">核心意图 AI 推荐率</div>
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
                    <div className="text-3xl font-bold text-gray-900 mb-1">Top 3</div>
                    <div className="text-sm text-gray-500">平均推荐排名</div>
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
                    <div className="text-3xl font-bold text-gray-900 mb-1">15 个</div>
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
                    <div className="flex gap-2">
                        {['7d', '30d', '90d'].map((range) => (
                            <button 
                                key={range}
                                onClick={() => setTimeRange(range as any)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                    timeRange === range 
                                    ? 'bg-gray-900 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {range === '7d' ? '近7天' : range === '30d' ? '近30天' : '近90天'}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
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
                            />
                            {/* Event Markers */}
                            {TREND_DATA.map((entry, index) => (
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

            {/* Detail Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">意图监测详情 (Intent Details)</h3>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={handleExport}
                            disabled={isExporting}
                            className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {isExporting ? '导出中...' : '导出报表'}
                        </button>
                    </div>
                </div>
                
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">客户意图 (Intent)</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">来源平台</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-center">是否露出</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">排名 (Rank)</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">展现率</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">
                                <div className="flex items-center gap-1 group relative cursor-help w-fit">
                                    环比增长
                                    <HelpCircle className="w-4 h-4 text-gray-400" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        优化前后对比增长
                                    </div>
                                </div>
                            </th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm w-1/4">AI 评价摘要</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">更新时间</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredMetrics.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{item.intent}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                                        {item.platform}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {item.isVisible ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        item.rank === 'Top 1' ? 'bg-yellow-100 text-yellow-700' :
                                        item.rank === 'Top 3' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        {item.rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-gray-700 font-medium">
                                        <Eye className="w-4 h-4 text-gray-400" />
                                        {item.impressionRate}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-1 font-medium ${
                                        item.growth > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {item.growth > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        {Math.abs(item.growth)}%
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2" title={item.aiSummary}>
                                        {item.aiSummary}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-right text-sm text-gray-400">
                                    {item.lastUpdated}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataMonitoring;