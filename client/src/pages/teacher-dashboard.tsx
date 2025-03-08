import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Class, InsertClass } from "@shared/schema";
import { ClassCard } from "@/components/class-card";
import { ClassForm } from "@/components/class-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { LogOut, Plus } from "lucide-react";

export default function TeacherDashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: classes, isLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes/teacher"],
  });

  const createClassMutation = useMutation({
    mutationFn: async (data: InsertClass) => {
      const res = await apiRequest("POST", "/api/classes", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes/teacher"] });
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Class created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: async (data: InsertClass & { id: number }) => {
      const { id, ...classData } = data;
      const res = await apiRequest("PATCH", `/api/classes/${id}`, classData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes/teacher"] });
      setEditingClass(null);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Class updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/classes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classes/teacher"] });
      toast({
        title: "Success",
        description: "Class deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">Manage your classes</p>
          </div>
          <div className="flex gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Class
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingClass ? "Edit Class" : "Create New Class"}
                  </DialogTitle>
                </DialogHeader>
                <ClassForm
                  onSubmit={(data) => {
                    if (editingClass) {
                      updateClassMutation.mutate({ ...data, id: editingClass.id });
                    } else {
                      createClassMutation.mutate(data);
                    }
                  }}
                  defaultValues={editingClass || undefined}
                  isLoading={createClassMutation.isPending || updateClassMutation.isPending}
                />
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[300px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes?.map((classItem) => (
              <ClassCard
                key={classItem.id}
                class={classItem}
                isTeacher
                onEdit={() => {
                  setEditingClass(classItem);
                  setIsDialogOpen(true);
                }}
                onDelete={() => {
                  if (confirm("Are you sure you want to delete this class?")) {
                    deleteClassMutation.mutate(classItem.id);
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
