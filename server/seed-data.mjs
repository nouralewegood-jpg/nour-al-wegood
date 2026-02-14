#!/usr/bin/env node
/**
 * سكريبت لإنشاء بيانات حقيقية للمشروع باستخدام أدوات الذكاء الاصطناعي
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import mysql from "mysql2/promise";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const COHERE_API_KEY = process.env.COHERE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateMaterialsData() {
  console.log("🎨 جاري توليد بيانات المواد والتشطيبات...");
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `
أنت خبير في مجال التصميم الداخلي والتشطيبات. قم بإنشاء قائمة بـ 20 مادة وتشطيب حقيقية مع أسعارها الفعلية في السوق الإماراتي.

الصيغة المطلوبة (JSON):
[
  {
    "name": "اسم المادة",
    "category": "paint|flooring|tiles|wood|furniture|lighting|accessories",
    "description": "وصف المادة",
    "pricePerUnit": 150.50,
    "unit": "m2|m3|piece|liter",
    "supplier": "اسم المورد",
    "quality": "standard|premium|luxury"
  }
]

تأكد من أن الأسعار واقعية وتعكس السوق الإماراتي الحالي.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // استخراج JSON من الرد
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return [];
}

async function generateProjectsData() {
  console.log("🏗️ جاري توليد بيانات المشاريع...");
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `
أنت خبير في التصميم الداخلي. قم بإنشاء قائمة بـ 10 مشاريع تصميم داخلي حقيقية مع تفاصيلها.

الصيغة المطلوبة (JSON):
[
  {
    "title": "اسم المشروع",
    "description": "وصف المشروع",
    "category": "residential|commercial|villa|apartment",
    "style": "modern|classic|minimalist|luxury",
    "area": 250.50,
    "budget": 50000,
    "location": "الموقع في الإمارات",
    "status": "completed|in_progress|planning"
  }
]

استخدم أسماء مشاريع حقيقية وتفاصيل واقعية.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return [];
}

async function generatePricingData() {
  console.log("💰 جاري توليد بيانات التسعير...");
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const prompt = `
قم بإنشاء جدول تسعير شامل للمشاريع المختلفة في السوق الإماراتي.

الصيغة المطلوبة (JSON):
[
  {
    "projectType": "residential|commercial|villa|apartment",
    "style": "modern|classic|minimalist|luxury",
    "basePricePerM2": 1500,
    "laborCostPerM2": 500,
    "description": "وصف الخدمة"
  }
]

استخدم أسعار واقعية تعكس السوق الإماراتي الحالي.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return [];
}

async function insertDataToDatabase(materials, projects, pricing) {
  console.log("💾 جاري إدراج البيانات في قاعدة البيانات...");
  
  try {
    const connection = await mysql.createConnection(DATABASE_URL);
    
    // إدراج المواد
    for (const material of materials) {
      const query = `
        INSERT INTO materials (name, category, description, pricePerUnit, unit, supplier, quality, available)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)
      `;
      
      await connection.execute(query, [
        material.name,
        material.category,
        material.description,
        material.pricePerUnit,
        material.unit,
        material.supplier,
        material.quality || 'standard'
      ]);
    }
    
    // إدراج الأسعار
    for (const price of pricing) {
      const query = `
        INSERT INTO pricing (projectType, style, basePricePerM2, laborCostPerM2, description)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      await connection.execute(query, [
        price.projectType,
        price.style,
        price.basePricePerM2,
        price.laborCostPerM2,
        price.description
      ]);
    }
    
    // إدراج المشاريع
    for (const project of projects) {
      const query = `
        INSERT INTO projects (title, description, category, style, area, budget, location, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(query, [
        project.title,
        project.description,
        project.category,
        project.style,
        project.area,
        project.budget,
        project.location,
        project.status || 'planning'
      ]);
    }
    
    await connection.end();
    console.log("✅ تم إدراج البيانات بنجاح!");
    
  } catch (error) {
    console.error("❌ خطأ في إدراج البيانات:", error);
  }
}

async function main() {
  console.log("🚀 بدء عملية إنشاء البيانات الحقيقية...\n");
  
  try {
    const materials = await generateMaterialsData();
    const projects = await generateProjectsData();
    const pricing = await generatePricingData();
    
    console.log(`✅ تم توليد ${materials.length} مادة`);
    console.log(`✅ تم توليد ${projects.length} مشروع`);
    console.log(`✅ تم توليد ${pricing.length} جدول تسعير\n`);
    
    await insertDataToDatabase(materials, projects, pricing);
    
    console.log("\n🎉 اكتملت عملية إنشاء البيانات!");
    
  } catch (error) {
    console.error("❌ خطأ:", error);
    process.exit(1);
  }
}

main();
