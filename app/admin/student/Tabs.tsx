"use client";

import StudentStatistics from "@/components/student/studentStatistics";
import StudentCard from "@/components/teacher/myStudent/studentCard";
import { Question, Student } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherCard from "@/components/admin/TeacherCard";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface ExtendedStudent extends Student {
  answers: {
    id: string;
    studentId: string;
    questionId: string;
    givenAnswer: string;
    isCorrect: boolean;
    question: Question;
  }[];
}
interface TabsProps {
  studentData: ExtendedStudent;
  teacherDataForCard: TeacherData;
  studentDataForCard: StudentData;
}
interface StudentData {
  name: string | null;
  image: string | null;
  email: string | null;
}
interface TeacherData {
  name: string | null;
  image: string | null;
}
const TabsComponent: React.FC<TabsProps> = ({
  studentData,
  teacherDataForCard,
  studentDataForCard,
}) => {
  return (
    <>
      <Tabs
        defaultValue="student"
        className="w-full flex flex-col justify-center"
      >
        <TabsList className="mx-auto w-auto bg-mediumBeige border-lightRed">
          <TabsTrigger value="teacher">מורה</TabsTrigger>
          <TabsTrigger value="student">סטודנט</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          {studentDataForCard && <StudentCard {...studentDataForCard} />}
        </TabsContent>
        <TabsContent value="teacher">
          {teacherDataForCard && <TeacherCard {...teacherDataForCard} />}
        </TabsContent>
      </Tabs>
      {studentData && (
        <>
          {studentData.answers.length >= 1 ? (
            <StudentStatistics studentStats={studentData.answers} />
          ) : (
            <div
              className="flex items-center justify-center text-base lg:text-lg text-darkRed"
              dir="rtl"
            >
              תלמיד זה לא פתר עדין שאלות
              <FaceFrownIcon className="h-6 w-6" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TabsComponent;
