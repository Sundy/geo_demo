import React, { useState } from 'react';
import { 
    Activity, Globe, Target, Layers, ChevronDown, MapPin, Cpu,
    MessageCircle, Award, ThumbsUp, Check, Calendar,
    Bot, Sparkles, Zap, Moon, MessageSquare
} from 'lucide-react';
import InsightIndustry from './tabs/InsightIndustry';
import InsightBrand from './tabs/InsightBrand';
import InsightCompetitor from './tabs/InsightCompetitor';
import InsightRegion from './tabs/InsightRegion';
import InsightCharts from '../components/InsightCharts';

const InsightDiagnosis: React.FC = () => {
    // Filter States
    const [selectedBrand, setSelectedBrand] = useState('小鹏');
    const [selectedProduct, setSelectedProduct] = useState('新能源车'); // Industry/Category
    const [timeRange, setTimeRange] = useState('近7天');
    const [selectedModels, setSelectedModels] = useState<string[]>(['Deepseek', '豆包', '千问', 'Kimi', '文心']); // Default all
    
    // Tab State
    const [activeTab, setActiveTab] = useState<'industry' | 'brand' | 'competitor' | 'region'>('industry');

    // Model Definitions with Icons
    const models = [
        { id: 'Deepseek', name: 'DeepSeek', icon: Bot },
        { id: '豆包', name: '豆包', icon: Sparkles },
        { id: '千问', name: '千问', icon: Zap },
        { id: 'Kimi', name: 'Kimi', icon: Moon },
        { id: '文心', name: '文心', icon: MessageSquare },
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
            '千问': { index: 55.8, mention: 4.5, top: 38.5, sentiment: 91.2 },
            'Kimi': { index: 60.5, mention: 5.0, top: 43.8, sentiment: 93.5 },
            '文心': { index: 54.2, mention: 4.2, top: 35.6, sentiment: 89.8 }
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-xl bg-white/95">
                {/* Left: Brand & Product */}
                <div className="flex items-center gap-4 pl-2">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{selectedBrand}</h1>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="relative group">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-gray-200">
                            <span>{selectedProduct}</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Right: Time & Platforms */}
                <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 md:pb-0">
                    {/* Time Range */}
                    <div className="relative shrink-0">
                        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:border-red-200 hover:text-red-600 transition-all shadow-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{timeRange}</span>
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                        </button>
                    </div>

                    <div className="w-px h-6 bg-gray-200 hidden md:block shrink-0"></div>

                    {/* AI Platforms - Pill Style */}
                    <div className="flex items-center gap-2">
                        {/* All Platform Button */}
                        <button 
                            onClick={() => toggleModel('all')}
                            className={`
                                flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0
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
                                    flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all border shrink-0
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
                            <p className="text-sm text-gray-500 mb-1">AI引用率</p>
                            <h3 className="text-3xl font-bold text-gray-800">{metrics.index}<span className="text-lg text-gray-400 font-normal ml-1">%</span></h3>
                        </div>
                        <div className="p-2 rounded-lg bg-red-50">
                            <Activity className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-green-500">+2.1%</span>
                        <span className="text-gray-400 ml-2">较上周</span>
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
            </div>
        </div>
    );
};

export default InsightDiagnosis;
