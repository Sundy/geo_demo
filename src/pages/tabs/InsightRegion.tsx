import React from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend
} from 'recharts';
import { MapPin, CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import { useIntent } from '../../context/IntentContext';
import AddIntentModal from '../../components/AddIntentModal';

interface InsightRegionProps {
    platform: string;
}

const InsightRegion: React.FC<InsightRegionProps> = ({ platform }) => {
    const { addIntent } = useIntent();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [currentQuery, setCurrentQuery] = React.useState('');

    // Mock data
    const presenceRate = platform === 'Deepseek' ? 78 : 65;
    
    // 1. 地域前缀问题分析列表 (Regional Questions)
    const regionQuestions = [
        { 
            query: '上海新能源车牌照政策2025解读', 
            city: '上海',
            mentioned: true,
            status: 'Strong Presence',
            competitor: '特斯拉',
            insight: '详细解读了政策，并推荐小鹏G6符合要求'
        },
        { 
            query: '北京冬天开电动车续航打折厉害吗？', 
            city: '北京',
            mentioned: true,
            status: 'Weak Presence',
            competitor: '比亚迪',
            insight: '主要提及比亚迪的抗低温表现，我方提及较少'
        },
        { 
            query: '深圳购买小鹏G6有没有地补？', 
            city: '深圳',
            mentioned: true,
            status: 'Strong Presence',
            competitor: '-',
            insight: '准确列出了深圳各区补贴金额'
        },
        { 
            query: '成都市区哪里有800V超充站？', 
            city: '成都',
            mentioned: false,
            status: 'Missing',
            competitor: '极氪',
            insight: '主要展示了极氪和特来电的充电地图'
        },
        { 
            query: '杭州亚运会期间新能源限行规定', 
            city: '杭州',
            mentioned: true,
            status: 'Neutral',
            competitor: '吉利',
            insight: '提及吉利系较多，但我方也有曝光'
        },
    ];

    const handleAddToIntent = (query: string) => {
        setCurrentQuery(query);
        setIsModalOpen(true);
    };

    const handleConfirmIntent = (platforms: string[]) => {
        addIntent({
            query: currentQuery,
            category: '地域相关',
            prefixSuffix: '-',
            heatIndex: 75, // Mock heat
            quote: 450, // Mock quote
            source: 'Insight',
            targetPlatforms: platforms
        });
        // alert('已添加到意图定位列表！');
    };

    // 2. 区域声量数据
    const regionData = [
        { name: '广东', value: 3500, sentiment: 92 },
        { name: '江苏', value: 2800, sentiment: 88 },
        { name: '浙江', value: 2600, sentiment: 85 },
        { name: '上海', value: 2400, sentiment: 90 },
        { name: '北京', value: 2200, sentiment: 87 },
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
                        <p className="text-gray-500 text-sm mb-1">地域问题品牌在场率</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-red-600">{presenceRate}%</span>
                            <span className="text-sm text-red-400">Presence Rate</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 glass-card p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        核心区域声量热力榜 (Top Regions)
                    </h3>
                    <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={40} stroke="#666" />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ borderRadius: '8px', border: 'none' }}
                                />
                                <Bar dataKey="value" name="声量指数" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 地域问题详细列表 */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    地域前缀问题渗透分析 (Regional Query Analysis)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-3 px-4 rounded-l-lg w-1/3">地域专属问题 (Regional Query)</th>
                                <th className="py-3 px-4">目标城市</th>
                                <th className="py-3 px-4">品牌在场情况</th>
                                <th className="py-3 px-4">主要竞品</th>
                                <th className="py-3 px-4">回答洞察</th>
                                <th className="py-3 px-4 rounded-r-lg text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {regionQuestions.map((item, i) => (
                                <tr key={i} className="hover:bg-red-50/50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-800">{item.query}</td>
                                    <td className="py-3 px-4">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                            {item.city}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.status === 'Strong Presence' && <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4"/> 强曝光</span>}
                                        {item.status === 'Weak Presence' && <span className="text-yellow-600 font-bold flex items-center gap-1"><AlertCircle className="w-4 h-4"/> 弱曝光</span>}
                                        {item.status === 'Neutral' && <span className="text-gray-500 font-bold flex items-center gap-1"><AlertCircle className="w-4 h-4"/> 一般</span>}
                                        {item.status === 'Missing' && <span className="text-red-500 font-bold flex items-center gap-1"><XCircle className="w-4 h-4"/> 未出现</span>}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{item.competitor}</td>
                                    <td className="py-3 px-4 text-gray-500 max-w-xs truncate" title={item.insight}>{item.insight}</td>
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

export default InsightRegion;
