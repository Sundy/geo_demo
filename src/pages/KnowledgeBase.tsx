import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, Trash2, Database, Eye } from 'lucide-react';

interface KnowledgeDoc {
    id: string;
    name: string;
    uploadDate: string;
    qaCount: number;
    status: 'Processing' | 'Completed' | 'Failed';
    size: string;
}

const KnowledgeBase: React.FC = () => {
    // Mock Data
    const [documents, setDocuments] = useState<KnowledgeDoc[]>([
        {
            id: '1',
            name: '小鹏G6产品手册_2025版.pdf',
            uploadDate: '2024-12-10 10:30',
            qaCount: 156,
            status: 'Completed',
            size: '4.2 MB'
        },
        {
            id: '2',
            name: '新能源汽车补贴政策Q&A.docx',
            uploadDate: '2024-12-12 14:20',
            qaCount: 45,
            status: 'Completed',
            size: '1.5 MB'
        },
        {
            id: '3',
            name: '竞品对比话术库_v3.xlsx',
            uploadDate: '2024-12-14 09:15',
            qaCount: 0,
            status: 'Processing',
            size: '0.8 MB'
        }
    ]);

    const handleDelete = (id: string) => {
        if (confirm('确认删除该知识库文档吗？')) {
            setDocuments(prev => prev.filter(doc => doc.id !== id));
        }
    };

    const handleUpload = () => {
        alert('上传功能演示：请选择文件上传');
        // Mock adding a new file
        const newDoc: KnowledgeDoc = {
            id: Date.now().toString(),
            name: '新上传的知识库文档_Demo.pdf',
            uploadDate: new Date().toLocaleString(),
            qaCount: 0,
            status: 'Processing',
            size: '2.0 MB'
        };
        setDocuments([newDoc, ...documents]);
    };

    return (
        <div className="page-container fade-in p-6">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">知识库管理 (Knowledge Base)</h1>
                    <p className="text-gray-500">上传企业内部QA文档，构建品牌专属RAG知识库，提升AI回答准确率。</p>
                </div>
                <button 
                    onClick={handleUpload}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200"
                >
                    <Upload className="w-5 h-5" />
                    上传知识库文档
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <Database className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">文档总数</p>
                        <h3 className="text-2xl font-bold text-gray-800">{documents.length}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">已生效QA对</p>
                        <h3 className="text-2xl font-bold text-gray-800">
                            {documents.reduce((acc, doc) => acc + doc.qaCount, 0)}
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                        <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">最近更新</p>
                        <h3 className="text-lg font-bold text-gray-800">2024-12-14</h3>
                    </div>
                </div>
            </div>

            {/* Document List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">文档列表 (Documents)</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="py-4 px-6">文档名称</th>
                                <th className="py-4 px-6">文件大小</th>
                                <th className="py-4 px-6">上传时间</th>
                                <th className="py-4 px-6">解析QA数量</th>
                                <th className="py-4 px-6">状态</th>
                                <th className="py-4 px-6 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 rounded text-gray-500">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-gray-800">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">{doc.size}</td>
                                    <td className="py-4 px-6">{doc.uploadDate}</td>
                                    <td className="py-4 px-6 font-semibold">{doc.qaCount}</td>
                                    <td className="py-4 px-6">
                                        {doc.status === 'Completed' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                已完成
                                            </span>
                                        )}
                                        {doc.status === 'Processing' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                                解析中
                                            </span>
                                        )}
                                        {doc.status === 'Failed' && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                解析失败
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors" title="查看详情">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(doc.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" 
                                                title="删除"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeBase;
