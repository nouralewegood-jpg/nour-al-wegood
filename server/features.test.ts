import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Projects Router", () => {
  it("should fetch completed projects", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    const projects = await caller.projects.completed();
    expect(Array.isArray(projects)).toBe(true);
  });

  it("should fetch all projects", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    const projects = await caller.projects.list();
    expect(Array.isArray(projects)).toBe(true);
  });
});

describe("Materials Router", () => {
  it("should fetch materials list", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    const materials = await caller.materials.list({});
    expect(Array.isArray(materials)).toBe(true);
  });
});

describe("Pricing Router", () => {
  it("should fetch pricing list", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    const pricing = await caller.pricing.list();
    expect(Array.isArray(pricing)).toBe(true);
  });
});

describe("Consultations Router", () => {
  it("should create consultation with valid data", async () => {
    const caller = appRouter.createCaller({
      user: { id: 1, role: "user" } as any,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    const result = await caller.consultations.create({
      clientName: "أحمد محمد",
      clientEmail: "ahmed@example.com",
      clientPhone: "+971501234567",
      projectType: "villa",
      description: "أريد تصميم فيلا فاخرة",
    });

    expect(result).toBeDefined();
  });
});
