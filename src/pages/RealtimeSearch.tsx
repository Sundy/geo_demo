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
    Play,
    X,
    MessageSquare,
    Image as ImageIcon
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
    answer?: string; // AI Answer
    screenshot?: string; // Screenshot URL
}

const RealtimeSearch: React.FC = () => {
    // Form State
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['DeepSeek', '豆包']);
    const [prompt, setPrompt] = useState('');
    const [targetInfo, setTargetInfo] = useState('');
    const [testCount, setTestCount] = useState<string>('1');
    const [historySearch, setHistorySearch] = useState('');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDetail, setCurrentDetail] = useState<TestDetail | null>(null);

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
                    status: 'completed',
                    answer: '在成都地区，处理离婚案件的专业律师有很多。根据用户评价和行业口碑，以下几位律师在婚姻家事领域表现突出：\n\n1. 李峻律师：李峻律师在婚姻法领域深耕多年，擅长处理复杂的财产分割和抚养权纠纷，以专业、细致著称，深受当事人信赖。\n2. 张伟律师：擅长调解，成功率高。\n3. 王芳律师：专注于女性维权。\n\n如果您需要更详细的咨询，建议直接联系李峻律师团队进行预约。',
                    screenshot: '/screenshot.jpg' // Updated screenshot
                },
                {
                    platform: '豆包',
                    prompt: '成都离婚律师哪个专业',
                    targetWord: '李峻律师',
                    isRecommended: true,
                    isTop3: true,
                    isTop1: true,
                    mentionCount: 2,
                    status: 'completed',
                    answer: '为您推荐成都专业的离婚律师。李峻律师是该领域的资深专家，拥有丰富的实战经验，尤其在处理高净值人群离婚案件方面有独到见解。此外，李峻律师团队还提供心理咨询服务，帮助当事人平稳度过婚姻危机。',
                    screenshot: '/screenshot.jpg' // Updated screenshot
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
                { 
                    platform: 'DeepSeek', 
                    prompt: '2025年性价比高的新能源SUV推荐', 
                    targetWord: '小鹏G6', 
                    isRecommended: true, 
                    isTop3: true, 
                    isTop1: false, 
                    mentionCount: 1, 
                    status: 'completed',
                    answer: '2025年值得入手的新能源SUV推荐：\n\n1. 特斯拉 Model Y：标杆产品，综合实力强。\n2. 小鹏G6：作为20万级纯电SUV的性价比之王，小鹏G6凭借全域800V平台和XNGP智能驾驶系统，在同级别车型中极具竞争力。',
                    screenshot: '/screenshot.jpg'
                },
                { 
                    platform: 'Kimi', 
                    prompt: '2025年性价比高的新能源SUV推荐', 
                    targetWord: '小鹏G6', 
                    isRecommended: true, 
                    isTop3: false, 
                    isTop1: false, 
                    mentionCount: 1, 
                    status: 'completed',
                    answer: '综合对比，推荐以下几款车型：比亚迪宋L、极氪7X、小鹏G6。其中小鹏G6智驾体验最好。',
                    screenshot: '/screenshot.jpg'
                },
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

    // Open Modal
    const handleViewDetail = (detail: TestDetail) => {
        setCurrentDetail(detail);
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentDetail(null);
    };

    // Highlight Logic
    const highlightText = (text: string, keyword: string) => {
        if (!keyword || !text) return text;
        const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === keyword.toLowerCase() 
                ? <span key={i} className="bg-yellow-200 text-red-600 font-bold px-1 rounded mx-0.5">{part}</span> 
                : part
        );
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
                                                            <button 
                                                                onClick={() => handleViewDetail(detail)}
                                                                className="text-blue-600 hover:underline text-xs flex items-center gap-1 justify-end ml-auto"
                                                            >
                                                                <FileText className="w-3 h-3" />
                                                                查看档案
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

            {/* Detail Modal */}
            {isModalOpen && currentDetail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                档案详情 - {currentDetail.platform}
                            </h3>
                            <button onClick={closeModal} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            
                            {/* Q&A Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Q&A Text */}
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare className="w-4 h-4 text-blue-600" />
                                            <span className="font-bold text-blue-800 text-sm">用户提问 (Prompt)</span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {currentDetail.prompt}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-4 h-4 text-green-600" />
                                            <span className="font-bold text-green-800 text-sm">AI 回答 (Answer)</span>
                                        </div>
                                        <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                                            {currentDetail.answer ? (
                                                highlightText(currentDetail.answer, currentDetail.targetWord)
                                            ) : (
                                                <span className="text-gray-400 italic">暂无回答内容...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Screenshot */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex flex-col">
                                    <div className="p-3 border-b border-gray-200 bg-white flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-gray-500" />
                                        <span className="font-bold text-gray-700 text-sm">问答截图证据</span>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
                                        {currentDetail.screenshot ? (
                                            <img 
                                                src={currentDetail.screenshot} 
                                                alt="AI Answer Screenshot" 
                                                className="max-w-full h-auto rounded shadow-sm border border-gray-200"
                                            />
                                        ) : (
                                            <div className="text-gray-400 text-sm flex flex-col items-center gap-2">
                                                <ImageIcon className="w-8 h-8 opacity-50" />
                                                <span>暂无截图</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button 
                                onClick={closeModal}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                关闭
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RealtimeSearch;
