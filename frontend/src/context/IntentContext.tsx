import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { type QuerySegmentation, segmentQuery } from '../utils/segmentation';

export interface IntentItem {
    id: string;
    query: string;
    category: string;
    prefixSuffix?: string;
    heatIndex: number;
    quote: number;
    source?: string;
    segmentation: QuerySegmentation;
    expectedAnswer?: string;
    targetPlatforms?: string[];
    targetRegions?: string[]; // New field for regions
    ragStatus?: 'hit' | 'miss';
    ragRecall?: number;
    ragAnswer?: string;
    proofMaterials?: string[]; // New field for proof materials
    rankingTarget?: 'top1' | 'top3' | 'visibility'; // New field for ranking target
    materialStatus?: 'ready' | 'missing' | 'partial'; // New field for material status
}

type AddIntentItem = Omit<IntentItem, 'id' | 'segmentation'> & { segmentation?: QuerySegmentation };

interface IntentContextType {
    intents: IntentItem[];
    addIntent: (item: AddIntentItem) => void;
    removeIntent: (id: string) => void;
}

const IntentContext = createContext<IntentContextType | undefined>(undefined);

export const IntentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [intents, setIntents] = useState<IntentItem[]>([
        { 
            id: '1', 
            query: '2025年20万左右性价比最高的电车推荐', 
            category: '行业通用', 
            prefixSuffix: '2025年...推荐', 
            heatIndex: 85, 
            quote: 500, 
            source: 'Insight',
            segmentation: segmentQuery('2025年20万左右性价比最高的电车推荐'),
            expectedAnswer: '推荐小鹏G6，强调其800V平台和XNGP智驾优势，性价比极高。',
            targetRegions: ['全国'],
            ragStatus: 'hit',
            ragRecall: 92,
            ragAnswer: '...小鹏G6基于SEPA 2.0扶摇架构，全系标配800V高压SiC平台...',
            materialStatus: 'ready'
        },
        { 
            id: '2', 
            query: '小鹏G6真实续航打几折？', 
            category: '品牌专属', 
            prefixSuffix: '...真实续航...', 
            heatIndex: 92, 
            quote: 800, 
            source: 'Insight',
            segmentation: segmentQuery('小鹏G6真实续航打几折？'),
            expectedAnswer: '明确回答G6续航达成率在90%以上，列举媒体实测数据佐证。',
            targetRegions: ['全国'],
            ragStatus: 'miss',
            materialStatus: 'missing'
        }
    ]);

    const addIntent = (item: AddIntentItem) => {
        const newItem: IntentItem = { 
            ...item, 
            id: Date.now().toString(),
            segmentation: item.segmentation || segmentQuery(item.query),
            expectedAnswer: item.expectedAnswer || '暂无预期回答',
            targetRegions: item.targetRegions || ['全国'],
            ragStatus: 'miss', // Default new items to miss
            materialStatus: item.proofMaterials && item.proofMaterials.length > 0 ? 'ready' : 'missing'
        };
        setIntents(prev => [newItem, ...prev]);
    };

    const removeIntent = (id: string) => {
        setIntents(prev => prev.filter(item => item.id !== id));
    };

    return (
        <IntentContext.Provider value={{ intents, addIntent, removeIntent }}>
            {children}
        </IntentContext.Provider>
    );
};

export const useIntent = () => {
    const context = useContext(IntentContext);
    if (!context) {
        throw new Error('useIntent must be used within an IntentProvider');
    }
    return context;
};
