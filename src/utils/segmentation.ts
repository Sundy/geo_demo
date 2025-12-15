export interface QuerySegmentation {
    coreIntent: string; // 核心意图词 (e.g. "推荐", "续航", "对比")
    brand: string;      // 品牌词 (e.g. "小鹏", "特斯拉")
    region: string;     // 地域词 (e.g. "上海", "北京")
    suffixes: string[]; // 后缀词 (e.g. "排行榜", "怎么样", "多少钱")
}

export const segmentQuery = (query: string): QuerySegmentation => {
    // Simple mock logic for demo purposes
    // In a real app, this would use NLP or an API
    
    let region = '';
    const regions = ['上海', '北京', '深圳', '广州', '成都', '杭州'];
    for (const r of regions) {
        if (query.includes(r)) {
            region = r;
            break;
        }
    }

    let brand = '';
    const brands = ['小鹏', '特斯拉', '比亚迪', '小米', '极氪', '蔚来', '理想'];
    for (const b of brands) {
        if (query.includes(b)) {
            brand = b;
            break;
        }
    }

    let coreIntent = '未识别';
    const intents = ['推荐', '续航', '对比', '多少钱', '价格', '评价', '好不好', '怎么样', '排行榜', '政策'];
    for (const i of intents) {
        if (query.includes(i)) {
            coreIntent = i;
            break;
        }
    }

    // Suffixes logic: extract anything else relevant or split by space
    const suffixes: string[] = [];
    if (query.includes('排行榜')) suffixes.push('排行榜');
    if (query.includes('怎么样')) suffixes.push('怎么样');
    if (query.includes('值得买')) suffixes.push('值得买');
    if (query.includes('性价比')) suffixes.push('性价比');

    return {
        coreIntent,
        brand,
        region,
        suffixes
    };
};
