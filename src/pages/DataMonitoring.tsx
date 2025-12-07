import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DataMonitoring: React.FC = () => {
    const [isExporting, setIsExporting] = React.useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert('报告导出成功！');
        }, 1500);
    };

    const data = [
        { name: '1月', visibility: 82, reputation: 4.3 },
        { name: '2月', visibility: 85, reputation: 4.2 },
        { name: '3月', visibility: 86, reputation: 4.3 },
        { name: '4月', visibility: 87.5, reputation: 4.2 },
    ];

    return (
        <div className="page-container fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">数据监测成效追踪</h1>
                <p className="text-gray-400">及时监测追踪GEO优化进展，以及行业竞争格局，做到心中有数，运筹帷幄。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="glass-card">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-gray-500 text-sm mb-1">品牌能见度</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-gray-900">87.5</span>
                                <span className="text-red-500 flex items-center text-sm font-bold">
                                    <TrendingUp size={16} className="mr-1" />
                                    2.4%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff4b2b" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ff4b2b" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis domain={[80, 90]} stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#333' }}
                                />
                                <Area type="monotone" dataKey="visibility" stroke="#ff4b2b" fillOpacity={1} fill="url(#colorVis)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-gray-500 text-sm mb-1">品牌美誉度</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-gray-900">4.2</span>
                                <span className="text-green-500 flex items-center text-sm font-bold">
                                    <TrendingDown size={16} className="mr-1" />
                                    3.8%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRep" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff416c" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ff416c" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis domain={[4, 5]} stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#333' }}
                                />
                                <Area type="monotone" dataKey="reputation" stroke="#ff416c" fillOpacity={1} fill="url(#colorRep)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="glass-card p-8 flex items-center justify-between">
                <div className="max-w-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">实时监测/趋势可查/行业对比</h3>
                    <p className="text-gray-400 leading-relaxed">
                        云智推提供智能查询能力，实现结果趋势的可视化。保障品牌方在服务过程中，可查可用可分析。基于数据波动，快速响应策略变化。
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? '导出中...' : '导出报告'}
                    </button>
                    <button className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">查看详情</button>
                </div>
            </div>
        </div>
    );
};

export default DataMonitoring;
