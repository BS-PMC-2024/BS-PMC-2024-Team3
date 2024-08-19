import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeacherTask } from "@prisma/client";
import Link from "next/link";

interface TasksProps {
  id: string;
  name: string | null;
  tasks: TeacherTask[] | null;
}

export async function Tasks({ id, tasks, name }: TasksProps) {
  const translateLevel = (level: string) => {
    switch (level) {
      case "Easy":
        return "קל";
      case "Medium":
        return "בינוני";
      case "Hard":
        return "קשה";
      default:
        return " - ";
    }
  };
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
      {tasks && (
        <div className="flex flex-col justify-center w-full md:w-2/3 mx-auto bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg shadow-xl backdrop-blur">
          <Table dir="rtl" className="text-xs sm:text-base">
            <TableCaption>המטלות האחרונות של {name}</TableCaption>
            <TableHeader dir="rtl">
              <TableRow dir="rtl">
                <TableHead className="text-right font-medium text-darkRed">
                  מספר
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  שם המטלה
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  להגשה עד
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  הודעה
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  ציון
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  רמה
                </TableHead>
                <TableHead className="text-right font-medium text-darkRed">
                  סטטוס
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody dir="rtl">
              {tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    {new Date(task.date).toLocaleDateString("he-IL")}
                  </TableCell>
                  <TableCell>{task.messageText}</TableCell>
                  <TableCell>{task.grade ?? " - "}</TableCell>
                  <TableCell>{translateLevel(task.level) ?? " - "}</TableCell>
                  <TableCell>
                    {task.approvedByAdmin ? "מאושר" : "ממתין לאישור מנהל האתר"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
