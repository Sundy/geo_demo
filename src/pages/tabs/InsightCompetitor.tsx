import React from 'react';
import { 
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, 
    Tooltip, ResponsiveContainer 
} from 'recharts';
import { Swords, Trophy, XCircle, MinusCircle, Plus } from 'lucide-react';
import { useIntent } from '../../context/IntentContext';
import AddIntentModal from '../../components/AddIntentModal';

interface InsightCompetitorProps {
    platform: string;
    onlyTable?: boolean;
}

const InsightCompetitor: React.FC<InsightCompetitorProps> = ({ platform, onlyTable = false }) => {
    const { addIntent } = useIntent();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [currentQuery, setCurrentQuery] = React.useState('');

    // Mock data
    const winRate = platform === 'Deepseek' ? 62 : 45;
    
    // 1. 竞品对比问题列表 (Comparison Questions)
    const battleQuestions = [
        { 
            query: '小鹏G6 和 特斯拉Model Y 哪个好？', 
            competitor: '特斯拉 Model Y',
            winner: '我方胜出', 
            reason: '智驾体验评价更高，性价比优势明显',
            keyDiff: '智驾能力, 价格'
        },
        { 
            query: '小鹏P7i vs 小米SU7 续航实测谁更强？', 
            competitor: '小米 SU7',
            winner: '竞品胜出', 
            reason: '小米流量热度高，回答侧重其生态优势',
            keyDiff: '生态互联, 流量热度'
        },
        { 
            query: '20万预算买小鹏G6还是极氪7X？', 
            competitor: '极氪 7X',
            winner: '势均力敌', 
            reason: '小鹏胜在智驾，极氪胜在内饰质感',
            keyDiff: '智驾 vs 内饰'
        },
        { 
            query: '小鹏X9和理想MEGA怎么选？', 
            competitor: '理想 MEGA',
            winner: '我方胜出', 
            reason: '性价比高，且无负面舆情干扰',
            keyDiff: '性价比, 舆情'
        },
    ];

    const handleAddToIntent = (query: string) => {
        setCurrentQuery(query);
        setIsModalOpen(true);
    };

    const handleConfirmIntent = (platforms: string[]) => {
        addIntent({
            query: currentQuery,
            category: '竞品对比',
            prefixSuffix: '-',
            heatIndex: 90, // Mock heat
            quote: 700, // Mock quote
            source: 'Insight',
            targetPlatforms: platforms
        });
        // alert('已添加到意图定位列表！');
    };

    // 2. 竞争力雷达数据
    const radarData = [
        { subject: '提及率', A: 85, B: 90, fullMark: 100 },
        { subject: '首位率', A: winRate, B: 65, fullMark: 100 }, // Dynamic based on platform
        { subject: '好评率', A: 92, B: 88, fullMark: 100 },
        { subject: '内容深度', A: 70, B: 85, fullMark: 100 },
        { subject: '信源权威', A: 75, B: 80, fullMark: 100 },
    ];

    return (
        <div className="space-y-6 fade-in">
            {/* 顶部概览 */}
            {!onlyTable && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-br from-red-50 to-white border-red-100">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">当前平台</p>
                            <h3 className="text-xl font-bold text-gray-800">{platform}</h3>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-sm mb-1">对比问题胜出率</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-red-600">{winRate}%</span>
                                <span className="text-sm text-red-400">Win Rate</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 glass-card p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Swords className="w-5 h-5 text-red-500" />
                            核心竞争力对比雷达 (Radar Benchmark)
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="我方品牌" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                                    <Radar name="主要竞品" dataKey="B" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.4} />
                                    <Legend />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* 攻防意图详细列表 */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Swords className="w-5 h-5 text-red-500" />
                    对比类问题攻防分析 (Comparison Query Analysis)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-3 px-4 rounded-l-lg w-1/3">对比类问题 (Comparison Query)</th>
                                <th className="py-3 px-4">对标竞品</th>
                                <th className="py-3 px-4">AI推荐倾向</th>
                                <th className="py-3 px-4">胜出/惜败原因</th>
                                <th className="py-3 px-4">关键差异点</th>
                                <th className="py-3 px-4 rounded-r-lg text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {battleQuestions.map((item, i) => (
                                <tr key={i} className="hover:bg-red-50/50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-800">{item.query}</td>
                                    <td className="py-3 px-4 text-gray-600">{item.competitor}</td>
                                    <td className="py-3 px-4">
                                        {item.winner === '我方胜出' && <span className="text-green-600 font-bold flex items-center gap-1"><Trophy className="w-4 h-4"/> 我方胜出</span>}
                                        {item.winner === '竞品胜出' && <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-4 h-4"/> 竞品胜出</span>}
                                        {item.winner === '势均力敌' && <span className="text-gray-500 font-bold flex items-center gap-1"><MinusCircle className="w-4 h-4"/> 势均力敌</span>}
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 max-w-xs truncate" title={item.reason}>{item.reason}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                            {item.keyDiff}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button 
                                            onClick={() => handleAddToIntent(item.query)}
                                            className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-100 rounded-full transition-colors"
                                            title="添加到意图定位"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddIntentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmIntent}
                query={currentQuery}
            />
        </div>
    );
};

export default InsightCompetitor;
