import React, { useState } from 'react';
import { Search, Plus, Trash2, TrendingUp, MessageSquare } from 'lucide-react';
import { useIntent } from '../context/IntentContext';
import { segmentQuery } from '../utils/segmentation';

const SearchIntent: React.FC = () => {
    const { intents, addIntent, removeIntent } = useIntent();
    
    // Form State
    const [newQuery, setNewQuery] = useState('');
    const [newCategory, setNewCategory] = useState('行业通用');
    const [newQuote, setNewQuote] = useState('');
    const [newExpectedAnswer, setNewExpectedAnswer] = useState('');

    const handleAdd = () => {
        if (!newQuery) return;
        addIntent({
            query: newQuery,
            category: newCategory,
            prefixSuffix: '-', // Legacy, not used much now
            heatIndex: Math.floor(Math.random() * 40) + 60,
            quote: Number(newQuote) || 0,
            source: 'Manual',
            expectedAnswer: newExpectedAnswer,
            segmentation: segmentQuery(newQuery) // Auto segment
        });
        setNewQuery('');
        setNewQuote('');
        setNewExpectedAnswer('');
    };

    return (
        <div className="page-container fade-in p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">意图定位 (Intent Positioning)</h1>
                <p className="text-gray-500">管理与优化核心搜索意图，智能拆解问题结构，并配置预期回答。</p>
            </header>

            {/* Manual Input Area */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-red-600" />
                    手动录入新意图 (Add New Intent)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">用户问题 / 关键词</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            placeholder="例如：20万左右电车推荐..."
                            value={newQuery}
                            onChange={(e) => setNewQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">意图类别</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none bg-white"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        >
                            <option>行业通用</option>
                            <option>品牌专属</option>
                            <option>竞品对比</option>
                            <option>地域相关</option>
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">单价预估 (¥)</label>
                         <input
                            type="number"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="500"
                            value={newQuote}
                            onChange={(e) => setNewQuote(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">预期回答配置 (Expected Answer)</label>
                        <div className="flex gap-4">
                             <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder="简述AI应如何回答，例如：推荐小鹏G6，强调性价比..."
                                value={newExpectedAnswer}
                                onChange={(e) => setNewExpectedAnswer(e.target.value)}
                            />
                            <button 
                                onClick={handleAdd}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                添加意图
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Intent List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Search className="w-5 h-5 text-gray-500" />
                        已定位意图列表 ({intents.length})
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-[1200px] w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-4 px-6 min-w-[240px]">核心问题 (Query)</th>
                                <th className="py-4 px-6 min-w-[120px]">意图类别</th>
                                <th className="py-4 px-6 min-w-[120px]">目标平台</th>
                                <th className="py-4 px-6 min-w-[240px]">智能拆词 (Segmentation)</th>
                                <th className="py-4 px-6 min-w-[320px]">预期回答 (Expected Answer)</th>
                                <th className="py-4 px-6 min-w-[120px]">热度/报价</th>
                                <th className="py-4 px-6 text-right w-[80px]">操作</th>
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
                                        <div className="flex flex-wrap gap-1.5">
                                            {item.segmentation.coreIntent !== '未识别' && (
                                                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded border border-red-100" title="核心意图">
                                                    {item.segmentation.coreIntent}
                                                </span>
                                            )}
                                            {item.segmentation.brand && (
                                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200" title="品牌词">
                                                    {item.segmentation.brand}
                                                </span>
                                            )}
                                            {item.segmentation.region && (
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100" title="地域词">
                                                    {item.segmentation.region}
                                                </span>
                                            )}
                                            {item.segmentation.suffixes.map((s, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-xs rounded border border-yellow-100" title="后缀词">
                                                    {s}
                                                </span>
                                            ))}
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
                                            <div className="text-gray-500 text-xs">
                                                ¥{item.quote}
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
                                    <td colSpan={7} className="py-12 text-center text-gray-400">
                                        暂无意图数据，请手动添加或从洞察页导入。
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchIntent;
