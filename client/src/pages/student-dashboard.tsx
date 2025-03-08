import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useGeolocation } from "@/lib/use-geolocation";
import { Class, FilterClass } from "@shared/schema";
import { ClassCard } from "@/components/class-card";
import { ClassFilters } from "@/components/class-filters";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { LogOut } from "lucide-react";

export default function StudentDashboard() {
  const { user, logoutMutation } = useAuth();
  const { location } = useGeolocation();
  const { toast } = useToast();

  const { data: classes, isLoading } = useQuery<Class[]>({
    queryKey: ["/api/classes/search"],
    enabled: !!location,
    queryFn: async () => {
      if (!location) return [];
      const res = await apiRequest("POST", "/api/classes/search", {
        ...location,
        maxDistance: 50
      });
      return res.json();
    }
  });

  const handleFilter = async (filters: FilterClass) => {
    if (!location) {
      toast({
        title: "Error",
        description: "Location is required to search for classes",
        variant: "destructive"
      });
      return;
    }

    const res = await apiRequest("POST", "/api/classes/search", {
      ...filters,
      ...location
    });
    const data = await res.json();
    return data;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">Find classes near you</p>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          <aside>
            {location && (
              <ClassFilters
                onFilter={handleFilter}
                location={location}
              />
            )}
          </aside>

          <div className="space-y-6">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[300px] bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes?.map((classItem) => (
                  <ClassCard key={classItem.id} class={classItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
