import React, { useState } from 'react';
import { 
    FileText, Zap, PenTool, ExternalLink, Bot, Sparkles, Star, ChevronRight, 
    Copy, CheckCircle2, Circle, TrendingUp, ArrowRight, Plus, Calendar, 
    MoreHorizontal, Send, Clock, AlertCircle, X, Search
} from 'lucide-react';

// --- Types ---

interface Article {
    id: number;
    title: string;
    targetSource: string;
    status: 'pending' | 'generating' | 'generated' | 'publishing' | 'published' | 'failed';
    date: string;
    preview: string;
}

interface Source {
    id: number;
    name: string;
    type: string;
    matchScore: number;
    platforms: string[];
    price: string;
    reason: string;
    tags: string[];
    isMatched: boolean;
    weight?: number; // For top cited
    platform?: string; // For top cited
}

interface CreationPlan {
    id: number;
    name: string;
    intent: string;
    status: 'draft' | 'in_progress' | 'completed';
    progress: number; // 0-100
    createdAt: string;
    step: 1 | 2 | 3 | 4; // Added step 4 for Publish
    selectedSources: number[];
    articles: Article[];
}

// --- Mock Data ---

const MOCK_PLANS: CreationPlan[] = [
    {
        id: 101,
        name: '2025款纯电SUV首发评测',
        intent: '20万左右性价比最高的电车推荐',
        status: 'in_progress',
        progress: 66,
        createdAt: '2024-12-15',
        step: 3,
        selectedSources: [1, 2],
        articles: [
            {
                id: 1,
                title: '2025年20万级纯电SUV谁最能打？小鹏G6 vs 特斯拉Model Y深度横评',
                targetSource: '汽车之家 - 深度评测',
                status: 'generated',
                date: '2024-12-16',
                preview: '随着2025款车型的陆续上市，20万级纯电SUV市场竞争进入白热化...'
            },
            {
                id: 2,
                title: '真实车主聊聊：开了半年小鹏G6，续航到底虚不虚？',
                targetSource: '懂车帝 - 车主口碑',
                status: 'generated',
                date: '2024-12-16',
                preview: '坐标北京，提车半年，行驶里程1.2万公里...'
            }
        ]
    },
    {
        id: 102,
        name: '春节自驾游安全指南',
        intent: '长途驾驶电车注意事项',
        status: 'draft',
        progress: 33,
        createdAt: '2024-12-16',
        step: 2,
        selectedSources: [3],
        articles: []
    }
];

const TOP_CITED_SOURCES = [
    { name: '汽车之家', weight: 9.8, platform: 'Deepseek/通义' },
    { name: '懂车帝', weight: 9.5, platform: '豆包/Kimi' },
    { name: '知乎', weight: 8.9, platform: '文心/Deepseek' },
    { name: '小红书', weight: 8.2, platform: 'Kimi/豆包' },
    { name: '新浪微博', weight: 7.5, platform: '通用' },
];

const RECOMMENDED_SOURCES: Source[] = [
    {
        id: 1,
        name: '汽车之家 - 深度评测',
        type: '垂直媒体',
        matchScore: 98,
        platforms: ['Deepseek', '通义千问'],
        price: '¥2,500/篇',
        reason: '完美匹配"汽车之家"高权重信源',
        tags: ['评测', '专业'],
        isMatched: true
    },
    {
        id: 2,
        name: '懂车帝 - 车主口碑',
        type: 'UGC社区',
        matchScore: 95,
        platforms: ['豆包', 'Kimi'],
        price: '¥1,200/篇',
        reason: '匹配"懂车帝"真实反馈权重',
        tags: ['口碑', '真实'],
        isMatched: true
    },
    {
        id: 3,
        name: '知乎 - 新能源话题',
        type: '问答社区',
        matchScore: 92,
        platforms: ['文心一言', 'Deepseek'],
        price: '¥800/回答',
        reason: '覆盖"知乎"高权重问答板块',
        tags: ['科普', '种草'],
        isMatched: true
    },
    {
        id: 4,
        name: '小红书 - 探店笔记',
        type: '社交媒体',
        matchScore: 88,
        platforms: ['Kimi', '豆包'],
        price: '¥500/篇',
        reason: '匹配"小红书"体验类意图',
        tags: ['探店', '美图'],
        isMatched: true
    }
];

