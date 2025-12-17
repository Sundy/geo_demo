import React, { useState } from 'react';
import { 
    Search, 
    Download, 
    ChevronDown, 
    ChevronUp, 
    Zap, 
    CheckCircle, 
    XCircle,
    FileText,
    History,
    Play
} from 'lucide-react';

// Mock Data Types
interface TestRecord {
    id: string;
    prompt: string;
    targetWord: string;
    testCount: number;
    quoteRate: string; // 引用率
    recommendRate: string; // 推荐率
    top3Rate: string; // 前三率
    top1Rate: string; // 置顶率
    time: string;
    details: TestDetail[];
}

interface TestDetail {
    platform: string;
    prompt: string;
    targetWord: string;
    isRecommended: boolean;
    isTop3: boolean;
    isTop1: boolean;
    mentionCount: number;
    status: 'completed';
}

const RealtimeSearch: React.FC = () => {
    // Form State
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['DeepSeek', '豆包']);
    const [prompt, setPrompt] = useState('');
    const [targetInfo, setTargetInfo] = useState('');
    const [testCount, setTestCount] = useState<string>('1');
    const [historySearch, setHistorySearch] = useState('');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const platforms = [
        { id: '豆包', name: '豆包' },
        { id: 'DeepSeek', name: 'DeepSeek' },
        { id: '元宝', name: '元宝' },
        { id: 'Kimi', name: 'Kimi' },
        { id: '通义', name: '通义' },
        { id: '百度AI', name: '百度AI' },
    ];

    // Mock History Data
    const historyData: TestRecord[] = [
        {
            id: '1',
            prompt: '成都离婚律师哪个专业',
            targetWord: '李峻律师',
            testCount: 1,
            quoteRate: '100%',
            recommendRate: '100%',
            top3Rate: '100%',
            top1Rate: '100%',
            time: '2025-12-17 19:30',
            details: [
                {
                    platform: 'DeepSeek',
                    prompt: '成都离婚律师哪个专业',
                    targetWord: '李峻律师',
                    isRecommended: true,
                    isTop3: true,
                    isTop1: true,
                    mentionCount: 3,
                    status: 'completed'
                },
                {
                    platform: '豆包',
                    prompt: '成都离婚律师哪个专业',
                    targetWord: '李峻律师',
                    isRecommended: true,
                    isTop3: true,
                    isTop1: true,
                    mentionCount: 2,
                    status: 'completed'
                }
            ]
        },
        {
            id: '2',
            prompt: '2025年性价比高的新能源SUV推荐',
            targetWord: '小鹏G6',
            testCount: 5,
            quoteRate: '80%',
            recommendRate: '60%',
            top3Rate: '40%',
            top1Rate: '20%',
            time: '2025-12-17 14:20',
            details: [
                { platform: 'DeepSeek', prompt: '...', targetWord: '小鹏G6', isRecommended: true, isTop3: true, isTop1: false, mentionCount: 1, status: 'completed' },
                { platform: 'Kimi', prompt: '...', targetWord: '小鹏G6', isRecommended: true, isTop3: false, isTop1: false, mentionCount: 1, status: 'completed' },
            ]
        }
    ];

    const togglePlatform = (id: string) => {
        if (selectedPlatforms.includes(id)) {
            setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
        } else {
            setSelectedPlatforms([...selectedPlatforms, id]);
        }
    };

    const toggleExpand = (id: string) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    return (
        <div className="page-container fade-in p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-red-600" />
                    实时查询 (Realtime Search)
                </h1>
                <p className="text-gray-500 text-sm mt-1">多平台实时搜索检测，验证关键词露出与排名情况。</p>
            </div>

            {/* Config Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="space-y-8">
                    {/* 1. Platform Selection */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-3">平台选择 (勾选)</label>
                            <div className="flex flex-wrap gap-4">
                                {platforms.map(p => (
                                    <label key={p.id} className="flex items-center gap-2 cursor-pointer group">
                                        <div className={`
                                            w-5 h-5 rounded border flex items-center justify-center transition-colors
                                            ${selectedPlatforms.includes(p.id) ? 'bg-red-600 border-red-600' : 'border-gray-300 bg-white group-hover:border-red-400'}
                                        `}>
                                            {selectedPlatforms.includes(p.id) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <input 
                                            type="checkbox" 
                                            className="hidden" 
                                            checked={selectedPlatforms.includes(p.id)}
                                            onChange={() => togglePlatform(p.id)}
                                        />
                                        <span className={`text-sm font-medium transition-colors ${selectedPlatforms.includes(p.id) ? 'text-red-600' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                            {p.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Prompt Input */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                提示词 <span className="text-gray-400 font-normal ml-2">输入测试提示词</span>
                            </label>
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm transition-all"
                                rows={2}
                                placeholder="例如：成都离婚律师哪个专业？"
                            />
                        </div>
                    </div>

                    {/* 3. Target Info */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                露出信息 <span className="text-gray-400 font-normal ml-2">输入露出信息</span>
                            </label>
                            <input 
                                type="text" 
                                value={targetInfo}
                                onChange={(e) => setTargetInfo(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm transition-all"
                                placeholder="例如：李峻律师"
                            />
                        </div>
                    </div>

                    {/* 4. Test Count */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                输入测试次数
                            </label>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="number" 
                                    value={testCount}
                                    onChange={(e) => setTestCount(e.target.value)}
                                    className="w-32 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none shadow-sm transition-all"
                                    min="1"
                                />
                                <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2">
                                    <Play className="w-4 h-4" /> 开始检测
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* History Section */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-800">历史记录</h2>
                    </div>
                </div>

                <div className="space-y-4">
                    {historyData.map((record) => (
                        <div key={record.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Summary Row */}
                            <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors">
                                <div className="lg:col-span-4 space-y-1">
                                    <div className="text-xs text-gray-500">提示词内容</div>
                                    <div className="font-medium text-gray-900 truncate" title={record.prompt}>{record.prompt}</div>
                                    <div className="text-xs text-gray-500 mt-1">命中露出词: <span className="text-gray-700 font-medium">{record.targetWord}</span></div>
                                </div>
                                
                                <div className="lg:col-span-6 grid grid-cols-5 gap-2 text-center text-xs">
                                    <div>
                                        <div className="text-gray-400 mb-1">检测次数</div>
                                        <div className="font-bold text-gray-800">{record.testCount}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 mb-1">引用率</div>
                                        <div className="font-bold text-gray-800">{record.quoteRate}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 mb-1">推荐率</div>
                                        <div className="font-bold text-gray-800">{record.recommendRate}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 mb-1">前三率</div>
                                        <div className="font-bold text-gray-800">{record.top3Rate}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 mb-1">置顶率</div>
                                        <div className="font-bold text-gray-800">{record.top1Rate}</div>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 flex flex-col items-end gap-2">
                                    <span className="text-xs text-gray-400">检测时间: {record.time}</span>
                                    <button 
                                        onClick={() => toggleExpand(record.id)}
                                        className="text-red-600 font-bold border border-red-600 px-3 py-1 rounded text-sm hover:bg-red-50 transition-colors flex items-center gap-1"
                                    >
                                        {expandedRow === record.id ? '收起结果' : '查看结果'}
                                        {expandedRow === record.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Detail Table */}
                            {expandedRow === record.id && (
                                <div className="border-t border-gray-200 bg-gray-50 p-4 animate-in slide-in-from-top-2 duration-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-sm text-gray-600">
                                            <span className="mr-4">平台选择: {record.details.map(d => d.platform).join(', ')}</span>
                                            <span>检测时间: {record.time}</span>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 font-medium">
                                            <Download className="w-4 h-4" /> 数据下载
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-x-auto bg-white rounded border border-gray-200">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-100 text-gray-600 font-medium">
                                                <tr>
                                                    <th className="p-3 border-b border-gray-200">平台</th>
                                                    <th className="p-3 border-b border-gray-200 w-1/3">测试提示词</th>
                                                    <th className="p-3 border-b border-gray-200">露出词</th>
                                                    <th className="p-3 border-b border-gray-200 text-center">是否被推荐</th>
                                                    <th className="p-3 border-b border-gray-200 text-center">是否前三</th>
                                                    <th className="p-3 border-b border-gray-200 text-center">是否置顶</th>
                                                    <th className="p-3 border-b border-gray-200 text-center">提及次数</th>
                                                    <th className="p-3 border-b border-gray-200 text-right">测试存档</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {record.details.map((detail, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50">
                                                        <td className="p-3 font-medium text-gray-800">{detail.platform}</td>
                                                        <td className="p-3 text-gray-600 truncate max-w-xs" title={detail.prompt}>{detail.prompt}</td>
                                                        <td className="p-3 text-gray-600">{detail.targetWord}</td>
                                                        <td className="p-3 text-center">
                                                            {detail.isRecommended ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}
                                                        </td>
                                                        <td className="p-3 text-center">
                                                            {detail.isTop3 ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}
                                                        </td>
                                                        <td className="p-3 text-center">
                                                            {detail.isTop1 ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}
                                                        </td>
                                                        <td className="p-3 text-center text-gray-800 font-medium">{detail.mentionCount}</td>
                                                        <td className="p-3 text-right">
                                                            <button className="text-blue-600 hover:underline text-xs flex items-center gap-1 justify-end ml-auto">
                                                                <FileText className="w-3 h-3" />
                                                                3已完成---查看档案
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RealtimeSearch;
