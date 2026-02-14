import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Loader2, Sparkles, Home, Palette, Calculator, MessageSquare, Award } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  
  const projectsQuery = trpc.projects.completed.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-amber-500 mx-auto mb-4" />
          <p className="text-white text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-amber-500" />
              <h1 className="text-2xl font-bold text-white">نور الوجود</h1>
            </div>
            
            <div className="hidden md:flex gap-8">
              <button onClick={() => setActiveTab("home")} className="text-white hover:text-amber-500 transition">الرئيسية</button>
              <button onClick={() => setActiveTab("services")} className="text-white hover:text-amber-500 transition">الخدمات</button>
              <button onClick={() => setActiveTab("projects")} className="text-white hover:text-amber-500 transition">المشاريع</button>
              <button onClick={() => setActiveTab("noor")} className="text-white hover:text-amber-500 transition">مساعد نور</button>
            </div>
            
            <div className="flex gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-white text-sm">{user?.name}</span>
                  <Button onClick={() => logout()} variant="outline" size="sm">خروج</Button>
                </>
              ) : (
                <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600">
                  <a href={getLoginUrl()}>دخول</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === "home" && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  تصاميم داخلية <span className="text-amber-500">فاخرة</span>
                </h2>
                <p className="text-xl text-slate-300">
                  نحول أحلامك إلى واقع معماري مذهل.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600">احجز الآن</Button>
                  <Button size="lg" variant="outline" className="border-amber-500 text-amber-500">شاهد الأعمال</Button>
                </div>
              </div>
              
              <div className="relative h-96 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl border border-amber-500/30 flex items-center justify-center">
                <div className="text-center">
                  <Home className="w-24 h-24 text-amber-500 mx-auto mb-4 opacity-50" />
                  <p className="text-slate-400">معرض الصور</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {activeTab === "home" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-700/50 border-amber-500/30 p-8 text-center">
                <Award className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">500+</h3>
                <p className="text-slate-300">مشروع منجز</p>
              </Card>
              
              <Card className="bg-slate-700/50 border-amber-500/30 p-8 text-center">
                <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">15+</h3>
                <p className="text-slate-300">سنة خبرة</p>
              </Card>
              
              <Card className="bg-slate-700/50 border-amber-500/30 p-8 text-center">
                <Palette className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">98%</h3>
                <p className="text-slate-300">رضا العملاء</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {activeTab === "services" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">خدماتنا</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-700/50 border-amber-500/30 p-8 hover:border-amber-500 transition">
                <Palette className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">التصميم الداخلي</h3>
                <p className="text-slate-300">تصاميم مخصصة تعكس ذوقك</p>
              </Card>
              
              <Card className="bg-slate-700/50 border-amber-500/30 p-8 hover:border-amber-500 transition">
                <Calculator className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">حساب التكاليف</h3>
                <p className="text-slate-300">تقديرات دقيقة وشفافة</p>
              </Card>
              
              <Card className="bg-slate-700/50 border-amber-500/30 p-8 hover:border-amber-500 transition">
                <MessageSquare className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">استشارات مجانية</h3>
                <p className="text-slate-300">نصائح من خبرائنا</p>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {activeTab === "projects" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">أعمالنا</h2>
            
            {projectsQuery.isLoading ? (
              <div className="text-center">
                <Loader2 className="animate-spin w-8 h-8 text-amber-500 mx-auto" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsQuery.data?.map((project) => (
                  <Card key={project.id} className="bg-slate-700/50 border-amber-500/30 overflow-hidden hover:border-amber-500 transition">
                    <div className="h-48 bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                      <Home className="w-16 h-16 text-amber-500 opacity-30" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-slate-300 text-sm mb-4">{project.description}</p>
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>{project.category}</span>
                        <span>{project.style}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Noor AI Assistant */}
      {activeTab === "noor" && isAuthenticated && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">مساعد نور الذكي</h2>
            
            <Card className="bg-slate-700/50 border-amber-500/30 p-8">
              <div className="space-y-6">
                <div className="h-96 bg-slate-800/50 rounded-lg p-4 overflow-y-auto border border-amber-500/20">
                  <p className="text-slate-400 text-center py-8">
                    اسأل نور عن التصميم الداخلي والتشطيبات
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="اسأل سؤالاً..."
                    className="flex-1 bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                  />
                  <Button className="bg-amber-500 hover:bg-amber-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    إرسال
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Consultation Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">احجز استشارة</h2>
          
          <Card className="bg-slate-700/50 border-amber-500/30 p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسمك"
                  className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                />
                <input
                  type="email"
                  placeholder="بريدك"
                  className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                />
              </div>
              
              <input
                type="tel"
                placeholder="رقم الهاتف"
                className="w-full bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-400"
              />
              
              <textarea
                placeholder="وصف مشروعك..."
                rows={4}
                className="w-full bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2 text-white placeholder-slate-400"
              />
              
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3">
                احجز الآن
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-amber-500/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2026 نور الوجود. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
