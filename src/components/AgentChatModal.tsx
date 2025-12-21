import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2, Mic, Paperclip, FileText, AudioLines } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    time: string;
    type?: 'text' | 'audio' | 'file';
    fileName?: string;
}

interface AgentChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AgentChatModal: React.FC<AgentChatModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '你好！我是您的品牌 GEO 专属顾问。我可以为您解读数据、提供优化建议，或者帮您撰写针对性的内容。请问有什么可以帮您？',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        simulateResponse();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: `已上传文件: ${file.name}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'file',
            fileName: file.name
        };

        setMessages(prev => [...prev, newUserMsg]);
        setIsTyping(true);
        simulateResponse();
        
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleMicClick = () => {
        if (isRecording) {
            // Stop recording logic
            setIsRecording(false);
            const newUserMsg: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: "语音消息 (0:05)",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'audio'
            };
            setMessages(prev => [...prev, newUserMsg]);
            setIsTyping(true);
            simulateResponse();
        } else {
            // Start recording logic
            setIsRecording(true);
        }
    };

    const simulateResponse = () => {
        setTimeout(() => {
            const responses = [
                "根据最新的数据监测，您的品牌在'性价比'相关意图下的提及率提升了 15%。建议继续加强在该领域的 KOC 内容投放。",
                "这是一个很好的问题。DeepSeek 平台对长文本内容的收录偏好较高，建议您可以尝试发布 2-3 篇深度测评文章。",
                "已为您生成了 3 条针对'续航'痛点的优化话术，请在内容创作模块查看。",
                "竞品'理想MEGA'目前的负面舆情主要集中在外观设计上，我们可以借此机会强调我们产品的设计美学。"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: randomResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text'
            };

            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-end pointer-events-none">
            
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

            <div className="w-full sm:w-[400px] h-[80vh] sm:h-[600px] bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl flex flex-col pointer-events-auto m-0 sm:m-6 animate-in slide-in-from-right-10 fade-in duration-300 relative overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">AceFlow AI 顾问</h3>
                            <p className="text-xs text-red-100 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                在线中
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-red-100 text-red-600'}
                            `}>
                                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                            </div>
                            
                            <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'items-end flex flex-col' : ''}`}>
                                <div className={`
                                    p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                    ${msg.role === 'user' 
                                        ? 'bg-red-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }
                                `}>
                                    {msg.type === 'file' && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <FileText className="w-4 h-4" />
                                            <span className="font-bold">文件上传</span>
                                        </div>
                                    )}
                                    {msg.type === 'audio' && (
                                        <div className="flex items-center gap-2">
                                            <AudioLines className="w-4 h-4 animate-pulse" />
                                            <span>{msg.content}</span>
                                        </div>
                                    )}
                                    {(msg.type === 'text' || !msg.type) && msg.content}
                                </div>
                                <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 text-red-600 animate-spin" />
                                <span className="text-xs text-gray-500">正在思考...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                    <div className="relative flex items-center gap-2">
                        {/* File Upload */}
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            title="上传附件"
                        >
                            <Paperclip className="w-5 h-5" />
                        </button>

                        {/* Voice Input */}
                        <button 
                            onClick={handleMicClick}
                            className={`p-2 rounded-full transition-colors ${isRecording ? 'text-red-600 bg-red-50 animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                            title="语音输入"
                        >
                            <Mic className="w-5 h-5" />
                        </button>

                        {/* Text Input */}
                        <div className="flex-1 relative">
                            <textarea 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isRecording ? "正在录音..." : "输入您的问题..."}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 resize-none h-[46px] leading-relaxed scrollbar-none"
                            />
                        </div>

                        {/* Send Button */}
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isTyping || isRecording}
                            className="p-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm flex-shrink-0"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentChatModal;