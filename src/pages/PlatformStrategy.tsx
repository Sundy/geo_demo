import React from 'react';
import { CheckCircle } from 'lucide-react';

const PlatformStrategy: React.FC = () => {
    const platforms = [
        {
            name: '豆包',
            logo: 'D',
            color: '#3b82f6',
            focus: '核心信源类型',
            desc: '更注重今日头条、抖音百科等字节系信源。',
            distribution: [
                { label: '新闻媒体', value: '10%' },
                { label: '个人UGC', value: '20%' },
                { label: '字节系', value: '70%' },
            ]
        },
        {
            name: '腾讯元宝',
            logo: 'T',
            color: '#0ea5e9',
            focus: '核心信源类型',
            desc: '更注重微信生态信源，公众号、视频号等。',
            distribution: [
                { label: '权威媒体', value: '20%' },
                { label: '全网消息', value: '30%' },
                { label: '微信生态', value: '50%' },
            ]
        },
        {
            name: 'DeepSeek',
            logo: 'S',
            color: '#8b5cf6',
            focus: '核心信源类型',
            desc: '注重学术、商业文档及开源数据。',
            distribution: [
                { label: '学术/商业', value: '20%' },
                { label: 'UGC', value: '30%' },
                { label: '开源数据', value: '40%' },
            ]
        },
        {
            name: '通义千问',
            logo: 'Q',
            color: '#624aff',
            focus: '核心信源类型',
            desc: '阿里生态深度整合，注重电商、办公场景及长文本分析。',
            distribution: [
                { label: '阿里生态', value: '50%' },
                { label: '专业文档', value: '30%' },
                { label: '全网资讯', value: '20%' },
            ]
        },
    ];

    return (
        <div className="page-container fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">平台选择 & 信源策略</h1>
                <p className="text-gray-400">定制化策略，基于洞察结果确定优化平台，根据优化平台制定信源铺设策略。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platforms.map((platform) => (
                    <div key={platform.name} className="glass-card flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg"
                                style={{ backgroundColor: platform.color }}
                            >
                                {platform.logo}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                                <span className="text-xs text-gray-400">{platform.focus}</span>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-6 flex-grow">{platform.desc}</p>

                        <div className="space-y-4 mb-6">
                            {platform.distribution.map((d) => (
                                <div key={d.label} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">{d.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: d.value, backgroundColor: platform.color }}
                                            />
                                        </div>
                                        <span className="text-gray-700 w-8 text-right">{d.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <CheckCircle size={16} />
                            选择策略
                        </button>
                    </div>
                ))}
            </div>

            <div className="glass-card mt-8 p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">平台分布/用户浓度/信源权重</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>不同AI平台信源有一定差异，例如豆包更注重今日头条、抖音百科等字节系信源，元宝更注重微信生态信源。</li>
                    <li>不同行业可能存在信源特征差异，例如互联网软件类更加注重CSDN、知乎、论坛等信源引用，教育类更注重权威行业媒体渠道。</li>
                </ul>
            </div>
        </div>
    );
};

export default PlatformStrategy;
