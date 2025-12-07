import React from 'react';
import { FileText, Zap, PenTool } from 'lucide-react';

const ContentStrategy: React.FC = () => {
    const [isGenerating, setIsGenerating] = React.useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            alert('Brief 生成成功！');
        }, 2000);
    };

    return (
        <div className="page-container fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">内容策略及创作</h1>
                <p className="text-gray-400">依托多维度数据洞察 + AI 模型分析能力，深度拆解热门信源的内容逻辑、思路结构与传播规律。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
                        <Zap size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">定位优质信源</h3>
                    <p className="text-sm text-gray-400">分析TOP20信源文章，提取高频关键词与结构。</p>
                </div>

                <div className="glass-card p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 text-orange-500">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">拆解创作思路</h3>
                    <p className="text-sm text-gray-400">基于金字塔结构层级重要性拆解核心信息。</p>
                </div>

                <div className="glass-card p-6 flex flex-col items-center text-center hover:bg-gray-50 cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4 text-pink-500">
                        <PenTool size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">专业创作者原创</h3>
                    <p className="text-sm text-gray-400">生成科学创作Brief，为内容生产提供精准指引。</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card">
                    <h3 className="text-xl font-semibold mb-6 text-white">内容要素金字塔分析</h3>
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-64 h-16 bg-red-100 mb-1 flex items-center justify-center text-red-600 font-bold rounded-t-lg">代言人理念设置</div>
                        <div className="w-56 h-16 bg-red-200 mb-1 flex items-center justify-center text-red-700 font-bold">粉丝利益点</div>
                        <div className="w-48 h-16 bg-red-300 mb-1 flex items-center justify-center text-white font-bold">品牌文化观念</div>
                        <div className="w-40 h-16 bg-red-400 flex items-center justify-center text-white font-bold rounded-b-lg">产品功能诉求</div>
                    </div>
                    <p className="mt-6 text-sm text-gray-400 leading-relaxed">
                        数据解读：内容采用倒金字塔结构，高频次强调代言人基金(12次提及)与粉丝福利(8次提及)，通过「即官宣」「亲签」「即开即中」等关键词营造紧迫感。
                    </p>
                </div>

                <div className="glass-card">
                    <h3 className="text-xl font-semibold mb-6 text-white">云智推声量通推广内容Brief</h3>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-red-500 font-bold"># 云智推</span>
                            <span className="px-3 py-1 bg-red-100 text-red-500 text-xs rounded-full">3.4 比例</span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-4">通过云智推声量通实现品牌声量增长</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-sm text-gray-600">核心痛点介绍</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-sm text-gray-600">用户画像分析</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-sm text-gray-600">平台优势对比</span>
                            </div>
                        </div>
                        <button
                            className="w-full mt-8 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? '正在生成...' : '生成完整Brief'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentStrategy;
