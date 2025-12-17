import React, { useState } from 'react';
import ParticleBackground from './ParticleBackground';
import { ArrowRight, Globe, Search, Bot, X, Check } from 'lucide-react';

const Hero: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormStatus('idle');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
        }, 1500);
    };

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
            <ParticleBackground />
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full text-red-600 font-medium mb-8 fade-in-up">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    AI搜索正在重塑流量入口
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight fade-in-up delay-100">
                    让品牌被 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">AI</span> 看见
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto fade-in-up delay-200">
                    Aceflow 助力品牌抢占 GEO (Generative Engine Optimization) 营销新高地，
                    在 ChatGPT、Perplexity、豆包等 AI 平台中脱颖而出。
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 fade-in-up delay-300">
                    <button 
                        onClick={handleOpenModal}
                        className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all hover:shadow-xl hover:shadow-red-200 flex items-center gap-2 group"
                    >
                        免费诊断品牌 AI 表现
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={handleOpenModal}
                        className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:border-gray-300 flex items-center gap-2"
                    >
                        <Globe className="w-5 h-5 text-gray-500" />
                        了解出海方案
                    </button>
                </div>

                <div className="mt-16 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 fade-in-up delay-500">
                     {/* Mock Logos */}
                     <div className="flex items-center gap-2 font-bold text-xl text-gray-400"><Bot /> ChatGPT</div>
                     <div className="flex items-center gap-2 font-bold text-xl text-gray-400"><Search /> Perplexity</div>
                     <div className="flex items-center gap-2 font-bold text-xl text-gray-400"><Bot /> Claude</div>
                     <div className="flex items-center gap-2 font-bold text-xl text-gray-400"><Search /> Gemini</div>
                </div>
            </div>

            {/* Contact Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden scale-in">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">
                                {formStatus === 'success' ? '提交成功' : '立即预约专家诊断'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {formStatus === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">预约成功！</h4>
                                    <p className="text-gray-600">
                                        我们的 GEO 专家将在 24 小时内与您联系，<br/>
                                        为您提供定制化的品牌 AI 表现诊断报告。
                                    </p>
                                    <button 
                                        onClick={handleCloseModal}
                                        className="mt-8 bg-gray-100 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        关闭
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">联系人姓名</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all"
                                            placeholder="请输入您的姓名"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">企业/品牌名称</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all"
                                            placeholder="请输入企业或品牌名称"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                                        <input 
                                            required
                                            type="tel" 
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all"
                                            placeholder="请输入手机号码"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">咨询需求</label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all bg-white">
                                            <option>免费品牌诊断</option>
                                            <option>GEO 出海方案咨询</option>
                                            <option>国内 GEO 营销合作</option>
                                            <option>其他</option>
                                        </select>
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={formStatus === 'submitting'}
                                        className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                    >
                                        {formStatus === 'submitting' ? '提交中...' : '立即提交'}
                                    </button>
                                    
                                    <p className="text-xs text-gray-400 text-center mt-4">
                                        提交即代表同意 Aceflow 隐私政策，我们会严格保护您的信息安全。
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;
