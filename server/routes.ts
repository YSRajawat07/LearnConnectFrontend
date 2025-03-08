import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertClassSchema, filterClassSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  function requireAuth(req: any, res: any, next: any) {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }

  app.post("/api/classes", requireAuth, async (req, res) => {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create classes" });
    }

    try {
      const classData = insertClassSchema.parse(req.body);
      const newClass = await storage.createClass(req.user.id, classData);
      res.status(201).json(newClass);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch("/api/classes/:id", requireAuth, async (req, res) => {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can update classes" });
    }

    try {
      const classData = insertClassSchema.partial().parse(req.body);
      const updated = await storage.updateClass(
        parseInt(req.params.id),
        req.user.id,
        classData
      );
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/classes/:id", requireAuth, async (req, res) => {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can delete classes" });
    }

    try {
      await storage.deleteClass(parseInt(req.params.id), req.user.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/classes/teacher", requireAuth, async (req, res) => {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can view their classes" });
    }

    try {
      const classes = await storage.getClassesByTeacher(req.user.id);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/classes/search", requireAuth, async (req, res) => {
    try {
      const filterData = filterClassSchema.parse(req.body);
      const classes = await storage.filterClasses(filterData);
      res.json(classes);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
