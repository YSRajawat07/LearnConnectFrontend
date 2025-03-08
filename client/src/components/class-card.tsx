import { Class } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, School, Book } from "lucide-react";

interface ClassCardProps {
  class: Class;
  onEdit?: () => void;
  onDelete?: () => void;
  isTeacher?: boolean;
}

export function ClassCard({ class: classData, onEdit, onDelete, isTeacher }: ClassCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{classData.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Book className="h-4 w-4 mr-2" />
            {classData.topic}
          </div>
          <div className="flex items-center text-muted-foreground">
            <School className="h-4 w-4 mr-2" />
            {classData.school}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {`${classData.latitude.toFixed(2)}, ${classData.longitude.toFixed(2)}`}
          </div>
          <p className="mt-2 line-clamp-3">{classData.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          className="flex-1"
          variant="default"
          onClick={() => window.open(classData.meetLink, '_blank')}
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          Join Class
        </Button>
        {isTeacher && (
          <>
            <Button variant="outline" size="icon" onClick={onEdit}>
              ✏️
            </Button>
            <Button variant="destructive" size="icon" onClick={onDelete}>
              🗑️
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
