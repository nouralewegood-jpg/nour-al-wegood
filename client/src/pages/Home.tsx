import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Loader2, Sparkles, Home, Palette, Calculator, MessageSquare, Award, ArrowRight, Play } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  
  const projectsQuery = trpc.projects.completed.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-foreground text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-primary">نور الوجود</h1>
            </div>
            
            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => setActiveTab("home")} className={`font-medium transition ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>الرئيسية</button>
              <button onClick={() => setActiveTab("services")} className={`font-medium transition ${activeTab === 'services' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>الخدمات</button>
              <button onClick={() => setActiveTab("projects")} className={`font-medium transition ${activeTab === 'projects' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>المشاريع</button>
              <button onClick={() => setActiveTab("noor")} className={`font-medium transition ${activeTab === 'noor' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>مساعد نور</button>
            </div>
            
            <div className="flex gap-4 items-center">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium hidden sm:inline-block">{user?.name}</span>
                  <Button onClick={() => logout()} variant="outline" size="sm" className="rounded-full">خروج</Button>
                </div>
              ) : (
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8">
                  <a href={getLoginUrl()}>تواصل معنا</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === "home" && (
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-primary rounded-full text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>مستقبل التصميم الداخلي بالذكاء الاصطناعي</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                  نرتقي بالمساحات <br />
                  <span className="text-primary">بحلول ذكية</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                  تصميمات مبتكرة وأتمتة متقدمة للمعيشة العصرية. نحول رؤيتك إلى واقع ملموس يجمع بين الفخامة والتقنية.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-10 h-14 text-lg shadow-lg shadow-secondary/20">
                    ابدأ الآن <ArrowRight className="mr-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg border-2 border-slate-200 hover:bg-slate-50">
                    <Play className="ml-2 w-5 h-5 fill-current" /> شاهد الفيديو
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000" 
                    alt="Modern Interior" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Expertise Section */}
      {activeTab === "home" && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h3 className="text-primary font-bold mb-4 tracking-wider uppercase">خبراتنا</h3>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">نجمع بين الفخامة والتكنولوجيا</h2>
              </div>
              <p className="text-slate-500 max-w-md text-lg">
                نحن متخصصون في إنشاء تصميمات داخلية مذهلة مدمجة مع أحدث تقنيات المنازل الذكية لتعزيز نمط حياتك.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "التصميم الداخلي", desc: "حلول داخلية مخصصة وراقية", icon: Palette, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600" },
                { title: "أتمتة المنزل الذكي", desc: "أتمتة متقدمة لراحة قصوى", icon: Home, img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600" },
                { title: "حلول الإضاءة", desc: "تصميمات إضاءة أنيقة وفعالة", icon: Sparkles, img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600" }
              ].map((item, i) => (
                <Card key={i} className="group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl">
                  <div className="h-64 overflow-hidden relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors"></div>
                  </div>
                  <div className="p-8 bg-white">
                    <item.icon className="w-10 h-10 text-secondary mb-6" />
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h4>
                    <p className="text-slate-500 text-lg">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {activeTab === "home" && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <Award className="w-12 h-12 text-secondary mx-auto" />
                <h3 className="text-5xl font-bold">500+</h3>
                <p className="text-emerald-100 text-xl">مشروع منجز</p>
              </div>
              <div className="text-center space-y-4">
                <Sparkles className="w-12 h-12 text-secondary mx-auto" />
                <h3 className="text-5xl font-bold">15+</h3>
                <p className="text-emerald-100 text-xl">سنة خبرة</p>
              </div>
              <div className="text-center space-y-4">
                <Palette className="w-12 h-12 text-secondary mx-auto" />
                <h3 className="text-5xl font-bold">98%</h3>
                <p className="text-emerald-100 text-xl">رضا العملاء</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Consultation Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">جاهز لبدء مشروعك؟</h2>
              <p className="text-lg text-slate-600 mb-8">
                تواصل معنا اليوم للحصول على استشارة مجانية حول كيفية تحويل منزلك إلى مساحة ذكية وفاخرة.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-slate-700">دعم فني على مدار الساعة</span>
                </div>
              </div>
            </div>
            
            <Card className="p-8 border-none shadow-2xl rounded-3xl bg-white">
              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="محمد أحمد"
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">البريد الإلكتروني</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">رسالتك</label>
                  <textarea
                    placeholder="اخبرنا عن مشروعك..."
                    rows={4}
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-primary/20">
                  إرسال الرسالة
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">نور الوجود</h2>
              </div>
              <p className="text-slate-400 max-w-sm text-lg">
                المنصة الرائدة في دمج الذكاء الاصطناعي مع التصميم الداخلي والتشطيبات الفاخرة في الإمارات.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => setActiveTab("home")} className="hover:text-white transition">الرئيسية</button></li>
                <li><button onClick={() => setActiveTab("services")} className="hover:text-white transition">الخدمات</button></li>
                <li><button onClick={() => setActiveTab("projects")} className="hover:text-white transition">المشاريع</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4 text-slate-400">
                <li>أبوظبي، الإمارات</li>
                <li>info@nouralwegood.com</li>
                <li>+971 50 000 0000</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2026 نور الوجود. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
