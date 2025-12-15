import React from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { Hash, Globe, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface InsightIndustryProps {
    platform: string;
}

const InsightIndustry: React.FC<InsightIndustryProps> = ({ platform }) => {
    // Mock data based on platform (simplified for demo)
    const leakageRate = platform === 'Deepseek' ? 68 : 55;
    
    // 1. 行业通用问题分析列表 (Industry Questions Analysis)
    const industryQuestions = [
        { 
            query: '20-30万性价比最高的纯电SUV推荐', 
            volume: 'Very High', 
            mentioned: true, 
            rank: 2, 
            topBrand: '特斯拉 (Model Y)',
            context: '列举了Model Y, 小鹏G6, 极氪7X' 
        },
        { 
            query: '2025年最值得买的新能源轿车排行榜', 
            volume: 'High', 
            mentioned: true, 
            rank: 4, 
            topBrand: '比亚迪 (汉)',
            context: '主要推荐了比亚迪汉, 小米SU7, 极氪001' 
        },
        { 
            query: '适合家用的智能驾驶汽车有哪些？', 
            volume: 'High', 
            mentioned: true, 
            rank: 1, 
            topBrand: '小鹏 (G6/G9)',
            context: '重点推荐了小鹏XNGP, 华为系' 
        },
        { 
            query: '续航最扎实的电动车排名', 
            volume: 'Med', 
            mentioned: false, 
            rank: '-', 
            topBrand: '极氪 (001)',
            context: '未提及我方品牌' 
        },
        { 
            query: '800V高压快充车型盘点', 
            volume: 'Med', 
            mentioned: true, 
            rank: 3, 
            topBrand: '小鹏 (G9)',
            context: '列举了G9, 理想MEGA, 智界S7' 
        },
    ];

    // 2. 品牌漏出率概览
    const overviewData = [
        { name: '已漏出 (Mentioned)', value: leakageRate, color: '#ef4444' },
        { name: '未漏出 (Missed)', value: 100 - leakageRate, color: '#fca5a5' },
    ];

    return (
        <div className="space-y-6 fade-in">
            {/* 顶部概览卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-br from-red-50 to-white border-red-100">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">当前平台</p>
                        <h3 className="text-xl font-bold text-gray-800">{platform}</h3>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-500 text-sm mb-1">行业问题品牌漏出率</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-red-600">{leakageRate}%</span>
                            <span className="text-sm text-red-400">Visibility Rate</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 glass-card p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-red-500" />
                        行业大类问题品牌排名分布 (Rank Distribution)
                    </h3>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={[{ name: '排名分布', top1: 20, top3: 45, top10: 25, missed: 10 }]}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" hide />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="top1" name="排名 Top 1" stackId="a" fill="#ef4444" radius={[4, 0, 0, 4]} />
                                <Bar dataKey="top3" name="排名 Top 3" stackId="a" fill="#f87171" />
                                <Bar dataKey="top10" name="排名 Top 10" stackId="a" fill="#fca5a5" />
                                <Bar dataKey="missed" name="未上榜" stackId="a" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                            <span>Top 1 (20%)</span>
                            <span>Top 3 (45%)</span>
                            <span>Top 10 (25%)</span>
                            <span>未上榜 (10%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 行业问题详细列表 */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-red-500" />
                    行业通用问题渗透分析 (Industry Question Analysis)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-3 px-4 rounded-l-lg w-1/3">行业通用问题 (Industry Query)</th>
                                <th className="py-3 px-4">搜索热度</th>
                                <th className="py-3 px-4">是否漏出</th>
                                <th className="py-3 px-4">我方排名</th>
                                <th className="py-3 px-4">首位推荐品牌</th>
                                <th className="py-3 px-4 rounded-r-lg">回答上下文简述</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {industryQuestions.map((item, i) => (
                                <tr key={i} className="hover:bg-red-50/50 transition-colors group">
                                    <td className="py-3 px-4 font-medium text-gray-800 group-hover:text-red-600 flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4 text-gray-300" />
                                        {item.query}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            item.volume === 'Very High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {item.volume}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.mentioned ? (
                                            <div className="flex items-center gap-1 text-green-600 font-medium">
                                                <CheckCircle className="w-4 h-4" /> 已漏出
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <XCircle className="w-4 h-4" /> 未漏出
                                            </div>
                                        )}
                                    </td>
                                    <td className={`py-3 px-4 font-bold ${
                                        item.rank === 1 ? 'text-red-600 text-lg' : 
                                        item.rank !== '-' ? 'text-gray-800' : 'text-gray-300'
                                    }`}>
                                        {item.rank === 1 ? 'NO.1' : item.rank}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">{item.topBrand}</td>
                                    <td className="py-3 px-4 text-gray-500 text-xs max-w-xs truncate" title={item.context}>
                                        {item.context}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InsightIndustry;
