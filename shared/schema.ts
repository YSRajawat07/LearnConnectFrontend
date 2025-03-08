import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["teacher", "student"] }).notNull(),
  name: text("name").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  school: text("school"),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  meetLink: text("meet_link").notNull(),
  topic: text("topic").notNull(),
  school: text("school").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
});

export const insertUserSchema = createInsertSchema(users).extend({
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const insertClassSchema = createInsertSchema(classes).omit({ 
  id: true,
  teacherId: true 
});

export const filterClassSchema = z.object({
  topic: z.string().optional(),
  school: z.string().optional(),
  maxDistance: z.number().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;
export type Class = typeof classes.$inferSelect;
export type ClassFilter = z.infer<typeof filterClassSchema>;
export type FilterClass = ClassFilter;
