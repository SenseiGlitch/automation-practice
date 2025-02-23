import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export type ModuleId = 
  | 'locators'
  | 'iframes'
  | 'alerts'
  | 'forms'
  | 'calendar'
  | 'hover'
  | 'drag-drop'
  | 'waits'
  | 'windows';

export interface ModuleProgress {
  id: ModuleId;
  completed: boolean;
  lastAttempt?: Date;
}

export const moduleProgressSchema = z.object({
  id: z.enum(['locators', 'iframes', 'alerts', 'forms', 'calendar', 'hover', 'drag-drop', 'waits', 'windows']),
  completed: z.boolean(),
  lastAttempt: z.date().optional(),
});

export const modules = {
  locators: 'Locators',
  iframes: 'iFrames',
  alerts: 'Alerts',
  forms: 'Forms',
  calendar: 'Calendar',
  hover: 'Hover',
  'drag-drop': 'Drag & Drop',
  waits: 'Waits',
  windows: 'Windows',
} as const;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;