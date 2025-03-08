import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassFilter, classFilterSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface SearchFiltersProps {
  onFilter: (filters: ClassFilter) => void;
  userLocation: { latitude: number; longitude: number };
}

export function SearchFilters({ onFilter, userLocation }: SearchFiltersProps) {
  const form = useForm<ClassFilter>({
    resolver: zodResolver(classFilterSchema),
    defaultValues: {
      search: "",
      school: "",
      topic: "",
      distance: 10,
      ...userLocation,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFilter)}
        className="space-y-4 bg-card p-4 rounded-lg"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Search classes..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <FormControl>
                <Input placeholder="Filter by school..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Filter by topic..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="distance"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Distance (km)</FormLabel>
              <FormControl>
                <Slider
                  value={[value || 10]}
                  onValueChange={([newValue]) => onChange(newValue)}
                  max={50}
                  step={1}
                  className="py-4"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Apply Filters
        </Button>
      </form>
    </Form>
  );
}
