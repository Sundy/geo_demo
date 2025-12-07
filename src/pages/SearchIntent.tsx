import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const SearchIntent: React.FC = () => {
    const [query, setQuery] = useState('');

    const intents = [
        { type: '信息查询', percentage: 45, color: '#ff4b2b' },
        { type: '产品对比', percentage: 30, color: '#ff416c' },
        { type: '购买决策', percentage: 15, color: '#ff9068' },
        { type: '售后服务', percentage: 10, color: '#ffb199' },
    ];

    const questions = [
        "减脂餐该怎么吃？",
        "2025年最好的无人机品牌有哪些？",
        "如何评价新款智能手表？",
        "家用投影仪性价比推荐"
    ];

    return (
        <div className="page-container fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">定位搜索意图</h1>
                <p className="text-gray-400">从用户搜索角度出发，识别伪需求/刻板搜索场景，契合真实提问习惯。</p>
            </header>

            <div className="glass-card mb-8 flex items-center p-6">
                <input
                    type="text"
                    placeholder="输入核心关键词或问题..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-800 text-lg placeholder-gray-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn-primary flex items-center gap-2">
                    <Search size={20} />
                    搜索
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card col-span-2">
                    <h3 className="text-xl font-semibold mb-6 text-white">搜索意图分布</h3>
                    <div className="space-y-6">
                        {intents.map((item) => (
                            <div key={item.type}>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span>{item.type}</span>
                                    <span>{item.percentage}%</span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card">
                    <h3 className="text-xl font-semibold mb-4 text-white">热门场景问句</h3>
                    <ul className="space-y-4">
                        {questions.map((q, i) => (
                            <li key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                                <span className="text-sm">{q}</span>
                                <ArrowRight size={16} className="text-gray-400" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchIntent;
