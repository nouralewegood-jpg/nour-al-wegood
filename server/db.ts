import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, consultations, materials, pricing, reviews, chatHistory, Project, Consultation, Material, Pricing, Review, ChatHistory, InsertConsultation } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "phone"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// دوال المشاريع
export async function getProjects(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(desc(projects.createdAt)).limit(limit);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCompletedProjects(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects)
    .where(eq(projects.status, 'completed'))
    .orderBy(desc(projects.completedAt))
    .limit(limit);
}

// دوال الاستشارات
export async function createConsultation(consultation: InsertConsultation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(consultations).values(consultation);
  return result;
}

export async function getConsultations(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(consultations).where(eq(consultations.userId, userId));
}

// دوال المواد والتشطيبات
export async function getMaterials(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(materials).where(eq(materials.category, category));
  }
  return db.select().from(materials);
}

export async function getMaterialById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(materials).where(eq(materials.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// دوال الأسعار
export async function getPricing(projectType: string, style: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(pricing)
    .where(eq(pricing.projectType, projectType))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllPricing() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pricing);
}

// دوال التقييمات
export async function getProjectReviews(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.projectId, projectId));
}

// دوال سجل المحادثات
export async function saveChatMessage(userId: number, userMessage: string, assistantResponse: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(chatHistory).values({
    userId,
    userMessage,
    assistantResponse,
  });
}

export async function getChatHistory(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatHistory)
    .where(eq(chatHistory.userId, userId))
    .orderBy(desc(chatHistory.createdAt))
    .limit(limit);
}
