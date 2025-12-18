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
        // Base metrics data for each platform (Mock)
        const platformData: Record<string, any> = {
            'Deepseek': { index: 58.4, mention: 4.8, top: 42.2, sentiment: 92.5 },
            '豆包': { index: 62.1, mention: 5.2, top: 45.0, sentiment: 94.0 },
            'Hunyuan': { index: 56.5, mention: 4.6, top: 39.8, sentiment: 90.5 },
            '千问': { index: 55.8, mention: 4.5, top: 38.5, sentiment: 91.2 },
            'Kimi': { index: 60.5, mention: 5.0, top: 43.8, sentiment: 93.5 },
            '文心一言': { index: 54.2, mention: 4.2, top: 35.6, sentiment: 89.8 }
        };

        if (platforms.length === 0) return { brandIndex: 0, index: 0, mention: 0, top: 0, sentiment: 0 };

        // Calculate average
        let totalIndex = 0, totalMention = 0, totalTop = 0, totalSentiment = 0;
        
        platforms.forEach(p => {
            const data = platformData[p] || platformData['Deepseek'];
            totalIndex += data.index;
            totalMention += data.mention;
            totalTop += data.top;
            totalSentiment += data.sentiment;
        });

        const count = platforms.length;
        const avgIndex = totalIndex / count;
        const avgMention = totalMention / count;
        const avgTop = totalTop / count;
        const avgSentiment = totalSentiment / count;

        // Calculate Brand Index (Weighted Score)
        // Formula: Index * 0.4 + Mention * 0.2 + Top * 0.2 + Sentiment * 0.2
        // Note: Mention is typically low (e.g. 5%), so we normalize it by multiplying by 10 or similar? 
        // Or just use the raw values if that's the business logic. 
        // Let's assume a normalized calculation for demo:
        // (Index + Top + Sentiment + Mention * 5) / 4 (Just a mock logic)
        const brandIndex = (avgIndex * 0.4 + avgTop * 0.3 + avgSentiment * 0.3).toFixed(1);

        return {
            brandIndex,
            index: avgIndex.toFixed(1),
            mention: avgMention.toFixed(1),
            top: avgTop.toFixed(1),
            sentiment: avgSentiment.toFixed(1)
        };
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

            {/* Global Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">AI品牌指数</p>
                            <h3 className="text-3xl font-bold text-red-600">{metrics.brandIndex}</h3>
                        </div>
                        <div className="p-2 rounded-lg bg-red-100">
                            <Sparkles className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-red-600 font-medium">综合评分</span>
                        <span className="text-gray-400 ml-2">Weighted Score</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">AI提及率</p>
                            <h3 className="text-3xl font-bold text-gray-800">
                                {metrics.mention}<span className="text-lg text-gray-400 font-normal ml-1">%</span>
                            </h3>
                        </div>
                        <div className="p-2 rounded-lg bg-red-50">
                            <MessageCircle className="w-6 h-6 text-red-400" />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-green-500">+0.5%</span>
                        <span className="text-gray-400 ml-2">较上周</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">首位提及率</p>
                            <h3 className="text-3xl font-bold text-gray-800">
                                {metrics.top}<span className="text-lg text-gray-400 font-normal ml-1">%</span>
                            </h3>
                        </div>
                        <div className="p-2 rounded-lg bg-gray-50">
                            <Award className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-green-500">+1.8%</span>
                        <span className="text-gray-400 ml-2">较上周</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">正面情绪占比</p>
                            <h3 className="text-3xl font-bold text-gray-800">
                                {metrics.sentiment}<span className="text-lg text-gray-400 font-normal ml-1">%</span>
                            </h3>
                        </div>
                        <div className="p-2 rounded-lg bg-gray-50">
                            <ThumbsUp className="w-6 h-6 text-gray-500" />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-red-500">-0.3%</span>
                        <span className="text-gray-400 ml-2">较上周</span>
                    </div>
                </div>
            </div>

            {/* Global Analysis Charts */}
            <InsightCharts brandName={selectedBrand} />

            {/* Tabbed Content: Brand Search Questions & Weights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-red-600" />
                        品牌搜索问题及权重 (Brand Search Questions & Weights)
                    </h2>
                    
                    {/* Tab Navigation */}
                    <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg w-fit">
                        <button 
                            onClick={() => setActiveTab('industry')}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                                ${activeTab === 'industry' 
                                    ? 'bg-white text-red-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            <Globe className="w-4 h-4" />
                            看行业 (Industry)
                        </button>
                        <button 
                            onClick={() => setActiveTab('brand')}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                                ${activeTab === 'brand' 
                                    ? 'bg-white text-red-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            <Layers className="w-4 h-4" />
                            看品牌 (Brand)
                        </button>
                        <button 
                            onClick={() => setActiveTab('competitor')}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                                ${activeTab === 'competitor' 
                                    ? 'bg-white text-red-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            <Target className="w-4 h-4" />
                            看竞品 (Competitor)
                        </button>
                        <button 
                            onClick={() => setActiveTab('region')}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                                ${activeTab === 'region' 
                                    ? 'bg-white text-red-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }
                            `}
                        >
                            <MapPin className="w-4 h-4" />
                            看地域 (Region)
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6 bg-gray-50/50">
                    {activeTab === 'industry' && (
                        <InsightIndustry platform={platformDisplayString} onlyTable={true} />
                    )}
                    {activeTab === 'brand' && (
                        <InsightBrand platform={platformDisplayString} onlyTable={true} />
                    )}
                    {activeTab === 'competitor' && (
                        <InsightCompetitor platform={platformDisplayString} onlyTable={true} />
                    )}
                    {activeTab === 'region' && (
                        <InsightRegion platform={platformDisplayString} onlyTable={true} />
                    )}
                </div>

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
        </div>
    );
};

export default InsightDiagnosis;
