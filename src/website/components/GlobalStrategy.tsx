import React from 'react';
import { Globe, Languages, Server, MessageCircle } from 'lucide-react';

const GlobalStrategy: React.FC = () => {
    return (
        <section id="global" className="py-24 bg-gray-900 text-white overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                            <Globe className="w-4 h-4 text-blue-400" />
                            Global Expansion
                        </div>
                        <h2 className="text-4xl font-bold mb-6 leading-tight">
                            GEO 出海：<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">抢占全球 AI 流量入口</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            海外市场 AI 搜索渗透率持续攀升，北美使用率达 65%，欧洲达 48%。
                            ChatGPT、Perplexity、Claude 等平台已成为主流信息获取渠道。
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <Languages className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">多语言内容矩阵</h4>
                                    <p className="text-gray-400">覆盖英语、西班牙语、法语、德语等20+语言，母语级内容质量，避免翻译腔。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <Server className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">全平台覆盖</h4>
                                    <p className="text-gray-400">ChatGPT, Perplexity, Claude, Gemini, Meta AI 五大平台无缝覆盖。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">本地化场景渗透</h4>
                                    <p className="text-gray-400">结合当地节日、热点事件布局内容，深入理解目标市场用户搜索习惯。</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                <div className="text-4xl font-bold text-blue-400 mb-2">65%</div>
                                <div className="text-sm text-gray-400">北美 AI 搜索使用率</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                <div className="text-4xl font-bold text-purple-400 mb-2">20+</div>
                                <div className="text-sm text-gray-400">覆盖全球语言</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                <div className="text-4xl font-bold text-green-400 mb-2">7x24</div>
                                <div className="text-sm text-gray-400">全球时区无缝服务</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                <div className="text-4xl font-bold text-yellow-400 mb-2">30天</div>
                                <div className="text-sm text-gray-400">快速见效周期</div>
                            </div>
                        </div>
                        
                        {/* Map Decoration (Abstract) */}
                        <div className="mt-8 h-48 rounded-2xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/5 flex items-center justify-center">
                            <span className="text-white/20 text-6xl font-bold tracking-widest">WORLDWIDE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalStrategy;
