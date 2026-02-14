import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Home, Sofa, Lightbulb, Hammer } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "التصميم الداخلي",
    description: "تصاميم مخصصة تعكس ذوقك وشخصيتك",
    price: "من 5,000 درهم",
    features: ["استشارة مجانية", "تصاميم ثلاثية الأبعاد", "اختيار المواد"]
  },
  {
    icon: Home,
    title: "تصميم الفلل",
    description: "تصاميم فاخرة للفلل السكنية",
    price: "من 15,000 درهم",
    features: ["تصميم شامل", "إشراف على التنفيذ", "ضمان الجودة"]
  },
  {
    icon: Sofa,
    title: "تأثيث المساحات",
    description: "اختيار الأثاث والديكور المناسب",
    price: "من 3,000 درهم",
    features: ["اختيار الأثاث", "التنسيق الداخلي", "التوصيل والتركيب"]
  },
  {
    icon: Lightbulb,
    title: "الإضاءة والديكور",
    description: "تصاميم إضاءة حديثة وديكور مميز",
    price: "من 2,000 درهم",
    features: ["تصميم الإضاءة", "ديكور معاصر", "تركيب احترافي"]
  },
  {
    icon: Hammer,
    title: "التشطيبات",
    description: "تشطيبات عالية الجودة بأفضل الأسعار",
    price: "من 1,000 درهم",
    features: ["دهان احترافي", "أرضيات فخمة", "جدران مزخرفة"]
  },
  {
    icon: Sparkles,
    title: "الاستشارات المتقدمة",
    description: "استشارات متخصصة من خبرائنا",
    price: "500 درهم/ساعة",
    features: ["استشارة شاملة", "نصائح متخصصة", "خطة عمل مفصلة"]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-amber-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">خدماتنا الشاملة</h1>
          <p className="text-xl text-slate-300">نقدم مجموعة متنوعة من الخدمات المتخصصة في التصميم الداخلي والتشطيبات</p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="bg-slate-700/50 border-amber-500/30 p-8 hover:border-amber-500 transition group">
                <service.icon className="w-16 h-16 text-amber-500 mb-6 group-hover:scale-110 transition" />
                
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-300 mb-4">{service.description}</p>
                
                <div className="mb-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <p className="text-amber-400 font-bold text-lg">{service.price}</p>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  احجز الآن
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل تريد استشارة مجانية؟</h2>
          <p className="text-xl text-slate-300 mb-8">تواصل معنا اليوم واحصل على استشارة مجانية من خبرائنا</p>
          <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
            احجز استشارتك الآن
          </Button>
        </div>
      </section>
    </div>
  );
}
