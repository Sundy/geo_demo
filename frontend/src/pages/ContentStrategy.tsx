import React, { useState } from 'react';
import { 
    FileText, Zap, PenTool, ExternalLink, Bot, Sparkles, Star, ChevronRight, 
    Copy, CheckCircle2, Circle, TrendingUp, ArrowRight, Plus, Calendar, 
    MoreHorizontal, Send, Clock, AlertCircle, X, Search, Edit
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

interface MediaResource {
    id: number;
    name: string;
    type: string;
    price: number;
    inclusionRate: string; // 收录率
    publishTime: string; // 出稿时间
    pcWeight: number; // 电脑权重
    mobileWeight: number; // 移动权重
    isNewsSource: boolean; // 新闻源
    allowLink: boolean; // 可带链接
    allowPhone: boolean; // 可带电话
    remarks: string; // 备注
    tags: string[];
}

// --- Mock Data ---

const MOCK_MEDIA_RESOURCES: MediaResource[] = [
    { id: 1, name: '新浪新闻-科技频道', type: '综合门户', price: 120, inclusionRate: '95%', publishTime: '24小时', pcWeight: 8, mobileWeight: 9, isNewsSource: true, allowLink: true, allowPhone: false, remarks: '白名单来源', tags: ['科技', '首发'] },
    { id: 2, name: '腾讯网-汽车', type: '综合门户', price: 150, inclusionRate: '92%', publishTime: '12小时', pcWeight: 9, mobileWeight: 9, isNewsSource: true, allowLink: false, allowPhone: false, remarks: '需正规稿件', tags: ['汽车', '高权'] },
    { id: 3, name: '网易财经', type: '综合门户', price: 180, inclusionRate: '88%', publishTime: '48小时', pcWeight: 7, mobileWeight: 8, isNewsSource: true, allowLink: true, allowPhone: true, remarks: '财经类首选', tags: ['财经', '深度'] },
    { id: 4, name: '太平洋汽车网', type: '垂直媒体', price: 80, inclusionRate: '90%', publishTime: '2小时', pcWeight: 6, mobileWeight: 7, isNewsSource: false, allowLink: true, allowPhone: false, remarks: '收录快', tags: ['汽车', '垂直'] },
    { id: 5, name: '今日头条-科技', type: '新闻客户端', price: 50, inclusionRate: '85%', publishTime: '即时', pcWeight: 5, mobileWeight: 9, isNewsSource: false, allowLink: false, allowPhone: false, remarks: '推荐流', tags: ['信息流'] },
    { id: 6, name: '凤凰网-商业', type: '综合门户', price: 200, inclusionRate: '96%', publishTime: '24小时', pcWeight: 8, mobileWeight: 8, isNewsSource: true, allowLink: true, allowPhone: true, remarks: '审核严', tags: ['商业'] },
    { id: 7, name: '中关村在线', type: '垂直媒体', price: 100, inclusionRate: '91%', publishTime: '6小时', pcWeight: 7, mobileWeight: 7, isNewsSource: true, allowLink: true, allowPhone: false, remarks: '数码科技', tags: ['数码'] },
    { id: 8, name: '雪球财经', type: '垂直媒体', price: 120, inclusionRate: '89%', publishTime: '12小时', pcWeight: 6, mobileWeight: 8, isNewsSource: false, allowLink: true, allowPhone: false, remarks: '投资人群', tags: ['金融'] },
    { id: 9, name: '36氪', type: '垂直媒体', price: 300, inclusionRate: '98%', publishTime: '审核制', pcWeight: 9, mobileWeight: 9, isNewsSource: true, allowLink: false, allowPhone: false, remarks: '创投首发', tags: ['创投'] },
    { id: 10, name: '界面新闻', type: '新闻客户端', price: 250, inclusionRate: '94%', publishTime: '24小时', pcWeight: 8, mobileWeight: 9, isNewsSource: true, allowLink: false, allowPhone: false, remarks: '高质量', tags: ['新闻'] },
];

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
        platforms: ['Deepseek', '千问'],
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
    
    // Media Selection State
    const [mediaPage, setMediaPage] = useState(1);
    const [mediaFilters, setMediaFilters] = useState({
        channelType: '不限',
        portal: '不限',
        region: '不限',
        newsSource: '不限',
        special: '不限',
        price: '不限',
        sort: '默认'
    });

    // New Plan Input
    const [newPlanName, setNewPlanName] = useState('');
    const [newPlanIntent, setNewPlanIntent] = useState('');

    const startNewPlan = () => {
        // Reset inputs
        setNewPlanName('');
        setNewPlanIntent('');
        setCurrentPlan(null);
        setStep(1);
        setView('wizard');
    };

    const handleStep1Next = () => {
        const newPlan: CreationPlan = {
            id: Date.now(),
            name: newPlanName || '未命名计划',
            intent: newPlanIntent || '通用意图',
            status: 'draft',
            progress: 25,
            createdAt: new Date().toISOString().split('T')[0],
            step: 2,
            selectedSources: [],
            articles: []
        };
        setCurrentPlan(newPlan);
        setSelectedSourceIds([]);
        setGeneratedArticles([]);
        setStep(2);
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
            // Try to find in Media Resources first, then Recommended Sources (fallback)
            const source = MOCK_MEDIA_RESOURCES.find(s => s.id === sid) || RECOMMENDED_SOURCES.find(s => s.id === sid);
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

    const renderWizardStep1 = () => (
        <div className="space-y-8 fade-in">
             <div className="flex items-center gap-2 mb-4">
                <PenTool className="text-red-600 w-5 h-5" />
                <h3 className="font-bold text-gray-800 text-lg">Step 1: 定义创作意图 (Define Intent)</h3>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">计划名称</label>
                        <input 
                            type="text" 
                            placeholder="例如：2025春节电车长途评测" 
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                            value={newPlanName}
                            onChange={e => setNewPlanName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">核心意图 (Search Intent)</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="例如：20万左右性价比最高的电车推荐" 
                                className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                                value={newPlanIntent}
                                onChange={e => setNewPlanIntent(e.target.value)}
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <Bot className="w-3 h-3" /> 系统将基于核心意图自动分析高权重信源。
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                    onClick={handleStep1Next}
                    disabled={!newPlanName || !newPlanIntent}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                >
                    下一步：选择信源 <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

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
        </div>
    );

    const renderWizardStep2 = () => {
        const filterGroups = [
            { label: '频道类型', key: 'channelType', options: ['不限', 'IT科技', '健康医疗', '新闻资讯', '汽车网站', '财经商业', '娱乐休闲', '游戏网站', '亲子母婴', '食品餐饮', '生活消费', '女性时尚'] },
            { label: '综合门户', key: 'portal', options: ['不限', '新浪网', '搜狐网', '腾讯网', '网易网', '凤凰网', '中华网', '人民网', '央视网', '千龙网', '新华网'] },
            { label: '地区', key: 'region', options: ['不限', '综合全国', '北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江'] },
            { label: '新闻源', key: 'newsSource', options: ['不限', '百度新闻源'] },
            { label: '特别行业', key: 'special', options: ['不限', '金融区块链', '党政加分', '健康', '白名单来源', '移动端媒体', '需要来源媒体', '官方媒体', '官方首发'] },
            { label: '价格分类', key: 'price', options: ['不限', '0-50', '51-100', '101-200', '200以上'] },
        ];

        return (
            <div className="space-y-6 fade-in">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-red-600 w-5 h-5" />
                    <h3 className="font-bold text-gray-800 text-lg">Step 2: 信源选择 (Source Selection)</h3>
                </div>

                {/* Filter Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4 text-sm">
                    {filterGroups.map((group) => (
                        <div key={group.key} className="flex items-start gap-4">
                            <span className="text-gray-500 font-medium whitespace-nowrap pt-1 w-20 text-right">{group.label}：</span>
                            <div className="flex flex-wrap gap-2 flex-1">
                                {group.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setMediaFilters({ ...mediaFilters, [group.key]: option })}
                                        className={`px-3 py-1 rounded hover:text-red-600 transition-colors ${
                                            (mediaFilters as any)[group.key] === option 
                                            ? 'bg-red-600 text-white hover:text-white' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                                {group.key === 'price' && (
                                    <div className="flex items-center gap-2 ml-4">
                                        <input type="text" placeholder="start" className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-xs" />
                                        <span className="text-gray-400">-</span>
                                        <input type="text" placeholder="end" className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-xs" />
                                        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 text-xs">确定</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {/* Sort Row */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-2">
                        <span className="text-gray-500 font-medium whitespace-nowrap w-20 text-right">排序：</span>
                        <div className="flex gap-1">
                            {['默认', '价格', '收录率', '出稿率', '电脑权重', '移动权重', '出稿时间', '投诉'].map(sort => (
                                <button 
                                    key={sort}
                                    onClick={() => setMediaFilters({ ...mediaFilters, sort })}
                                    className={`px-3 py-1 rounded flex items-center gap-1 ${
                                        mediaFilters.sort === sort ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {sort}
                                    {mediaFilters.sort === sort && <ArrowRight className="w-3 h-3 rotate-90" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Media List Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 w-12 text-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                                    </th>
                                    <th className="px-4 py-3">媒体名称</th>
                                    <th className="px-4 py-3">价格</th>
                                    <th className="px-4 py-3">收录率</th>
                                    <th className="px-4 py-3">出稿时间</th>
                                    <th className="px-4 py-3 text-center">电脑权重</th>
                                    <th className="px-4 py-3 text-center">移动权重</th>
                                    <th className="px-4 py-3 text-center">新闻源</th>
                                    <th className="px-4 py-3 text-center">链接</th>
                                    <th className="px-4 py-3 text-center">电话</th>
                                    <th className="px-4 py-3">备注</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MOCK_MEDIA_RESOURCES.map((media) => (
                                    <tr 
                                        key={media.id} 
                                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                                            selectedSourceIds.includes(media.id) ? 'bg-red-50/30' : ''
                                        }`}
                                        onClick={() => toggleSelection(media.id)}
                                    >
                                        <td className="px-4 py-3 text-center">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedSourceIds.includes(media.id)}
                                                onChange={() => toggleSelection(media.id)}
                                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900">{media.name}</div>
                                            <div className="flex gap-1 mt-1">
                                                {media.tags.map(tag => (
                                                    <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{tag}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-red-600 font-bold">¥{media.price}</td>
                                        <td className="px-4 py-3 text-green-600 font-medium">{media.inclusionRate}</td>
                                        <td className="px-4 py-3 text-gray-600">{media.publishTime}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{media.pcWeight}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">{media.mobileWeight}</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {media.isNewsSource ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-gray-300">-</span>}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {media.allowLink ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {media.allowPhone ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs max-w-[150px] truncate" title={media.remarks}>
                                            {media.remarks}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                        <div className="text-sm text-gray-500">
                            显示 1 到 {MOCK_MEDIA_RESOURCES.length} 条，共 {MOCK_MEDIA_RESOURCES.length} 条
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-white disabled:opacity-50" disabled>上一页</button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium">1</button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-white">2</button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-white">3</button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-white">下一页</button>
                        </div>
                    </div>
                </div>
                
                {/* Footer Actions */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                     <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                        <span className="font-medium">已选择:</span>
                        <span className="text-red-600 font-bold">{selectedSourceIds.length}</span>
                        <span>个媒体</span>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setStep(1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            上一步
                        </button>
                        <button 
                            onClick={() => setStep(3)}
                            disabled={selectedSourceIds.length === 0}
                            className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                        >
                            确认信源并下一步 <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

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
                                    <Edit className="w-4 h-4" /> 在线编辑
                                </button>
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
                                <span>{step === 1 ? '新建计划' : currentPlan?.name}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">{step === 1 ? '定义创作意图' : currentPlan?.intent}</h2>
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
                    {step === 1 && renderWizardStep1()}
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