import { User, InsertUser, Class, InsertClass, FilterClass } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { calculateDistance } from "./utils";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createClass(teacherId: number, classData: InsertClass): Promise<Class>;
  updateClass(id: number, teacherId: number, classData: Partial<InsertClass>): Promise<Class>;
  deleteClass(id: number, teacherId: number): Promise<void>;
  getClassesByTeacher(teacherId: number): Promise<Class[]>;
  filterClasses(filter: FilterClass): Promise<Class[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private classes: Map<number, Class>;
  private currentUserId: number;
  private currentClassId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.classes = new Map();
    this.currentUserId = 1;
    this.currentClassId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      school: insertUser.school || null 
    };
    this.users.set(id, user);
    return user;
  }

  async createClass(teacherId: number, classData: InsertClass): Promise<Class> {
    const id = this.currentClassId++;
    const classObj: Class = { ...classData, id, teacherId };
    this.classes.set(id, classObj);
    return classObj;
  }

  async updateClass(id: number, teacherId: number, classData: Partial<InsertClass>): Promise<Class> {
    const existing = this.classes.get(id);
    if (!existing || existing.teacherId !== teacherId) {
      throw new Error("Class not found or unauthorized");
    }
    
    const updated: Class = { ...existing, ...classData };
    this.classes.set(id, updated);
    return updated;
  }

  async deleteClass(id: number, teacherId: number): Promise<void> {
    const existing = this.classes.get(id);
    if (!existing || existing.teacherId !== teacherId) {
      throw new Error("Class not found or unauthorized");
    }
    this.classes.delete(id);
  }

  async getClassesByTeacher(teacherId: number): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(
      (cls) => cls.teacherId === teacherId
    );
  }

  async filterClasses(filter: FilterClass): Promise<Class[]> {
    return Array.from(this.classes.values()).filter((cls) => {
      if (filter.topic && cls.topic !== filter.topic) return false;
      if (filter.school && cls.school !== filter.school) return false;
      if (filter.maxDistance) {
        const distance = calculateDistance(
          filter.latitude,
          filter.longitude,
          cls.latitude,
          cls.longitude
        );
        if (distance > filter.maxDistance) return false;
      }
      return true;
    });
  }
}

export const storage = new MemStorage();
