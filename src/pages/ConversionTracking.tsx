import React, { useState } from 'react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend,
    ComposedChart,
    Bar,
    Line
} from 'recharts';
import { 
    ShoppingCart, 
    DollarSign, 
    Users, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Calendar,
    Filter,
    Download,
    ChevronDown,
    Search,
    MoreHorizontal,
    Eye,
    MousePointer,
    Target
} from 'lucide-react';

// Mock Data
const TREND_DATA = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        cost: Math.floor(Math.random() * 5000) + 2000,
        impressions: Math.floor(Math.random() * 50000) + 10000,
        conversions: Math.floor(Math.random() * 100) + 20,
        gmv: Math.floor(Math.random() * 20000) + 5000,
    };
});

const CAMPAIGN_DATA = [
    { id: 1, name: '小鹏G6-核心人群-精准', status: 'active', budget: 5000, cost: 3241, impressions: 45200, clicks: 1240, ctr: '2.74%', conversions: 85, cpa: 38.12, gmv: 12400 },
    { id: 2, name: '小鹏P7i-竞品拦截-通用', status: 'active', budget: 3000, cost: 2100, impressions: 31000, clicks: 890, ctr: '2.87%', conversions: 42, cpa: 50.00, gmv: 8900 },
    { id: 3, name: '品牌词-防守计划', status: 'active', budget: 2000, cost: 1500, impressions: 28000, clicks: 1500, ctr: '5.35%', conversions: 120, cpa: 12.50, gmv: 15600 },
    { id: 4, name: 'G9-高端商务-定向', status: 'paused', budget: 4000, cost: 800, impressions: 9000, clicks: 200, ctr: '2.22%', conversions: 10, cpa: 80.00, gmv: 2000 },
    { id: 5, name: '新客-大促活动-通投', status: 'active', budget: 10000, cost: 8900, impressions: 120000, clicks: 3400, ctr: '2.83%', conversions: 210, cpa: 42.38, gmv: 45000 },
];

const ConversionTracking: React.FC = () => {
    const [dateRange, setDateRange] = useState('近7天');
    const [activeMetric, setActiveMetric] = useState('cost');

    return (
        <div className="page-container fade-in p-6 bg-gray-50 min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">电商转化追踪 (Conversion Tracking)</h1>
                    <p className="text-gray-500 text-sm">全链路追踪投放效果，实时监控 ROI 与转化数据。</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:border-red-300 transition-colors shadow-sm">
                        <Calendar size={16} />
                        <span>{dateRange}</span>
                        <ChevronDown size={14} />
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2">
                        <Download size={16} />
                        导出报表
                    </button>
                </div>
            </div>

            {/* Key Metrics Cards (Ocean Engine Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard 
                    title="总消耗 (Cost)" 
                    value="¥16,541" 
                    trend="+12.5%" 
                    isUp={true} 
                    icon={<DollarSign size={20} />} 
                    color="blue"
                />
                <MetricCard 
                    title="总GMV (Gross Merchandise Value)" 
                    value="¥83,900" 
                    trend="+8.2%" 
                    isUp={true} 
                    icon={<ShoppingCart size={20} />} 
                    color="red"
                />
                <MetricCard 
                    title="总转化数 (Conversions)" 
                    value="467" 
                    trend="-2.1%" 
                    isUp={false} 
                    icon={<Target size={20} />} 
                    color="green"
                />
                <MetricCard 
                    title="投资回报率 (ROI)" 
                    value="5.07" 
                    trend="+5.4%" 
                    isUp={true} 
                    icon={<TrendingUp size={20} />} 
                    color="purple"
                />
            </div>

            {/* Secondary Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-8 items-center">
                <SecondaryMetric label="展示数 (Impressions)" value="233,200" />
                <SecondaryMetric label="点击数 (Clicks)" value="7,230" />
                <SecondaryMetric label="点击率 (CTR)" value="3.10%" />
                <SecondaryMetric label="转化成本 (CPA)" value="¥35.42" />
                <SecondaryMetric label="加购数" value="1,205" />
            </div>

            {/* Main Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">趋势分析</h3>
                    <div className="flex gap-2">
                        {['消耗', '转化数', 'GMV'].map((m) => (
                            <button 
                                key={m}
                                className={`px-3 py-1 text-xs rounded-full border ${
                                    activeMetric === m 
                                    ? 'bg-red-50 text-red-600 border-red-200' 
                                    : 'text-gray-500 border-gray-200 hover:bg-gray-50'
                                }`}
                                onClick={() => setActiveMetric(m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Area yAxisId="left" type="monotone" dataKey="cost" name="消耗 (Cost)" stroke="#ef4444" fillOpacity={1} fill="url(#colorCost)" strokeWidth={2} />
                            <Line yAxisId="right" type="monotone" dataKey="conversions" name="转化数 (Conv)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-4">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase">推广计划明细</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="搜索计划名称..." 
                                className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded text-gray-500"><Filter size={16} /></button>
                        <button className="p-2 hover:bg-gray-200 rounded text-gray-500"><MoreHorizontal size={16} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="py-3 px-4 w-8">
                                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                </th>
                                <th className="py-3 px-4 min-w-[200px]">计划名称</th>
                                <th className="py-3 px-4">状态</th>
                                <th className="py-3 px-4 text-right">消耗</th>
                                <th className="py-3 px-4 text-right">展示数</th>
                                <th className="py-3 px-4 text-right">点击数</th>
                                <th className="py-3 px-4 text-right">点击率</th>
                                <th className="py-3 px-4 text-right">转化数</th>
                                <th className="py-3 px-4 text-right">转化成本</th>
                                <th className="py-3 px-4 text-right">GMV</th>
                                <th className="py-3 px-4 text-right">ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {CAMPAIGN_DATA.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4">
                                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-900">{campaign.name}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                            campaign.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {campaign.status === 'active' ? '投放中' : '已暂停'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right text-gray-900 font-medium">¥{campaign.cost.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right text-gray-500">{campaign.impressions.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right text-gray-500">{campaign.clicks.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right text-gray-500">{campaign.ctr}</td>
                                    <td className="py-3 px-4 text-right text-gray-900">{campaign.conversions}</td>
                                    <td className="py-3 px-4 text-right text-gray-500">¥{campaign.cpa.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-right text-gray-900">¥{campaign.gmv.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-right font-medium text-orange-600">{(campaign.gmv / campaign.cost).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                    <span>显示 1-5 共 5 条</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white disabled:opacity-50" disabled>上一页</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white disabled:opacity-50" disabled>下一页</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard: React.FC<{
    title: string;
    value: string;
    trend: string;
    isUp: boolean;
    icon: React.ReactNode;
    color: 'blue' | 'red' | 'green' | 'purple';
}> = ({ title, value, trend, isUp, icon, color }) => {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-50',
        red: 'text-red-600 bg-red-50',
        green: 'text-green-600 bg-green-50',
        purple: 'text-purple-600 bg-purple-50',
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? 'text-red-600' : 'text-green-600'}`}>
                    <span>{trend}</span>
                    {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
            </div>
            <div>
                <p className="text-gray-500 text-sm mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
};

const SecondaryMetric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-xs text-gray-400 mb-1">{label}</span>
        <span className="text-lg font-semibold text-gray-700 font-mono">{value}</span>
    </div>
);

export default ConversionTracking;
