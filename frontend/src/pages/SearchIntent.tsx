import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Trash2, TrendingUp, MessageSquare, Database, Upload, CheckCircle, Zap, Bot, Sparkles, Moon, FileText, Lightbulb, X, ArrowRight, Target, AlertCircle, FileCheck } from 'lucide-react';
import { useIntent } from '../context/IntentContext';
import { segmentQuery } from '../utils/segmentation';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Mock Platform Data with Prices
const PLATFORMS = [
    { id: 'Deepseek', name: 'DeepSeek', users: '17200万', price: 150, icon: Bot },
    { id: '豆包', name: '豆包', users: '14500', price: 100, icon: Sparkles },
    { id: 'Hunyuan', name: '腾讯元宝', users: '3286万', price: 130, icon: MessageSquare },
    { id: '千问', name: '千问', users: '2000万', price: 140, icon: Zap },
    { id: 'Kimi', name: 'Kimi', users: '2100万', price: 120, icon: Moon },
    { id: '文心一言', name: '文心一言', users: '1200万', price: 180, icon: Database },
];

// Mock Recommended Questions
const RECOMMENDED_QUESTIONS = [
    { id: 1, query: "小鹏G6续航实测", reason: "近期热度飙升 150%", category: "竞品对比", quote: 600, type: 'hot' },
    { id: 2, query: "20万纯电SUV推荐", reason: "高转化潜力意图", category: "行业通用", quote: 800, type: 'potential' },
    { id: 3, query: "小鹏智驾好用吗", reason: "品牌核心优势点", category: "品牌专属", quote: 500, type: 'core' },
    { id: 4, query: "Model Y vs 小鹏G6", reason: "竞品对比高频词", category: "竞品对比", quote: 750, type: 'comp' },
];

