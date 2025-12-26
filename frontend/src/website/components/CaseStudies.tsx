import React from 'react';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';

const CaseStudies: React.FC = () => {
    return (
        <section id="cases" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">标杆案例 (Success Stories)</h2>
                    <p className="text-xl text-gray-600">见证 GEO 带来的真实增长</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Case 1: Education */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
                        <div className="h-2 bg-blue-500"></div>
                        <div className="p-8 flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">少儿编程教育品牌</h3>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">教育行业</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <span className="font-bold">挑战：</span>传统获客成本高，AI平台搜索"少儿编程推荐"未进入前列。<br/>
                                <span className="font-bold">策略：</span>挖掘80+核心意图词，搭建场景向量数据库，适配豆包/DeepSeek内容偏好。
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">95%</div>
                                    <div className="text-xs text-gray-500">核心词推荐率</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">TOP 1</div>
                                    <div className="text-xs text-gray-500">占比 72%</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">¥280→¥65</div>
                                    <div className="text-xs text-gray-500">获客成本降低</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">4x</div>
                                    <div className="text-xs text-gray-500">月均订单提升</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case 2: FMCG */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
                        <div className="h-2 bg-pink-500"></div>
                        <div className="p-8 flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">区域性酸奶品牌</h3>
                                <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-bold">快消品</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <span className="font-bold">挑战：</span>全国知名度低，AI搜索"好喝的酸奶"几乎无提及。<br/>
                                <span className="font-bold">策略：</span>构建产品口感/营养知识库，针对"好喝"、"健康"等意图进行场景化种草。
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">0%→68%</div>
                                    <div className="text-xs text-gray-500">AI 推荐率提升</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">Top 3</div>
                                    <div className="text-xs text-gray-500">核心词排名</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">+150%</div>
                                    <div className="text-xs text-gray-500">电商搜索量</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">+85%</div>
                                    <div className="text-xs text-gray-500">新客转化率</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case 3: Beauty (New) */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
                        <div className="h-2 bg-purple-500"></div>
                        <div className="p-8 flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">国货美妆品牌</h3>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">美妆护肤</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <span className="font-bold">挑战：</span>新品上市声量不足，"敏感肌水乳"等大词竞争激烈，AI推荐倾向国际大牌。<br/>
                                <span className="font-bold">策略：</span>主攻"成分党"细分意图，生成大量成分科普与测评内容，强调性价比与修护功效。
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">Top 2</div>
                                    <div className="text-xs text-gray-500">"敏感肌"推荐排名</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-600">1200+</div>
                                    <div className="text-xs text-gray-500">AI 优质引用内容</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">300%</div>
                                    <div className="text-xs text-gray-500">新品搜索增长</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">1:5</div>
                                    <div className="text-xs text-gray-500">投放 ROI</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case 4: Tech (New) */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
                        <div className="h-2 bg-orange-500"></div>
                        <div className="p-8 flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">智能家居品牌</h3>
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">3C数码</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                <span className="font-bold">挑战：</span>产品功能复杂，用户在AI询问"扫地机器人怎么选"时，品牌因缺乏结构化信息被忽略。<br/>
                                <span className="font-bold">策略：</span>建立详细的技术参数知识库，针对"避障能力"、"吸力对比"等长尾问题进行精准回答优化。
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
                                <div>
                                    <div className="text-2xl font-bold text-orange-600">80%</div>
                                    <div className="text-xs text-gray-500">长尾词覆盖率</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-orange-600">4.8/5</div>
                                    <div className="text-xs text-gray-500">AI 评价得分</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">Top 1</div>
                                    <div className="text-xs text-gray-500">"性价比"推荐首位</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">+45%</div>
                                    <div className="text-xs text-gray-500">官网直达流量</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
