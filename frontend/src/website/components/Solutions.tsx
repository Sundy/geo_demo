import React from 'react';
import { Activity, Target, PenTool, BarChart2, ShoppingCart, Database } from 'lucide-react';

const Solutions: React.FC = () => {
    const steps = [
        {
            icon: <Activity className="w-8 h-8 text-red-600" />,
            title: "1. 问题与诊断",
            desc: "全方位诊断品牌在 AI 搜索中的现状，核查 GEO 优化潜在问题。"
        },
        {
            icon: <Target className="w-8 h-8 text-orange-500" />,
            title: "2. 意图定位",
            desc: "精准锁定品牌核心意图 (Intent Positioning)，确保 AI 精准理解品牌。"
        },
        {
            icon: <PenTool className="w-8 h-8 text-yellow-500" />,
            title: "3. 内容生成",
            desc: "2025年覆盖20万条 AI 场景问句，1800+ 核心细分领域关键词覆盖。"
        },
        {
            icon: <BarChart2 className="w-8 h-8 text-green-500" />,
            title: "4. 数据监测",
            desc: "实时监测品牌在 AI 平台的表现，动态优化策略，确保效果持续提升。"
        },
        {
            icon: <ShoppingCart className="w-8 h-8 text-blue-500" />,
            title: "5. 电商转化",
            desc: "实时追踪 AI 推荐带来的电商转化，量化 ROI，持续优化投放策略。"
        },
        {
            icon: <Database className="w-8 h-8 text-purple-500" />,
            title: "6. 向量知识库",
            desc: "构建品牌专属知识库，提升 AI 理解准确度，掌握品牌解释权。"
        }
    ];

    return (
        <section id="solutions" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">全链路 GEO 营销解决方案</h2>
                    <p className="text-xl text-gray-600">从诊断到转化，六大节点环环相扣</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
