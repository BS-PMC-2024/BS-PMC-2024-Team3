import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface HoverCardMessegeProps {
  TeacherName: string;
  MessegeTxt: string;
}

export function HoverCardMessege({
  TeacherName,
  MessegeTxt,
}: HoverCardMessegeProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" dir="rtl">
          הודעה מהמורה
          <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4 mr-1" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-mediumBeige">
        <div className="flex flex-col space-y-1 text-lightRed p-1">
          <h4 className="text-lg font-medium">{TeacherName}</h4>
          <p className="text-sm text-black whitespace-pre-wrap">{MessegeTxt}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
