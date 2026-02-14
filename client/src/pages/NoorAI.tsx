import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { MessageSquare, Send, Loader2, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function NoorAI() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.noor.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !isAuthenticated) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatMutation.mutateAsync({ message: input });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "عذراً، حدث خطأ. يرجى محاولة لاحقاً.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-700/50 border-amber-500/30 p-8 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">يجب تسجيل الدخول</h2>
          <p className="text-slate-300 mb-6">يرجى تسجيل الدخول للاستفادة من مساعد نور الذكي</p>
          <Button className="w-full bg-amber-500 hover:bg-amber-600">
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-amber-500/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="w-12 h-12 text-amber-500" />
            <h1 className="text-4xl font-bold text-white">مساعد نور الذكي</h1>
          </div>
          <p className="text-slate-300">استشارات ذكية حول التصميم الداخلي والتشطيبات</p>
        </div>
      </div>

      {/* Chat Interface */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-700/50 border-amber-500/30 h-96 md:h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-amber-500/30 mx-auto mb-4" />
                    <p className="text-slate-400">ابدأ محادثة مع نور</p>
                    <p className="text-slate-500 text-sm mt-2">اسأل عن التصميم الداخلي والتشطيبات</p>
                  </div>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-amber-500/20 border border-amber-500/50 text-white"
                          : "bg-slate-600/50 border border-amber-500/20 text-slate-100"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {msg.timestamp.toLocaleTimeString("ar-AE", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-600/50 border border-amber-500/20 px-4 py-3 rounded-lg">
                    <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-amber-500/20 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="اسأل سؤالاً..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Suggestions */}
          <div className="mt-8">
            <p className="text-white font-bold mb-4">أسئلة مقترحة:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "ما هي أفضل الألوان للمساحات الصغيرة؟",
                "كم تكلفة تشطيب شقة بمساحة 100 متر؟",
                "ما الفرق بين الأسلوب الحديث والكلاسيكي؟",
                "كيف أختار الأثاث المناسب لمنزلي؟"
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(suggestion);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-left p-4 bg-slate-700/50 border border-amber-500/20 rounded-lg hover:border-amber-500 transition text-slate-300 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
