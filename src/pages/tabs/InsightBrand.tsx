import React from 'react';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface InsightBrandProps {
    platform: string;
}

const InsightBrand: React.FC<InsightBrandProps> = ({ platform }) => {
    // Mock data
    const sentimentScore = platform === 'Deepseek' ? 92 : 85;
    
    // 1. 品牌专属问题列表 (Brand Questions)
    const brandQuestions = [
        { 
            query: '小鹏G6的续航达成率真实情况怎么样？', 
            focus: '产品性能',
            sentiment: 'Positive', 
            score: 95,
            summary: '普遍反馈续航扎实，达成率90%以上',
            risk: '无明显风险'
        },
        { 
            query: '小鹏的售后服务态度好不好？', 
            focus: '服务体验',
            sentiment: 'Mixed', 
            score: 60,
            summary: '一线城市评价较好，部分二线城市反馈网点少',
            risk: '网点覆盖不足'
        },
        { 
            query: 'XNGP智驾系统在暴雨天能用吗？', 
            focus: '技术可靠性',
            sentiment: 'Positive', 
            score: 98,
            summary: '极端天气表现稳定，安全冗余机制获好评',
            risk: '无明显风险'
        },
        { 
            query: '小鹏G9内饰有没有异味？', 
            focus: '品质做工',
            sentiment: 'Negative', 
            score: 40,
            summary: '部分早期车主反馈有轻微异味',
            risk: '环保材质质疑'
        },
    ];

    // 2. 情绪分布
    const sentimentData = [
        { name: '正面 (Positive)', value: 65, color: '#ef4444' },
        { name: '中立 (Neutral)', value: 25, color: '#d1d5db' },
        { name: '负面 (Negative)', value: 10, color: '#fca5a5' },
    ];

    return (
        <div className="space-y-6 fade-in">
             {/* 顶部概览 */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-br from-red-50 to-white border-red-100">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">当前平台</p>
                        <h3 className="text-xl font-bold text-gray-800">{platform}</h3>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-500 text-sm mb-1">品牌回答健康度</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-red-600">{sentimentScore}</span>
                            <span className="text-sm text-red-400">Health Score</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 glass-card p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-red-500" />
                        品牌问题情绪分布 (Sentiment Distribution)
                    </h3>
                    <div className="h-32 flex items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 品牌问题详细列表 */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                    品牌专属问题回答质量 (Brand Query Analysis)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-3 px-4 rounded-l-lg w-1/3">品牌专属问题 (Brand Query)</th>
                                <th className="py-3 px-4">关注点</th>
                                <th className="py-3 px-4">AI回答情绪</th>
                                <th className="py-3 px-4">健康得分</th>
                                <th className="py-3 px-4">回答摘要</th>
                                <th className="py-3 px-4 rounded-r-lg">风险提示</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {brandQuestions.map((item, i) => (
                                <tr key={i} className="hover:bg-red-50/50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-800">{item.query}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                            {item.focus}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.sentiment === 'Positive' && <span className="text-green-600 flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> 正面</span>}
                                        {item.sentiment === 'Mixed' && <span className="text-yellow-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> 中立/混合</span>}
                                        {item.sentiment === 'Negative' && <span className="text-red-600 flex items-center gap-1"><ThumbsDown className="w-3 h-3"/> 负面</span>}
                                    </td>
                                    <td className="py-3 px-4 font-bold text-gray-700">{item.score}</td>
                                    <td className="py-3 px-4 text-gray-500 max-w-xs truncate" title={item.summary}>{item.summary}</td>
                                    <td className="py-3 px-4">
                                        {item.risk !== '无明显风险' ? (
                                            <span className="text-red-500 text-xs flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" /> {item.risk}
                                            </span>
                                        ) : (
                                            <span className="text-green-500 text-xs flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> 安全
                                            </span>
                                        )}
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

export default InsightBrand;
