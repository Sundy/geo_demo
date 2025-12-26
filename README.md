# AceFlow GEO

AceFlow GEO 是一个 B2B SaaS 应用，专注于搜索引擎优化 (SEO) 和品牌数据分析。

## 项目结构

```
geo_demo/
├── frontend/          # 前端应用 (React + TypeScript + Vite)
├── backend/           # 后端服务 (Python + FastAPI + TortoiseORM)
└── README.md
```

## 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts

### 后端
- Python 3.10+
- FastAPI
- TortoiseORM
- SQLite

## 快速开始

### 前端

```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:5173 运行

### 后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量文件
cp .env.example .env

# 启动服务
uvicorn app.main:app --reload
```

后端将在 http://localhost:8000 运行

## API 文档

启动后端后，访问以下地址查看 API 文档：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
