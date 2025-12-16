import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AddIntentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (platforms: string[]) => void;
    query: string;
}

const PLATFORMS = ['Deepseek', 'Kimi', '豆包', '文心一言', '千问'];

const AddIntentModal: React.FC<AddIntentModalProps> = ({ isOpen, onClose, onConfirm, query }) => {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

    if (!isOpen) return null;

    const togglePlatform = (p: string) => {
        setSelectedPlatforms(prev => 
            prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
        );
    };

    const handleConfirm = () => {
        onConfirm(selectedPlatforms);
        setSelectedPlatforms([]);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center fade-in">
            <div className="bg-white rounded-xl shadow-xl w-[480px] p-6 animate-in slide-in-from-bottom-4">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800">添加至意图定位</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">核心问题 (Query)</p>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800 font-medium text-sm">
                        {query}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3">选择目标优化平台 (Target Platforms)</p>
                    <div className="flex flex-wrap gap-2">
                        {PLATFORMS.map(p => {
                            const isSelected = selectedPlatforms.includes(p);
                            return (
                                <button
                                    key={p}
                                    onClick={() => togglePlatform(p)}
                                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all flex items-center gap-1.5 ${
                                        isSelected 
                                        ? 'bg-red-50 border-red-200 text-red-600 font-medium' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-red-100'
                                    }`}
                                >
                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                    {p}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                    >
                        取消
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={selectedPlatforms.length === 0}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        确认添加
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddIntentModal;
