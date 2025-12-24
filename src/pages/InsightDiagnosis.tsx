import React, { useState } from 'react';
import { 
    Activity, Globe, Target, Layers, ChevronDown, MapPin, Cpu,
    MessageCircle, Award, ThumbsUp, Check, Calendar,
    Bot, Sparkles, Zap, Moon, MessageSquare, Lightbulb, AlertTriangle, Database
} from 'lucide-react';
import InsightIndustry from './tabs/InsightIndustry';
import InsightBrand from './tabs/InsightBrand';
import InsightCompetitor from './tabs/InsightCompetitor';
import InsightRegion from './tabs/InsightRegion';
import InsightCharts from '../components/InsightCharts';
import SearchHeatAnalysis from '../components/SearchHeatAnalysis';
import HotWordsAnalysis from '../components/HotWordsAnalysis';
import MentionRateAnalysis from '../components/MentionRateAnalysis';
import SentimentAnalysis from '../components/SentimentAnalysis';
import SourceAnalysis from '../components/SourceAnalysis';

const InsightDiagnosis: React.FC = () => {
    // Filter States
    const [selectedBrand, setSelectedBrand] = useState('小鹏');
    const [selectedProduct, setSelectedProduct] = useState('G6'); // Industry/Category
    const [timeRange, setTimeRange] = useState('近7天');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [selectedModels, setSelectedModels] = useState<string[]>(['Deepseek', '豆包', 'Hunyuan', '千问', 'Kimi', '文心一言']); // Default all
    
    // Tab State
    const [activeTab, setActiveTab] = useState<'industry' | 'brand' | 'competitor' | 'region'>('industry');

    // Model Definitions with Icons
    const models = [
        { id: 'Deepseek', name: 'DeepSeek', icon: Bot },
        { id: '豆包', name: '豆包', icon: Sparkles },
        { id: 'Hunyuan', name: '腾讯元宝', icon: MessageSquare },
        { id: '千问', name: '千问', icon: Zap },
        { id: 'Kimi', name: 'Kimi', icon: Moon },
        { id: '文心一言', name: '文心一言', icon: Database },
    ];

    // Toggle model selection
    const toggleModel = (modelId: string) => {
        if (modelId === 'all') {
            if (selectedModels.length === models.length) {
                setSelectedModels([]); 
            } else {
                setSelectedModels(models.map(m => m.id));
            }
            return;
        }

        if (selectedModels.includes(modelId)) {
            // Don't allow empty selection? Or allow? Let's allow but maybe show warning if needed.
            // For now, allow empty.
            setSelectedModels(selectedModels.filter(m => m !== modelId));
        } else {
            setSelectedModels([...selectedModels, modelId]);
        }
    };

    const isAllSelected = selectedModels.length === models.length;

    // Helper to get display text
    const getModelDisplayText = () => {
        if (selectedModels.length === 0) return 'Select Platform';
        if (selectedModels.length === models.length) return 'All Platforms';
        if (selectedModels.length === 1) return selectedModels[0];
        return `${selectedModels.length} Platforms`;
    };

    // Mock global metrics based on platform aggregation
    const getMetrics = (platforms: string[]) => {
        // 1. Mock Base Data
        const baseSearchHeat = 85.4;
        const baseMention = 4.7;
        const baseSentiment = 91.9;
        const baseSourceScore = 78.5;

        // Calculate Brand Index (Weighted Score)
        // Normalize Mention Rate (4.7% is actually quite high for SOV, let's treat it as a score out of 100 for index calc ~ 4.7 * 10 = 47)
        // Formula: Search * 0.2 + MentionScore * 0.3 + Sentiment * 0.3 + Source * 0.2
        const mentionScore = baseMention * 10; 
        const brandIndex = (baseSearchHeat * 0.25 + mentionScore * 0.25 + baseSentiment * 0.25 + baseSourceScore * 0.25).toFixed(1);

        const metricsList = [
            {
                id: 'brand_index',
                title: 'AI品牌指数',
                value: brandIndex,
                unit: '',
                icon: Sparkles,
                color: 'text-red-600',
                bg: 'bg-red-50',
                trend: null,
                details: [
                    { label: '综合评分', value: 'Weighted Score' },
                    { label: '算法版本', value: 'v2.0' },
                ]
            },
            {
                id: 'search_heat',
                title: 'AI搜索热度',
                value: baseSearchHeat,
                unit: '',
                icon: Activity,
                color: 'text-orange-500',
                bg: 'bg-orange-50',
                trend: '+2.4%',
                details: [
                    { label: '行业热门搜索', value: '新能源SUV' },
                    { label: '品牌热门搜索', value: '小鹏G6' },
                    { label: '竞品热门搜索', value: 'Model Y' },
                    { label: '热门城市', value: '上海' },
                    { label: '热门周期', value: '周末' },
                    { label: '近期热门词', value: '800V快充' },
                ]
            },
            {
                id: 'mention_rate',
                title: '提及率',
                value: baseMention,
                unit: '%',
                icon: MessageCircle,
                color: 'text-blue-500',
                bg: 'bg-blue-50',
                trend: '+0.5%',
                details: [
                    { label: '提及率', value: '4.7%' },
                    { label: 'Top3提及率', value: '12.5%' },
                    { label: 'Top1提及率', value: '40.8%' },
                    { label: '提及份额(SOV)', value: '15.2%' },
                ]
            },
            {
                id: 'sentiment',
                title: '情感度',
                value: baseSentiment,
                unit: '%',
                icon: ThumbsUp,
                color: 'text-green-500',
                bg: 'bg-green-50',
                trend: '-0.3%',
                details: [
                    { label: '正向占比', value: '62%' },
                    { label: '中性占比', value: '28%' },
                    { label: '负面占比', value: '10%' },
                    { label: 'Top正向词', value: '智驾领先' },
                    { label: 'Top负面词', value: '续航焦虑' },
                ]
            },
            {
                id: 'source_score',
                title: '信源分数',
                value: baseSourceScore,
                unit: '',
                icon: Globe,
                color: 'text-purple-500',
                bg: 'bg-purple-50',
                trend: '+1.2%',
                details: [
                    { label: '来源权重', value: '8.5/10' },
                    { label: '来源偏好度', value: '高' },
                    { label: '来源趋势', value: '上升' },
                    { label: 'Top引用文章', value: '小鹏G6深度评测...' },
                ]
            }
        ];

        return metricsList;
    };

    const metrics = getMetrics(selectedModels);
    const platformDisplayString = getModelDisplayText();

    // Section Header Component
    const SectionHeader = ({ title, icon: Icon, description }: { title: string; icon: any; description: string }) => (
        <div className="flex items-center gap-3 mb-6 mt-12 pb-4 border-b border-gray-200">
            <div className="p-2 bg-red-50 rounded-lg">
                <Icon className="w-6 h-6 text-red-600" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="page-container fade-in p-6">
            
            {/* Unified Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 sticky top-0 z-20 backdrop-blur-xl bg-white/95">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    {/* Left: Brand, Product & Industry */}
                    <div className="flex items-center gap-4">
                        {/* Brand */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm font-medium">品牌</span>
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight">{selectedBrand}</h1>
                        </div>
                        
                        <div className="h-6 w-px bg-gray-200"></div>
                        
                        {/* Product (Optional) */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                                <span className="text-xs text-gray-400">产品</span>
                                <span>{selectedProduct}</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>

                        <div className="h-6 w-px bg-gray-200"></div>

                        {/* Industry (Auto-matched) */}
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                            <span className="text-xs text-blue-500 font-medium">所属行业</span>
                            <span className="text-sm font-bold text-blue-700">新能源汽车</span>
                        </div>
                    </div>

                    {/* Right: Time Range */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                            <button 
                                onClick={() => setTimeRange('近7天')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${timeRange === '近7天' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                近7天
                            </button>
                            <button 
                                onClick={() => setTimeRange('近30天')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${timeRange === '近30天' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                近30天
                            </button>
                            <button 
                                onClick={() => setTimeRange('自定义')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${timeRange === '自定义' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                自定义
                            </button>
                        </div>
                        
                        {timeRange === '自定义' && (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                                <input 
                                    type="date" 
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50"
                                />
                                <span className="text-gray-400">-</span>
                                <input 
                                    type="date" 
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600 focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom: Platforms (New Line) */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-500 font-medium whitespace-nowrap">监测平台:</span>
                        {/* All Platform Button */}
                        <button 
                            onClick={() => toggleModel('all')}
                            className={`
                                flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all shrink-0
                                ${isAllSelected 
                                    ? 'bg-red-600 text-white shadow-md shadow-red-100 border border-red-600' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }
                            `}
                        >
                            <span>全平台</span>
                        </button>

                        {/* Individual Platform Buttons */}
                        {models.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => toggleModel(model.id)}
                                className={`
                                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border shrink-0
                                    ${selectedModels.includes(model.id)
                                        ? 'bg-red-50 text-red-600 border-red-200 shadow-sm'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }
                                `}
                            >
                                <model.icon className={`w-3.5 h-3.5 ${
                                    selectedModels.includes(model.id) ? 'text-red-500' : 'text-gray-400'
                                }`} />
                                <span>{model.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Global Core Metrics - 5 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {metrics.map((metric) => (
                    <div 
                        key={metric.id} 
                        className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-default"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1 font-medium">{metric.title}</p>
                                <h3 className={`text-3xl font-bold ${metric.id === 'brand_index' ? 'text-red-600' : 'text-gray-800'}`}>
                                    {metric.value}
                                    {metric.unit && <span className="text-lg text-gray-400 font-normal ml-1">{metric.unit}</span>}
                                </h3>
                            </div>
                            <div className={`p-2 rounded-lg ${metric.bg}`}>
                                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                        </div>
                        {metric.trend && (
                            <div className="flex items-center text-sm">
                                <span className={metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                                    {metric.trend}
                                </span>
                                <span className="text-gray-400 ml-2">较上周</span>
                            </div>
                        )}
                        {metric.id === 'brand_index' && (
                            <div className="flex items-center text-sm">
                                <span className="text-red-600 font-medium">综合评分</span>
                                <span className="text-gray-400 ml-2">Weighted Score</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 1. AI Search Heat Analysis (New Section) */}
            <SearchHeatAnalysis brandName={selectedBrand} timeRange={timeRange} />

            {/* 2. Hot Words Analysis (New Section) */}
            <HotWordsAnalysis brandName={selectedBrand} />

            {/* 3. AI Mention Rate Analysis (New Section) */}
            <MentionRateAnalysis brandName={selectedBrand} />

            {/* 4. Sentiment Analysis (New Section) */}
            <SentimentAnalysis brandName={selectedBrand} />

            {/* 5. Source Analysis (New Section) */}
            <SourceAnalysis brandName={selectedBrand} />

            {/* Global Analysis Charts (All migrated, keeping component for any future needs or remove) */}
            <InsightCharts brandName={selectedBrand} />

            {/* GEO Optimization Recommendations */}
            <div className="p-6 border-t border-gray-100 bg-white">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    推荐品牌GEO优化方案 (Recommended GEO Strategy)
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Optimization List */}
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                急需优化的负面/弱势问题
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="bg-white text-red-600 px-2 py-0.5 rounded border border-red-200 text-xs font-bold shrink-0 mt-0.5">Top 1</span>
                                    <div>
                                        <span className="font-medium">小鹏G9内饰有没有异味？</span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="font-medium text-red-500">负面处理：</span> 
                                            需大量发布车主真实除味评测、权威机构甲醛检测报告，稀释早期负面权重。
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="bg-white text-red-600 px-2 py-0.5 rounded border border-red-200 text-xs font-bold shrink-0 mt-0.5">Top 2</span>
                                    <div>
                                        <span className="font-medium">小鹏P7i vs 小米SU7 续航实测谁更强？</span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="font-medium text-red-500">竞品回击：</span> 
                                            重点布局“真实工况达成率”对比内容，强调XNGP在长途续航中的节能优势。
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                建议抢占的高热度意图词
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">
                                    20万级纯电SUV性价比
                                </span>
                                <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">
                                    800V高压快充车型
                                </span>
                                <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">
                                    上海新能源牌照政策2025
                                </span>
                                <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">
                                    高速NGP真实体验
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Strategy Analysis */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-800 mb-3">综合策略分析</h4>
                        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                            <p>
                                <span className="font-bold text-gray-800">1. 扬长避短，强化智驾标签：</span>
                                当前品牌在“智能驾驶”相关问题中排名第一，应继续巩固。针对“续航里程”等竞品强势领域，建议避开直接参数对比，转而强调“扎实续航”和“充电速度”的差异化优势。
                            </p>
                            <p>
                                <span className="font-bold text-gray-800">2. 地域精准渗透：</span>
                                在“上海”、“深圳”等政策导向型城市表现强势，但在“北京”（低温续航）和“成都”（充电设施）存在内容空白。建议针对北方城市增加“热泵空调”、“低温实测”类科普内容，针对西南地区发布“充电地图”攻略。
                            </p>
                            <p>
                                <span className="font-bold text-gray-800">3. 情绪修复与引导：</span>
                                关于“内饰异味”的负面讨论虽热度不高但影响决策，需通过KOC真实体验进行正面覆盖。对于“售后服务”的中立评价，可通过发布“服务升级计划”及车主关怀案例来提升好感度。
                            </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">
                                生成详细洞察报告
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightDiagnosis;
