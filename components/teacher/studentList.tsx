import { Student } from "@prisma/client";
import Link from "next/link";
import UserCard from "../user/userCard";

interface StudentListProps {
  allStudents: Student[];
  searchTerm: string;
  AdminRole?: boolean;
}

const StudentList: React.FC<StudentListProps> = ({
  allStudents,
  searchTerm,
  AdminRole,
}) => {
  return (
    <div className="my-4">
      <div className="text-sm md:text-base text-darkRed mb-1 sm:mb-2" dir="rtl">
        בחירת תלמיד לפי שם או שם משפחה:
      </div>
      <div className="border border-grayish rounded-2xl">
        {allStudents.length > 0 ? (
          <>
            <div className="text-right pt-4 p-2 text-sm text-darkRed" dir="rtl">
              אנא בחר/י תלמיד/ה 👇🏻
            </div>
            <div className="flex justify-center flex-wrap">
              {allStudents
                .filter(
                  (student) =>
                    student.name &&
                    student.name.includes(searchTerm) &&
                    student.id != "0"
                )
                .map((student) => (
                  <div key={student.id}>
                    {student.name && (
                      <div className="flex flex-col items-center m-2 hover:scale-[80%] scale-75">
                        {!AdminRole ? (
                          <Link href={`/teacher/mystudent?id=${student.id}`}>
                            <UserCard
                              name={student.name}
                              image={student.image}
                            />
                          </Link>
                        ) : (
                          <Link href={`/admin/student?id=${student.id}`}>
                            <UserCard
                              name={student.name}
                              image={student.image}
                            />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="text-right p-2 text-sm text-grey-700">
            אין סטודנטים רשומים כרגע ☹︎
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
