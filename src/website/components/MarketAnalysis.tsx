import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MarketAnalysis: React.FC = () => {
    const data = [
        { year: '2024', value: 112 },
        { year: '2025', value: 210 },
        { year: '2026', value: 386 },
        { year: '2027', value: 555 },
        { year: '2028', value: 766 },
        { year: '2029', value: 1097 },
    ];

    return (
        <section id="market" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            GEO 市场爆发式增长<br/>
                            <span className="text-red-600">品牌必争之地</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            艾瑞咨询与 Gartner 数据指出，2025年 GEO 市场预计同比增长 215%。
                            随着 AI 搜索逐渐蚕食传统搜索引擎流量，AI 将成为品牌最重要的流量入口。
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                                <div className="text-4xl font-bold text-red-600 mb-2">215%</div>
                                <div className="text-gray-600 font-medium">2025年同比增长预测</div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="text-4xl font-bold text-gray-800 mb-2">$50B</div>
                                <div className="text-gray-600 font-medium">2026年全球市场规模</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 w-full h-[400px] bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">全球 GEO 市场规模预测 (亿美元)</h3>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#ef4444" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketAnalysis;
