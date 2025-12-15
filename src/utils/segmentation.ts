export interface QuerySegmentation {
    keywords: string;   // 核心意图词 (e.g. "20万左右性价比电车")
    coreIntent: string; // 核心意图词 (e.g. "推荐", "续航", "对比")
    brand: string;      // 品牌词 (e.g. "小鹏", "特斯拉")
    region: string;     // 地域词 (e.g. "上海", "北京")
    suffixes: string[]; // 后缀词 (e.g. "排行榜", "怎么样", "多少钱")
    longTailExamples: string[]; // 长尾词示例 (e.g. "20万左右性价比电车怎么样", "20万左右性价比电车推荐")
}

export const segmentQuery = (query: string): QuerySegmentation => {
    // Simple mock logic for demo purposes
    // In a real app, this would use NLP or an API
    
    // Mock specific keyword extraction for the demo case
    let keywords = query;
    if (query.includes('2025年20万左右性价比最高的电车推荐')) {
        keywords = '20万左右性价比电车';
    } else if (query.includes('小鹏G6真实续航打几折')) {
        keywords = '小鹏G6真实续航';
    } else {
        // Fallback: simple heuristic
        // Remove known stop words or dates if possible, but for now just keep it simple
        keywords = query.replace('2025年', '').replace('推荐', '').replace('怎么样', '').replace('排行榜', '').replace('？', '').replace('?', '').trim();
        // If empty after strip, use original
        if (!keywords) keywords = query;
    }

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

    // Generate Long-tail Examples
    const longTailExamples: string[] = [];
    const possibleSuffixes = ['怎么样', '哪家好', '值得买吗', '排行榜', '优缺点', '评价'];
    // Pick 3 random suffixes
    const shuffled = possibleSuffixes.sort(() => 0.5 - Math.random());
    longTailExamples.push(`${keywords}怎么样`);
    longTailExamples.push(`${keywords}哪家好`);
    longTailExamples.push(`${keywords}评价`);

    return {
        keywords,
        coreIntent,
        brand,
        region,
        suffixes,
        longTailExamples
    };
};
