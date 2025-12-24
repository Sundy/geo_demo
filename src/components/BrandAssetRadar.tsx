import React, { useState } from 'react';
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip 
} from 'recharts';
import { Hexagon } from 'lucide-react';

interface BrandAssetRadarProps {
    brandName?: string;
}

const BrandAssetRadar: React.FC<BrandAssetRadarProps> = ({ brandName = '小鹏' }) => {
    // Competitor Selection State
    const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(['特斯拉']);

    // Competitor Config
    const competitorsConfig = [
        { name: '特斯拉', color: '#525252' },
        { name: '理想', color: '#f59e0b' },
        { name: '蔚来', color: '#3b82f6' },
        { name: '小米', color: '#ff6900' },
        { name: '极氪', color: '#8b5cf6' },
    ];

    // Mock Data for Radar Chart
    const radarData = [
        { subject: 'AI搜索热度', brand: 85, 特斯拉: 92, 理想: 88, 蔚来: 82, 小米: 95, 极氪: 78, fullMark: 100 },
        { subject: 'AI搜索引擎流量监测', brand: 78, 特斯拉: 90, 理想: 85, 蔚来: 75, 小米: 92, 极氪: 70, fullMark: 100 },
        { subject: '品牌AI情感度监测', brand: 92, 特斯拉: 85, 理想: 88, 蔚来: 90, 小米: 82, 极氪: 85, fullMark: 100 },
        { subject: '品牌AI知名度监测', brand: 80, 特斯拉: 98, 理想: 85, 蔚来: 88, 小米: 95, 极氪: 75, fullMark: 100 },
        { subject: '引用来源监测', brand: 85, 特斯拉: 88, 理想: 82, 蔚来: 85, 小米: 80, 极氪: 78, fullMark: 100 },
    ];

    const toggleCompetitor = (compName: string) => {
        if (selectedCompetitors.includes(compName)) {
            setSelectedCompetitors(selectedCompetitors.filter(c => c !== compName));
        } else {
            if (selectedCompetitors.length < 3) {
                setSelectedCompetitors([...selectedCompetitors, compName]);
            } else {
                // Optional: Show max limit warning or replace last one
                // For now, just simple replace logic or limit
                // Let's limit to 3 for clarity
            }
        }
    };

    const getCompetitorColor = (name: string) => {
        return competitorsConfig.find(c => c.name === name)?.color || '#9ca3af';
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Hexagon className="w-5 h-5 text-indigo-600" />
                        品牌AI资产 (AI Brand Assets)
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 ml-7">
                        对比维度：{brandName} vs 竞品 ({selectedCompetitors.length})
                    </p>
                </div>

                {/* Competitor Selector */}
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                    <span className="text-xs font-medium text-gray-500 px-2 shrink-0">对比竞品:</span>
                    <div className="flex gap-2 flex-wrap">
                        {competitorsConfig.map(comp => (
                            <button
                                key={comp.name}
                                onClick={() => toggleCompetitor(comp.name)}
                                className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                                    selectedCompetitors.includes(comp.name) 
                                    ? 'bg-white shadow-sm border border-gray-200 text-gray-800' 
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                }`}
                                style={selectedCompetitors.includes(comp.name) ? { borderColor: comp.color } : {}}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${selectedCompetitors.includes(comp.name) ? '' : 'bg-gray-300'}`} 
                                      style={selectedCompetitors.includes(comp.name) ? { backgroundColor: comp.color } : {}} 
                                />
                                {comp.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-[350px] w-full flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        
                        {/* Main Brand Radar */}
                        <Radar
                            name={brandName}
                            dataKey="brand"
                            stroke="#dc2626"
                            strokeWidth={3}
                            fill="#dc2626"
                            fillOpacity={0.2}
                        />

                        {/* Competitor Radars */}
                        {selectedCompetitors.map(compName => (
                            <Radar
                                key={compName}
                                name={compName}
                                dataKey={compName}
                                stroke={getCompetitorColor(compName)}
                                strokeWidth={2}
                                fill={getCompetitorColor(compName)}
                                fillOpacity={0.1}
                            />
                        ))}

                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BrandAssetRadar;