import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, DollarSign, Users } from 'lucide-react';

const ConversionTracking: React.FC = () => {
    const funnelData = [
        { name: '曝光', value: 10000 },
        { name: '点击', value: 5000 },
        { name: '加购', value: 2000 },
        { name: '转化', value: 800 },
    ];

    return (
        <div className="page-container fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">电商转化追踪</h1>
                <p className="text-gray-400">全链路追踪电商转化效果，量化GEO营销ROI。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">总访客数</p>
                        <h3 className="text-2xl font-bold text-gray-900">12,345</h3>
                    </div>
                </div>
                <div className="glass-card flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                        <ShoppingCart size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">加购转化率</p>
                        <h3 className="text-2xl font-bold text-gray-900">18.5%</h3>
                    </div>
                </div>
                <div className="glass-card flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">GMV</p>
                        <h3 className="text-2xl font-bold text-gray-900">¥ 892,100</h3>
                    </div>
                </div>
            </div>

            <div className="glass-card mb-8">
                <h3 className="text-xl font-semibold mb-6 text-white">销售漏斗模型</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={funnelData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" horizontal={false} />
                            <XAxis type="number" stroke="#666" />
                            <YAxis dataKey="name" type="category" stroke="#666" width={60} />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                itemStyle={{ color: '#333' }}
                            />
                            <Bar dataKey="value" fill="#ff4b2b" radius={[0, 4, 4, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ConversionTracking;
