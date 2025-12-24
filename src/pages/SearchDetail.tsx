import React, { useState } from 'react';
import { 
    Search, MapPin, Target, Globe, ArrowLeft, CheckCircle, XCircle, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchDetail: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'industry' | 'brand' | 'competitor' | 'region'>('industry');

    // Mock Data for Table
    const tableData = [
        {
            id: 1,
            query: '20-30万性价比最高的纯电SUV推荐',
            scene: '决策中 (对比竞品)',
            sceneColor: 'bg-purple-100 text-purple-600',
            focus: '性价比',
            heat: 'Very High',
            heatColor: 'bg-red-100 text-red-600',
            isCovered: true,
            rank: 2,
            topBrand: '特斯拉 (Model Y)',
            summary: '列举了Model Y, 小鹏G6, 极氪001, 重点对比了智驾和空间'
        },
        {
            id: 2,
            query: '2025年最值得买的新能源轿车排行榜',
            scene: '决策前 (了解产品)',
            sceneColor: 'bg-blue-100 text-blue-600',
            focus: '综合排名',
            heat: 'High',
            heatColor: 'bg-orange-100 text-orange-600',
            isCovered: true,
            rank: 4,
            topBrand: '比亚迪 (汉)',
            summary: '主要推荐了比亚迪汉, 小米SU7, 极氪007, 小鹏P7i'
        },
        {
            id: 3,
            query: '适合家用的智能驾驶汽车有哪些？',
            scene: '决策前 (了解产品)',
            sceneColor: 'bg-blue-100 text-blue-600',
            focus: '智能驾驶',
            heat: 'High',
            heatColor: 'bg-orange-100 text-orange-600',
            isCovered: true,
            rank: 1,
            topBrand: '小鹏 (G6/G9)',
            summary: '重点推荐了小鹏XNGP, 华为系智驾, 特斯拉FSD'
        },
        {
            id: 4,
            query: '续航最扎实的电动车排名',
            scene: '决策中 (产品评估)',
            sceneColor: 'bg-orange-100 text-orange-600',
            focus: '续航里程',
            heat: 'Med',
            heatColor: 'bg-yellow-100 text-yellow-600',
            isCovered: false,
            rank: '-',
            topBrand: '极氪 (001)',
            summary: '未提及我方品牌, 主要提及极氪001, 蔚来ET7'
        },
        {
            id: 5,
            query: '800V高压快充车型盘点',
            scene: '决策中 (产品评估)',
            sceneColor: 'bg-orange-100 text-orange-600',
            focus: '充电速度',
            heat: 'Med',
            heatColor: 'bg-yellow-100 text-yellow-600',
            isCovered: true,
            rank: 3,
            topBrand: '小鹏 (G9)',
            summary: '列举了G9, 理想MEGA, 智界S7, 强调了充电速度对比'
        }
    ];

    const tabs = [
        { id: 'industry', label: '看行业 (Industry)', icon: Globe },
        { id: 'brand', label: '看品牌 (Brand)', icon: Target },
        { id: 'competitor', label: '看竞品 (Competitor)', icon: Search },
        { id: 'region', label: '看地域 (Region)', icon: MapPin },
    ];

    return (
        <div className="page-container fade-in p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                    <h1 className="text-2xl font-bold text-gray-800">品牌搜索问题及权重 (Brand Search Questions & Weights)</h1>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 bg-white p-1 rounded-xl w-fit border border-gray-100 shadow-sm">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                isActive 
                                ? 'bg-red-50 text-red-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-gray-400'}`} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    行业通用问题 (Industry Query)
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    问题场景
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    核心关注点
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    搜索热度
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    是否漏出
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    我方排名
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    首位推荐品牌
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[300px]">
                                    回答上下文简述
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tableData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-full bg-gray-100 text-gray-400">
                                                <Info className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{row.query}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${row.sceneColor}`}>
                                            {row.scene}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-700">{row.focus}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${row.heatColor}`}>
                                            {row.heat}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {row.isCovered ? (
                                            <div className="flex items-center gap-1.5 text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">已漏出</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-400">
                                                <XCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">未漏出</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-bold ${row.rank === 1 ? 'text-red-600 text-lg' : 'text-gray-900'}`}>
                                            {row.rank}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{row.topBrand}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-gray-500 line-clamp-2" title={row.summary}>
                                            {row.summary}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination (Mock) */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                        显示 1 到 5 条，共 24 条结果
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                            上一页
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded bg-white text-xs text-gray-600 hover:bg-gray-50">
                            下一页
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDetail;