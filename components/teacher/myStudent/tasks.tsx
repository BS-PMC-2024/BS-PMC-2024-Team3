import { Button } from "@/components/ui/button";
import { TeacherTask } from "@prisma/client";
import Link from "next/link";

interface TasksProps {
  id: string;
  name: string | null;
  tasks: TeacherTask[] | null;
}

export async function Tasks({ id, tasks, name }: TasksProps) {
  return (
    <>
      <div className="mx-auto my-2">
        <Link href={`/teacher/createtask?id=${id}`}>
          <Button
            variant={"outline"}
            className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
          >
            יצירת מטלה חדשה
          </Button>
        </Link>
      </div>
    </>
  );
}