const ContentStrategy: React.FC = () => {
    const [view, setView] = useState<'dashboard' | 'wizard'>('dashboard');
    const [plans, setPlans] = useState<CreationPlan[]>(MOCK_PLANS);
    const [currentPlan, setCurrentPlan] = useState<CreationPlan | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Wizard State
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [selectedSourceIds, setSelectedSourceIds] = useState<number[]>([]);
    const [generatedArticles, setGeneratedArticles] = useState<Article[]>([]);
    
    // New Plan Input
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanIntent, setNewPlanIntent] = useState('');

    const startNewPlan = () => {
        setIsCreateModalOpen(true);
    };

    const confirmCreatePlan = () => {
        const newPlan: CreationPlan = {
            id: Date.now(),
            name: newPlanName || '未命名计划',
            intent: newPlanIntent || '通用意图',
            status: 'draft',
            progress: 0,
            createdAt: new Date().toISOString().split('T')[0],
            step: 2, // Jump to step 2 (Source Selection) as step 1 is Intent Selection in Modal
            selectedSources: [],
            articles: []
        };
        setCurrentPlan(newPlan);
        setSelectedSourceIds([]);
        setGeneratedArticles([]);
        setStep(2); // Start at Source Selection
        setView('wizard');
        setIsCreateModalOpen(false);
        setNewPlanName('');
        setNewPlanIntent('');
    };

    const continuePlan = (plan: CreationPlan) => {
        setCurrentPlan(plan);
        setSelectedSourceIds(plan.selectedSources);
        setGeneratedArticles(plan.articles);
        setStep(plan.step);
        setView('wizard');
    };

    const toggleSelection = (id: number) => {
        setSelectedSourceIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleGenerateMock = () => {
        // Mock generation based on selected sources
        const newArticles: Article[] = selectedSourceIds.map((sid, index) => {
            const source = RECOMMENDED_SOURCES.find(s => s.id === sid);
            return {
                id: Date.now() + index,
                title: `[AI生成] 针对 ${source?.name} 的深度优化内容`,
                targetSource: source?.name || '未知渠道',
                status: 'generated',
                date: new Date().toISOString().split('T')[0],
                preview: '这是基于选定信源风格和用户意图自动生成的预览内容。AI已根据平台调性优化了语气和关键词布局...'
            };
        });
        setGeneratedArticles(newArticles);
    };

    const handlePublishMock = (articleId: number) => {
        setGeneratedArticles(prev => prev.map(a => 
            a.id === articleId ? { ...a, status: 'published' } : a
        ));
    };

    const saveAndExit = () => {
        if (currentPlan) {
            const updatedPlan = {
                ...currentPlan,
                selectedSources: selectedSourceIds,
                articles: generatedArticles,
                step: step,
                status: (step === 4 && generatedArticles.every(a => a.status === 'published') ? 'completed' : 'in_progress') as CreationPlan['status'],
                progress: step === 2 ? 33 : step === 3 ? 66 : 100
            };
            
            setPlans(prev => {
                const exists = prev.find(p => p.id === updatedPlan.id);
                if (exists) {
                    return prev.map(p => p.id === updatedPlan.id ? updatedPlan : p);
                } else {
                    return [updatedPlan, ...prev];
                }
            });
        }
        setView('dashboard');
    };

    // --- Renderers ---

    const renderDashboard = () => (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">内容创作及发布 (Content Creation & Publishing)</h1>
                    <p className="text-gray-500">统一管理GEO内容创作计划，全流程人工确认与干预。</p>
                </div>
                <button 
                    onClick={startNewPlan}
                    className="h-10 bg-red-600 text-white px-6 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> 新建计划
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">计划名称</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">核心意图</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">状态</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">进度</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">创建时间</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {plans.map(plan => (
                            <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{plan.name}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{plan.intent}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        plan.status === 'completed' ? 'bg-green-50 text-green-600' :
                                        plan.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
                                        'bg-gray-100 text-gray-500'
                                    }`}>
                                        {plan.status === 'completed' ? '已完成' :
                                         plan.status === 'in_progress' ? '进行中' : '草稿'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-24 bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-red-500 h-2 rounded-full" 
                                            style={{ width: `${plan.progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-1 block">Step {plan.step}/4</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> {plan.createdAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => continuePlan(plan)}
                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                    >
                                        {plan.status === 'completed' ? '查看详情' : '继续执行'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Plan Modal - Step 1: Intent Selection */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 text-lg">Step 1: 新建创作计划</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">计划名称</label>
                                <input 
                                    type="text" 
                                    placeholder="例如：2025春节电车长途评测" 
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                    value={newPlanName}
                                    onChange={e => setNewPlanName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">核心意图 (Search Intent)</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="例如：20万左右性价比最高的电车推荐" 
                                        className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                                        value={newPlanIntent}
                                        onChange={e => setNewPlanIntent(e.target.value)}
                                    />
                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">系统将基于核心意图自动分析高权重信源。</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                            >
                                取消
                            </button>
                            <button 
                                onClick={confirmCreatePlan}
                                disabled={!newPlanName || !newPlanIntent}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                下一步：选择信源 <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderWizardStep2 = () => (
        <div className="space-y-8 fade-in">
            {/* Market Analysis */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-blue-600 w-5 h-5" />
                    <h3 className="font-bold text-gray-800 text-lg">Step 2.1: 意图搜索高权重信源分析 (Market Analysis)</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {TOP_CITED_SOURCES.map((source, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 flex flex-col items-center text-center">
                            <div className="font-bold text-gray-900 mb-1">{source.name}</div>
                            <div className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full mb-2">权重: {source.weight}</div>
                            <div className="text-xs text-gray-400">{source.platform}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selection */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-red-600 w-5 h-5" />
                    <h3 className="font-bold text-gray-800 text-lg">Step 2.2: 确认投放信源 (Confirm Sources)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {RECOMMENDED_SOURCES.map((source) => {
                        const isSelected = selectedSourceIds.includes(source.id);
                        return (
                            <div 
                                key={source.id} 
                                className={`bg-white p-6 rounded-xl shadow-sm border transition-all cursor-pointer group relative ${
                                    isSelected ? 'border-red-500 ring-1 ring-red-500 bg-red-50/10' : 'border-gray-200 hover:shadow-md hover:border-red-200'
                                }`}
                                onClick={() => toggleSelection(source.id)}
                            >
                                <div className="absolute top-6 right-6">
                                    {isSelected ? (
                                        <CheckCircle2 className="w-6 h-6 text-red-600 fill-red-50" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-300 group-hover:text-red-400" />
                                    )}
                                </div>
                                <div className="flex items-start gap-4 mb-4 pr-8">
                                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 font-bold text-xl shrink-0">
                                        {source.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors">
                                            {source.name}
                                        </h3>
                                        <div className="flex gap-2 mt-1 flex-wrap">
                                            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> 已匹配资源库
                                            </span>
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">{source.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
                                        <Zap className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-medium">推荐理由：</span>
                                            {source.reason}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div className="text-gray-800 font-bold text-lg">{source.price}</div>
                                    <div className="text-xs text-gray-400">
                                        AI匹配度 <span className="text-red-600 font-bold text-base ml-1">{source.matchScore}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                    onClick={() => setStep(3)}
                    disabled={selectedSourceIds.length === 0}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                >
                    确认信源并下一步 <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const renderWizardStep3 = () => (
        <div className="space-y-8 fade-in">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Bot className="text-red-600 w-5 h-5" />
                    <h3 className="font-bold text-gray-800 text-lg">Step 3: 内容生成与预览 (Content Generation)</h3>
                </div>
                {generatedArticles.length === 0 && (
                    <button 
                        onClick={handleGenerateMock}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Sparkles className="w-4 h-4" /> 开始AI生成
                    </button>
                )}
            </div>

            {generatedArticles.length > 0 ? (
                <div className="space-y-6">
                    {generatedArticles.map((article) => (
                        <div key={article.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-600">
                                            {article.status === 'generated' ? '已生成' : '生成中'}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <FileText className="w-3 h-3" />
                                            目标: {article.targetSource}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="重新生成">
                                        <Sparkles className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm text-gray-600 leading-relaxed border-l-4 border-gray-200">
                                <p className="mb-2 font-medium text-gray-400 text-xs uppercase tracking-wider">Content Preview</p>
                                {article.preview}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                    <Copy className="w-4 h-4" /> 复制全文
                                </button>
                                <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> 下载文档
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">点击右上角按钮开始生成内容</p>
                </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-200">
                <button 
                    onClick={() => setStep(2)}
                    className="text-gray-500 font-medium hover:text-gray-700 px-4 py-2"
                >
                    上一步
                </button>
                <button 
                    onClick={() => setStep(4)}
                    disabled={generatedArticles.length === 0}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                >
                    确认内容并下一步 <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const renderWizardStep4 = () => (
        <div className="space-y-8 fade-in">
            <div className="flex items-center gap-2 mb-4">
                <Send className="text-green-600 w-5 h-5" />
                <h3 className="font-bold text-gray-800 text-lg">Step 4: 内容发布与状态 (Publishing)</h3>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">文章标题</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">发布渠道</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">当前状态</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">人工干预</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {generatedArticles.map(article => (
                            <tr key={article.id}>
                                <td className="px-6 py-4 font-medium text-gray-800">{article.title}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{article.targetSource}</td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium w-fit ${
                                        article.status === 'published' ? 'bg-green-100 text-green-700' :
                                        article.status === 'publishing' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {article.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> :
                                         article.status === 'publishing' ? <Clock className="w-3 h-3 animate-spin" /> :
                                         <AlertCircle className="w-3 h-3" />}
                                        {article.status === 'published' ? '已发布' :
                                         article.status === 'publishing' ? '发布中' : '待发布'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {article.status !== 'published' && (
                                        <button 
                                            onClick={() => handlePublishMock(article.id)}
                                            disabled={article.status === 'publishing'}
                                            className="bg-gray-900 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-black transition-colors"
                                        >
                                            确认发布
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
                <button 
                    onClick={() => setStep(3)}
                    className="text-gray-500 font-medium hover:text-gray-700 px-4 py-2"
                >
                    上一步
                </button>
                <button 
                    onClick={saveAndExit}
                    className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex items-center gap-2"
                >
                    完成计划并退出 <CheckCircle2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="page-container fade-in p-6">
            {view === 'wizard' ? (
                <div className="max-w-5xl mx-auto">
                    {/* Wizard Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <span onClick={() => setView('dashboard')} className="cursor-pointer hover:text-gray-800">创作计划</span>
                                <ChevronRight className="w-4 h-4" />
                                <span>{currentPlan?.name}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">{currentPlan?.intent}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4].map(s => (
                                <React.Fragment key={s}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                        step >= s ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {s}
                                    </div>
                                    {s < 4 && <div className={`w-12 h-1 ${step > s ? 'bg-red-600' : 'bg-gray-200'}`} />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Wizard Content */}
                    {step === 2 && renderWizardStep2()}
                    {step === 3 && renderWizardStep3()}
                    {step === 4 && renderWizardStep4()}
                </div>
            ) : (
                renderDashboard()
            )}
        </div>
    );
};

export default ContentStrategy;