const SearchIntent: React.FC = () => {
    const { intents, addIntent, removeIntent } = useIntent();
    const reportRef = useRef<HTMLDivElement>(null);
    
    // Platform Selection State
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(PLATFORMS.map(p => p.id));
    const [totalQuote, setTotalQuote] = useState(0);

    // Calculate Total Quote
    useEffect(() => {
        const platformMultiplier = selectedPlatforms.reduce((sum, pid) => {
            const p = PLATFORMS.find(platform => platform.id === pid);
            return sum + (p?.price || 0);
        }, 0);
        
        // Base calculation: (Base Intent Value + Platform Value) * Intent Count
        // Simplified for demo: Sum of platform prices * Intent Count * 0.1 (discount factor)
        const quote = intents.reduce((acc, item) => acc + item.quote, 0) + (platformMultiplier * intents.length * 0.5);
        setTotalQuote(Math.floor(quote));
    }, [selectedPlatforms, intents]);

    const togglePlatform = (id: string) => {
        setSelectedPlatforms(prev => 
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const toggleAllPlatforms = () => {
        if (selectedPlatforms.length === PLATFORMS.length) {
            setSelectedPlatforms([]);
        } else {
            setSelectedPlatforms(PLATFORMS.map(p => p.id));
        }
    };

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;

        try {
            // Wait for render
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const canvas = await html2canvas(reportRef.current, {
                scale: 2, // Higher resolution
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 20;

            // Calculate height in PDF units
            const imgProps = pdf.getImageProperties(imgData);
            const finalPdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // If height exceeds page, we might need multi-page logic, but for simple invoice we scale to fit or add pages
            // For now, let's fit width and let height flow
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalPdfHeight);
            pdf.save(`GEO_投放计划确认单_${new Date().toLocaleDateString()}.pdf`);
        } catch (error) {
            console.error('PDF Generation failed', error);
            alert('PDF生成失败，请重试');
        }
    };

    // Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuery, setNewQuery] = useState('');
    const [newCategory, setNewCategory] = useState('行业通用');
    // const [newQuote, setNewQuote] = useState(''); // Removed
    const [newProofFiles, setNewProofFiles] = useState<string[]>([]);
    const [newRankingTarget, setNewRankingTarget] = useState<'top1' | 'top3' | 'visibility'>('visibility');
    const [newExpectedAnswer, setNewExpectedAnswer] = useState('');

    const handleOpenModal = () => {
        setNewQuery('');
        setNewCategory('行业通用');
        setNewProofFiles([]);
        setNewRankingTarget('visibility');
        setNewExpectedAnswer('');
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map(f => f.name);
            setNewProofFiles(prev => [...prev, ...files]);
        }
    };

    const removeFile = (fileName: string) => {
        setNewProofFiles(prev => prev.filter(f => f !== fileName));
    };

    const handleAdd = () => {
        if (!newQuery) return;
        addIntent({
            query: newQuery,
            category: newCategory,
            prefixSuffix: '-', // Legacy, not used much now
            heatIndex: Math.floor(Math.random() * 40) + 60,
            quote: 0, // Default to 0 as manual quote is removed
            source: 'Manual',
            expectedAnswer: newExpectedAnswer,
            segmentation: segmentQuery(newQuery), // Auto segment
            proofMaterials: newProofFiles,
            rankingTarget: newRankingTarget
        });
        setIsModalOpen(false);
    };

    const handleAddRecommended = (item: typeof RECOMMENDED_QUESTIONS[0]) => {
        addIntent({
            query: item.query,
            category: item.category,
            prefixSuffix: '-',
            heatIndex: Math.floor(Math.random() * 40) + 60,
            quote: item.quote,
            source: 'Insight',
            expectedAnswer: '',
            segmentation: segmentQuery(item.query)
        });
    };

    return (
        <div className="page-container fade-in p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">意图定位 (Intent Positioning)</h1>
                <p className="text-gray-500">管理与优化核心搜索意图，智能拆解问题结构，并配置预期回答。</p>
            </header>

            {/* Platform Selection Area */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        目标平台选择与覆盖 (Platform Coverage)
                    </h3>
                    <div className="text-sm text-gray-500">
                        已选平台月活: <span className="font-bold text-gray-800">
                            {selectedPlatforms.reduce((sum, pid) => {
                                const p = PLATFORMS.find(pl => pl.id === pid);
                                return sum + parseFloat(p?.users || '0');
                            }, 0).toFixed(1)}万+
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={toggleAllPlatforms}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            selectedPlatforms.length === PLATFORMS.length
                            ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-100'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        全选平台
                    </button>
                    {PLATFORMS.map(platform => (
                        <button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                selectedPlatforms.includes(platform.id)
                                ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <platform.icon className={`w-4 h-4 ${selectedPlatforms.includes(platform.id) ? 'text-red-600' : 'text-gray-400'}`} />
                            <span>{platform.name}</span>
                            <span className="text-xs text-gray-400 ml-1">({platform.users})</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recommended Questions Area */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-red-600" />
                    根据洞察推荐的问题 (Insight Recommendations)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {RECOMMENDED_QUESTIONS.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    item.type === 'hot' ? 'bg-red-50 text-red-600' :
                                    item.type === 'potential' ? 'bg-green-50 text-green-600' :
                                    item.type === 'comp' ? 'bg-purple-50 text-purple-600' :
                                    'bg-blue-50 text-blue-600'
                                }`}>
                                    {item.reason}
                                </span>
                            </div>
                            <div className="font-medium text-gray-800 mb-3">{item.query}</div>
                            <button 
                                onClick={() => handleAddRecommended(item)}
                                className="w-full py-1.5 rounded bg-red-50 text-red-600 text-xs font-medium group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center gap-1"
                            >
                                <Plus className="w-3 h-3" />
                                添加到列表
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Intent List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-24">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Search className="w-5 h-5 text-gray-500" />
                        已定位意图列表 ({intents.length})
                    </h3>
                    <button 
                        onClick={handleOpenModal}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        添加意图
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-[1200px] w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-4 px-6 min-w-[240px]">核心问题 (Query)</th>
                                <th className="py-4 px-6 min-w-[120px]">意图类别</th>
                                <th className="py-4 px-6 min-w-[120px]">目标设定</th>
                                <th className="py-4 px-6 min-w-[140px]">材料状态</th>
                                <th className="py-4 px-6 min-w-[120px]">目标平台</th>
                                <th className="py-4 px-6 min-w-[240px]">知识库匹配 (KB Match)</th>
                                <th className="py-4 px-6 min-w-[120px]">地域</th>
                                <th className="py-4 px-6 min-w-[240px]">核心意图词</th>
                                <th className="py-4 px-6 min-w-[240px]">长尾词示例</th>
                                <th className="py-4 px-6 min-w-[320px]">预期回答</th>
                                <th className="py-4 px-6 min-w-[120px]">热度</th>
                                <th className="py-4 px-6 text-right min-w-[80px]">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {intents.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="py-4 px-6 font-medium text-gray-800 text-base align-top">
                                        <div className="mb-1">{item.query}</div>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                            {item.source}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${
                                            item.category === '行业通用' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            item.category === '品牌专属' ? 'bg-green-50 text-green-600 border-green-100' :
                                            item.category === '竞品对比' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                            'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        {item.rankingTarget && (
                                            <div className="flex items-center gap-1">
                                                <Target className={`w-4 h-4 ${
                                                    item.rankingTarget === 'top1' ? 'text-red-600' : 
                                                    item.rankingTarget === 'top3' ? 'text-orange-500' : 'text-blue-500'
                                                }`} />
                                                <span className={`text-xs font-medium ${
                                                    item.rankingTarget === 'top1' ? 'text-red-700' : 
                                                    item.rankingTarget === 'top3' ? 'text-orange-700' : 'text-blue-700'
                                                }`}>
                                                    {item.rankingTarget === 'top1' ? '首位' : 
                                                     item.rankingTarget === 'top3' ? '前三' : '露出'}
                                                </span>
                                            </div>
                                        )}
                                        {!item.rankingTarget && <span className="text-gray-400 text-xs">-</span>}
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        {item.materialStatus === 'ready' ? (
                                            <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded w-fit border border-green-100">
                                                <FileCheck className="w-3.5 h-3.5" />
                                                <span className="text-xs font-medium">已就绪</span>
                                            </div>
                                        ) : item.materialStatus === 'partial' ? (
                                            <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded w-fit border border-orange-100">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                <span className="text-xs font-medium">部分缺失</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-1 rounded w-fit border border-gray-100">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                <span className="text-xs font-medium">缺失</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <div className="flex flex-wrap gap-1">
                                            {item.targetPlatforms && item.targetPlatforms.length > 0 ? (
                                                item.targetPlatforms.map(p => (
                                                    <span key={p} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                                                        {p}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        {item.ragStatus === 'hit' ? (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                                        <CheckCircle className="w-3 h-3" />
                                                        已覆盖
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-medium">
                                                        召回率: <span className="text-green-600">{item.ragRecall}%</span>
                                                    </span>
                                                </div>
                                                {item.ragAnswer && (
                                                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 line-clamp-2" title={item.ragAnswer}>
                                                        <Database className="w-3 h-3 inline mr-1 text-gray-400" />
                                                        {item.ragAnswer}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-2 items-start">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                                    <Database className="w-3 h-3" />
                                                    未收录
                                                </span>
                                                <button className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                                    <Upload className="w-3 h-3" />
                                                    上传答案
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <div className="flex flex-wrap gap-1">
                                            {item.targetRegions && item.targetRegions.length > 0 ? (
                                                item.targetRegions.map(r => (
                                                    <span key={r} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100">
                                                        {r}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-xs">全国</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <div className="flex flex-wrap gap-1.5">
                                            <span className="px-2 py-1 bg-red-50 text-red-700 text-sm font-medium rounded border border-red-100">
                                                {item.segmentation.keywords}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <div className="flex flex-col gap-1.5">
                                            {item.segmentation.longTailExamples && item.segmentation.longTailExamples.map((ex, idx) => (
                                                <span key={idx} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 truncate max-w-[200px]" title={ex}>
                                                    {ex}
                                                </span>
                                            ))}
                                            {!item.segmentation.longTailExamples && <span className="text-xs text-gray-400">-</span>}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 text-sm align-top">
                                        <div className="flex items-start gap-2">
                                            <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                            <span>{item.expectedAnswer || '未配置'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-top">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 text-red-500 font-bold text-sm">
                                                <TrendingUp className="w-3 h-3" />
                                                {item.heatIndex}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right align-top">
                                        <button 
                                            onClick={() => removeIntent(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="删除"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {intents.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="py-12 text-center text-gray-400">
                                        暂无意图数据，请手动添加或从洞察页导入。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Sticky Quote Bar */}
            <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-6 px-4">
                    <div>
                        <p className="text-sm text-gray-500">已选平台</p>
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                            {selectedPlatforms.length > 0 ? `${selectedPlatforms.length} 个主流平台` : '未选择'}
                            <span className="text-xs text-gray-400 font-normal">
                                (覆盖 {selectedPlatforms.reduce((sum, pid) => {
                                    const p = PLATFORMS.find(pl => pl.id === pid);
                                    return sum + parseFloat(p?.users || '0');
                                }, 0).toFixed(1)}亿用户)
                            </span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div>
                        <p className="text-sm text-gray-500">优化意图数</p>
                        <p className="font-semibold text-gray-800">{intents.length} 个核心词</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 pr-8">
                    {/* <div className="text-right">
                        <p className="text-sm text-gray-500">系统自动报价 (Estimated Quote)</p>
                        <p className="text-2xl font-bold text-red-600">
                            ¥{totalQuote.toLocaleString()}
                        </p>
                    </div> */}
                    <button 
                        onClick={handleDownloadPDF}
                        className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        确认投放计划 (下载PDF)
                    </button>
                </div>
            </div>

            {/* Add Intent Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">手动录入新意图</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        用户问题 / 关键词 (Query)
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                        placeholder="例如：20万左右电车推荐..."
                                        value={newQuery}
                                        onChange={(e) => setNewQuery(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">意图类别 (Category)</label>
                                    <div className="relative">
                                        <select
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 outline-none bg-white appearance-none"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                        >
                                            <option>行业通用</option>
                                            <option>品牌专属</option>
                                            <option>竞品对比</option>
                                            <option>地域相关</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <ArrowRight className="w-4 h-4 rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">目标设定 (Ranking Target)</label>
                                    <div className="flex bg-gray-100 p-1 rounded-lg">
                                        {[
                                            { value: 'top1', label: '首位 (Top 1)' },
                                            { value: 'top3', label: '前三 (Top 3)' },
                                            { value: 'visibility', label: '露出' }
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => setNewRankingTarget(option.value as any)}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                                                    newRankingTarget === option.value
                                                    ? 'bg-white text-red-600 shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">
                                         证明材料 (Proof Materials)
                                         <span className="text-xs text-gray-400 ml-2 font-normal">可选，支持多个</span>
                                     </label>
                                     <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center hover:bg-gray-50 transition-colors relative h-[42px] flex items-center justify-center">
                                        <input 
                                            type="file" 
                                            multiple 
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                        />
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Upload className="w-4 h-4" />
                                            <span className="text-xs">点击上传</span>
                                        </div>
                                     </div>
                                     {newProofFiles.length > 0 && (
                                         <div className="mt-2 space-y-1 max-h-[60px] overflow-y-auto custom-scrollbar">
                                             {newProofFiles.map((file, idx) => (
                                                 <div key={idx} className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded text-gray-600">
                                                     <div className="flex items-center gap-1 truncate max-w-[120px]">
                                                         <FileText className="w-3 h-3 text-gray-400" />
                                                         <span className="truncate" title={file}>{file}</span>
                                                     </div>
                                                     <button onClick={() => removeFile(file)} className="text-gray-400 hover:text-red-500">
                                                         <X className="w-3 h-3" />
                                                     </button>
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                </div>
                                
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        预期回答配置 (Expected Answer)
                                        <span className="text-xs text-gray-400 ml-2 font-normal">可选，帮助AI更精准生成内容</span>
                                    </label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none h-24"
                                        placeholder="简述AI应如何回答，例如：推荐小鹏G6，强调性价比，对比Model Y的优势..."
                                        value={newExpectedAnswer}
                                        onChange={(e) => setNewExpectedAnswer(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                            >
                                取消
                            </button>
                            <button 
                                onClick={handleAdd}
                                disabled={!newQuery}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-red-200"
                            >
                                <Plus className="w-4 h-4" />
                                确认添加
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Printable Report Area */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <div ref={reportRef} className="w-[800px] bg-white p-12 text-gray-800 font-sans">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b-2 border-red-600 pb-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">GEO 智能体投放计划确认单</h1>
                            <p className="text-gray-500 text-sm">Generative Engine Optimization Plan</p>
                        </div>
                        <div className="text-right">
                            {/* <div className="text-4xl font-bold text-red-600 mb-1">¥{totalQuote.toLocaleString()}</div>
                            <p className="text-sm text-gray-500">预估总报价 (Total Quote)</p> */}
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">客户信息 (Client)</p>
                            <p className="font-bold text-lg">小鹏汽车 (XPeng Motors)</p>
                            <p className="text-sm text-gray-600">日期: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">投放概览 (Overview)</p>
                            <div className="flex gap-4">
                                <div>
                                    <span className="block text-xl font-bold">{intents.length}</span>
                                    <span className="text-xs text-gray-500">优化关键词数</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-bold">{selectedPlatforms.length}</span>
                                    <span className="text-xs text-gray-500">覆盖平台数</span>
                                </div>
                                <div>
                                    <span className="block text-xl font-bold">
                                        {selectedPlatforms.reduce((sum, pid) => {
                                            const p = PLATFORMS.find(pl => pl.id === pid);
                                            return sum + parseFloat(p?.users || '0');
                                        }, 0).toFixed(1)}亿+
                                    </span>
                                    <span className="text-xs text-gray-500">预估覆盖用户</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-200 pb-2 mb-4">已选投放平台 (Target Platforms)</h3>
                        <div className="flex flex-wrap gap-3">
                            {selectedPlatforms.map(pid => {
                                const p = PLATFORMS.find(pl => pl.id === pid);
                                return (
                                    <span key={pid} className="px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-700 border border-gray-200">
                                        {p?.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Intents Table */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-200 pb-2 mb-4">优化意图列表 (Optimization Intents)</h3>
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="p-3">核心问题 (Query)</th>
                                    <th className="p-3">核心词 (Keywords)</th>
                                    <th className="p-3">类别</th>
                                    {/* <th className="p-3 text-right">单价</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {intents.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="p-3 font-medium text-gray-800">{item.query}</td>
                                        <td className="p-3 text-gray-600">{item.segmentation.keywords}</td>
                                        <td className="p-3 text-gray-600">{item.category}</td>
                                        {/* <td className="p-3 text-right text-gray-800">¥{item.quote}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
                        <p>此报价单仅供参考，最终解释权归 AceFlow GEO 智能体系统所有。</p>
                        <p>Generated by Trae AI • {new Date().toISOString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchIntent;
