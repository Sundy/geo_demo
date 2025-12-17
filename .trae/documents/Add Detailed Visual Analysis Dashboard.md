# Implementation Plan: Add Detailed Charts to Insight & Diagnosis

I will enhance the "Insight & Diagnosis" page by adding a comprehensive visual dashboard before the detailed analysis sections. This dashboard will include the four requested key metrics using `recharts`.

## 1. Create New Component: `src/components/InsightCharts.tsx`

This component will encapsulate the new visualizations.

### Features & Charts:
1.  **AI Mention Rate Analysis (AI提及率分析)**:
    -   **Visual**: Line Chart (`LineChart`).
    -   **Data**: 7-day or 30-day trend comparing "Selected Brand" vs "Industry Average".
    -   **Goal**: Show the trend of brand visibility in AI responses over time.

2.  **Brand Mention Rate Ranking (品牌提及率排名)**:
    -   **Visual**: Bar Chart (`BarChart`).
    -   **Data**: Top competing brands and their mention rates.
    -   **Goal**: Benchmark the current brand against competitors.

3.  **Brand Sentiment Analysis (品牌情绪分析)**:
    -   **Visual**: Donut/Pie Chart (`PieChart`).
    -   **Data**: Distribution of Positive, Neutral, and Negative sentiments.
    -   **Goal**: Quick view of brand reputation health.

4.  **Keyword Analysis (关键词呈现)**:
    -   **Visual**: Two distinct panels for "Positive Keywords" (正面关键词) and "Negative Keywords" (负面关键词).
    -   **Style**: Tag cloud style using styled pills/badges, with varying importance highlighted.

### Layout Structure:
-   **Row 1**: Mention Rate Trend (Full Width)
-   **Row 2**: Mention Ranking (Left) + Sentiment Analysis (Right)
-   **Row 3**: Positive vs Negative Keywords (Side-by-side)

## 2. Integrate into `src/pages/InsightDiagnosis.tsx`

I will update the main page to include this new component.

### Changes:
-   Import `InsightCharts`.
-   Insert the `<InsightCharts />` component immediately after the existing "Global Core Metrics" (the 5 top cards) and before the "InsightIndustry" section.
-   Pass necessary props (like `selectedBrand`) to the chart component to ensure context awareness (even if using mock data for now).

## 3. Verification
-   Verify that all charts render correctly with `recharts`.
-   Ensure the layout is responsive (using `ResponsiveContainer`).
-   Check that the visual style matches the existing "Red/White/Gray" theme of the application.
