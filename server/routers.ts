import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getProjects, getCompletedProjects, getMaterials, getAllPricing, createConsultation, getChatHistory, saveChatMessage, getProjectById } from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects
  projects: router({
    list: publicProcedure.query(async () => {
      return getProjects(10);
    }),
    completed: publicProcedure.query(async () => {
      return getCompletedProjects(6);
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProjectById(input.id);
      }),
  }),

  // Materials and finishes
  materials: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return getMaterials(input?.category);
      }),
  }),

  // Pricing
  pricing: router({
    list: publicProcedure.query(async () => {
      return getAllPricing();
    }),
  }),

  // Consultations
  consultations: router({
    create: publicProcedure
      .input(z.object({
        clientName: z.string(),
        clientEmail: z.string().email(),
        clientPhone: z.string(),
        projectType: z.string(),
        description: z.string(),
        preferredDate: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const userId = ctx.user?.id || 0;
        return createConsultation({
          userId,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          clientPhone: input.clientPhone,
          projectType: input.projectType,
          description: input.description,
          preferredDate: input.preferredDate || null,
          status: 'pending',
        });
      }),
  }),

  // Noor AI Assistant
  noor: router({
    chat: protectedProcedure
      .input(z.object({
        message: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "أنت نور، مساعد ذكي متخصص في التصميم الداخلي والتشطيبات. تقدم استشارات محترفة ومفيدة بالعربية. كن ودوداً ومفيداً.",
              },
              {
                role: "user",
                content: input.message,
              },
            ],
          });

          const assistantResponse = typeof response.choices?.[0]?.message?.content === 'string' 
            ? response.choices[0].message.content 
            : "عذراً، لم أستطع الرد على سؤالك.";

          // Save chat history
          if (typeof assistantResponse === 'string') {
            await saveChatMessage(ctx.user.id, input.message, assistantResponse);
          }

          return {
            message: assistantResponse,
            success: true,
          };
        } catch (error) {
          console.error("Error in Noor chat:", error);
          return {
            message: "عذراً، حدث خطأ ما. يرجى محاولة لاحقاً.",
            success: false,
          };
        }
      }),
    history: protectedProcedure.query(async ({ ctx }) => {
      return getChatHistory(ctx.user.id, 20);
    }),
  }),
});

export type AppRouter = typeof appRouter;
