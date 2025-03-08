import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterClassSchema, FilterClass } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

interface ClassFiltersProps {
  onFilter: (filters: FilterClass) => void;
  location: { latitude: number; longitude: number };
}

export function ClassFilters({ onFilter, location }: ClassFiltersProps) {
  const form = useForm<FilterClass>({
    resolver: zodResolver(filterClassSchema),
    defaultValues: {
      topic: "",
      school: "",
      teacher: "",
      maxDistance: 50,
      ...location
    }
  });

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onFilter)}
            onChange={form.handleSubmit(onFilter)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Mathematics" {...field} />
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
                    <Input placeholder="School name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Distance (km): {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={100}
                      step={1}
                      value={[field.value as number]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
