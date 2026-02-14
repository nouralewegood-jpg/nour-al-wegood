import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Home } from "lucide-react";

const projectTypes = [
  { id: "apartment", label: "شقة سكنية", basePrice: 1500 },
  { id: "villa", label: "فيلا", basePrice: 2000 },
  { id: "commercial", label: "مساحة تجارية", basePrice: 1800 },
  { id: "office", label: "مكتب", basePrice: 1600 }
];

const styles = [
  { id: "modern", label: "حديث", multiplier: 1 },
  { id: "classic", label: "كلاسيكي", multiplier: 1.2 },
  { id: "minimalist", label: "بسيط", multiplier: 0.9 },
  { id: "luxury", label: "فاخر", multiplier: 1.5 }
];

const finishingTypes = [
  { id: "basic", label: "أساسي", cost: 500 },
  { id: "standard", label: "عادي", cost: 800 },
  { id: "premium", label: "ممتاز", cost: 1200 },
  { id: "luxury", label: "فاخر", cost: 1800 }
];

export default function PricingCalculator() {
  const [area, setArea] = useState(100);
  const [projectType, setProjectType] = useState("apartment");
  const [style, setStyle] = useState("modern");
  const [finishing, setFinishing] = useState("standard");

  const selectedProject = projectTypes.find(p => p.id === projectType);
  const selectedStyle = styles.find(s => s.id === style);
  const selectedFinishing = finishingTypes.find(f => f.id === finishing);

  const basePrice = (selectedProject?.basePrice || 1500) * area;
  const styleAdjustment = basePrice * ((selectedStyle?.multiplier || 1) - 1);
  const finishingCost = (selectedFinishing?.cost || 800) * area;
  const laborCost = area * 300; // 300 درهم/م2 للعمالة
  const totalCost = basePrice + styleAdjustment + finishingCost + laborCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-amber-500/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Calculator className="w-12 h-12 text-amber-500" />
            <h1 className="text-5xl font-bold text-white">حاسبة التكاليف</h1>
          </div>
          <p className="text-xl text-slate-300">احسب تكلفة مشروعك بدقة</p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Input Section */}
            <Card className="bg-slate-700/50 border-amber-500/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-8">بيانات المشروع</h2>
              
              <div className="space-y-8">
                {/* Area */}
                <div>
                  <label className="block text-white font-bold mb-3">المساحة (متر مربع)</label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="10"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-2 text-amber-400 text-lg font-bold">{area} م²</div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-white font-bold mb-3">نوع المشروع</label>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={`p-3 rounded-lg border-2 transition ${
                          projectType === type.id
                            ? "border-amber-500 bg-amber-500/20 text-white"
                            : "border-amber-500/30 text-slate-300 hover:border-amber-500"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="block text-white font-bold mb-3">الأسلوب</label>
                  <div className="grid grid-cols-2 gap-3">
                    {styles.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={`p-3 rounded-lg border-2 transition ${
                          style === s.id
                            ? "border-amber-500 bg-amber-500/20 text-white"
                            : "border-amber-500/30 text-slate-300 hover:border-amber-500"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Finishing */}
                <div>
                  <label className="block text-white font-bold mb-3">جودة التشطيب</label>
                  <div className="grid grid-cols-2 gap-3">
                    {finishingTypes.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFinishing(f.id)}
                        className={`p-3 rounded-lg border-2 transition ${
                          finishing === f.id
                            ? "border-amber-500 bg-amber-500/20 text-white"
                            : "border-amber-500/30 text-slate-300 hover:border-amber-500"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-500/50 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">تفصيل التكاليف</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-amber-500/30">
                    <span className="text-slate-300">السعر الأساسي (م²)</span>
                    <span className="text-white font-bold">{selectedProject?.basePrice} درهم</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-amber-500/30">
                    <span className="text-slate-300">إجمالي السعر الأساسي</span>
                    <span className="text-white font-bold">{basePrice.toLocaleString()} درهم</span>
                  </div>
                  
                  {styleAdjustment > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-amber-500/30">
                      <span className="text-slate-300">تعديل الأسلوب</span>
                      <span className="text-amber-400 font-bold">+{styleAdjustment.toLocaleString()} درهم</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pb-4 border-b border-amber-500/30">
                    <span className="text-slate-300">تكلفة التشطيب</span>
                    <span className="text-white font-bold">{finishingCost.toLocaleString()} درهم</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b border-amber-500/30">
                    <span className="text-slate-300">تكلفة العمالة</span>
                    <span className="text-white font-bold">{laborCost.toLocaleString()} درهم</span>
                  </div>
                </div>

                <div className="bg-amber-500/30 border border-amber-500/50 rounded-lg p-6">
                  <p className="text-slate-300 mb-2">التكلفة الإجمالية المتوقعة</p>
                  <h3 className="text-5xl font-bold text-amber-400">
                    {totalCost.toLocaleString()} <span className="text-xl">درهم</span>
                  </h3>
                  <p className="text-slate-400 text-sm mt-2">
                    {(totalCost / area).toLocaleString()} درهم/م²
                  </p>
                </div>
              </Card>

              <Card className="bg-slate-700/50 border-amber-500/30 p-8">
                <h3 className="text-xl font-bold text-white mb-4">ملاحظات مهمة</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• هذا التقدير تقريبي ويعتمد على المواد المختارة</li>
                  <li>• قد تختلف التكاليف حسب موقع المشروع والتفاصيل الإضافية</li>
                  <li>• نقدم استشارة مجانية لتحديد السعر النهائي</li>
                </ul>
              </Card>

              <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6">
                احجز استشارة مجانية
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
