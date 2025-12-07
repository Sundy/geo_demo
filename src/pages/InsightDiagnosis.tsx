import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const InsightDiagnosis: React.FC = () => {
    const trendData = [
        { name: '1月', value: 400 },
        { name: '2月', value: 300 },
        { name: '3月', value: 600 },
        { name: '4月', value: 800 },
        { name: '5月', value: 700 },
        { name: '6月', value: 900 },
    ];

    const pieData = [
        { name: '知乎', value: 400 },
        { name: '小红书', value: 300 },
        { name: '抖音', value: 300 },
        { name: 'B站', value: 200 },
    ];

    const COLORS = ['#ff4b2b', '#ff416c', '#ff9068', '#ffb199'];

    return (
        <div className="page-container fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">洞察与诊断</h1>
                <p className="text-gray-400">品牌AI声量洞察与诊断分析，梳理GEO优化方向与策略。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-card">
                    <h3 className="text-xl font-semibold mb-4 text-white">品牌声量趋势</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#333' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#ff4b2b" strokeWidth={3} dot={{ r: 4, fill: '#ff4b2b' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 className="text-xl font-semibold mb-4 text-white">平台声量分布</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4 text-white">信源分析列表</h3>
                <table className="w-full text-left text-gray-300">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-3">信源名称</th>
                            <th className="py-3">平台</th>
                            <th className="py-3">相关性得分</th>
                            <th className="py-3">引用次数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: '差评', platform: '微信公众号', score: 98.5, count: 2341 },
                            { name: '影视飓风', platform: 'Bilibili', score: 96.2, count: 1890 },
                            { name: '极客公园', platform: '知乎', score: 94.8, count: 1560 },
                            { name: '36氪', platform: '36Kr', score: 93.5, count: 1240 },
                            { name: '少数派', platform: '少数派', score: 91.2, count: 980 },
                            { name: '爱范儿', platform: '微信公众号', score: 89.5, count: 850 },
                            { name: 'ZEALER', platform: '微博', score: 88.4, count: 720 },
                        ].map((item, i) => (
                            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="py-3 font-medium text-gray-800">{item.name}</td>
                                <td className="py-3 text-gray-600">{item.platform}</td>
                                <td className="py-3 text-red-500 font-bold">{item.score}</td>
                                <td className="py-3 text-gray-600">{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InsightDiagnosis;
