import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle, Shield, Award, Building } from 'lucide-react';

const QualificationsHonors: React.FC = () => {
    const [businessLicense, setBusinessLicense] = useState<File | null>(null);
    const [industryQuals, setIndustryQuals] = useState<File[]>([]);
    const [honorCerts, setHonorCerts] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'license' | 'qual' | 'honor') => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            if (type === 'license') {
                setBusinessLicense(files[0]);
            } else if (type === 'qual') {
                setIndustryQuals(prev => [...prev, ...files]);
            } else if (type === 'honor') {
                setHonorCerts(prev => [...prev, ...files]);
            }
        }
    };

    const removeFile = (index: number, type: 'qual' | 'honor') => {
        if (type === 'qual') {
            setIndustryQuals(prev => prev.filter((_, i) => i !== index));
        } else {
            setHonorCerts(prev => prev.filter((_, i) => i !== index));
        }
    };

    const removeLicense = () => {
        setBusinessLicense(null);
    };

    return (
        <div className="page-container fade-in p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">资质及荣誉 (Qualifications & Honors)</h1>
                <p className="text-gray-500">上传企业资质证书及荣誉证明，提升品牌权威性。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business License Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Building className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">企业营业执照</h3>
                            <p className="text-sm text-gray-500">上传最新的营业执照副本扫描件</p>
                        </div>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors relative min-h-[200px] flex flex-col items-center justify-center">
                        {businessLicense ? (
                            <div className="relative w-full">
                                <div className="flex flex-col items-center">
                                    <FileText className="w-12 h-12 text-blue-500 mb-2" />
                                    <span className="text-sm font-medium text-gray-700 truncate max-w-full px-4">{businessLicense.name}</span>
                                    <span className="text-xs text-gray-400 mt-1">{(businessLicense.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                                <button 
                                    onClick={removeLicense}
                                    className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <input 
                                    type="file" 
                                    accept="image/*,.pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => handleFileChange(e, 'license')}
                                />
                                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                <p className="text-sm font-medium text-gray-600">点击或拖拽上传</p>
                                <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG, PDF 格式</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Industry Qualifications Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">行业资质证书</h3>
                            <p className="text-sm text-gray-500">ISO认证、行业许可证等</p>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative h-[100px] flex items-center justify-center mb-4">
                        <input 
                            type="file" 
                            multiple
                            accept="image/*,.pdf"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => handleFileChange(e, 'qual')}
                        />
                        <div className="flex items-center gap-2 text-gray-500">
                            <Upload className="w-5 h-5" />
                            <span className="text-sm">点击上传文件</span>
                        </div>
                    </div>

                    {industryQuals.length > 0 && (
                        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            {industryQuals.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <FileText className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <div className="truncate">
                                            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFile(idx, 'qual')}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Awards & Honors Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Award className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">获奖荣誉证书</h3>
                            <p className="text-sm text-gray-500">高新技术企业、行业奖项等证明材料</p>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative mb-6">
                        <input 
                            type="file" 
                            multiple
                            accept="image/*,.pdf"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => handleFileChange(e, 'honor')}
                        />
                        <div className="flex flex-col items-center justify-center gap-2 py-4">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <p className="text-sm font-medium text-gray-600">点击或拖拽上传荣誉证书</p>
                        </div>
                    </div>

                    {honorCerts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {honorCerts.map((file, idx) => (
                                <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <Award className="w-8 h-8 text-yellow-500 mr-3 flex-shrink-0" />
                                    <div className="flex-1 min-w-0 mr-2">
                                        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                    </div>
                                    <button 
                                        onClick={() => removeFile(idx, 'honor')}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    保存设置
                </button>
            </div>
        </div>
    );
};

export default QualificationsHonors;
