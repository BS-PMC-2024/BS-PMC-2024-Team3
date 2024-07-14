"use client";
import HashLoader from "react-spinners/HashLoader";
import { Button } from "../ui/button";
import { useState } from "react";
import { ApproveTeacher, DeleteUser } from "@/lib/ServerActions/ServerActions";
import { useRouter } from "next/navigation";

interface TeachersToApproveProps {
  Teachers: {
    id: string;
    name: string | null;
  }[];
}

const TeachersToApprove: React.FC<TeachersToApproveProps> = ({ Teachers }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState(Teachers);
  const router = useRouter();

  const handleApprove = async (ID: string) => {
    setIsLoading(true);
    await ApproveTeacher(ID);
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher.id !== ID)
    );
    setIsLoading(false);
    router.refresh();
  };

  const handleDelete = async (ID: string) => {
    setIsLoading(true);
    await DeleteUser(ID);
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher.id !== ID)
    );
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-grayish m-4 shadow-grayish shadow-xl p-1 sm:p-2 lg:p-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-2 space-x-2">
          <p className="text-darkRed text-xxs py-2" dir="rtl">
            טוען ..
          </p>
          <HashLoader color="#E85A4F" size={25} />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex justify-between items-center p-2 lg:p-3 rounded-lg border border-mediumBeige bg-lightBeige shadow-lg"
              >
                <div className="flex space-x-1 sm:space-x-2 lg:space-x-3">
                  <Button
                    variant={"destructive"}
                    className="text-xs md:text-base"
                    onClick={() => handleDelete(teacher.id)}
                  >
                    מחק
                  </Button>
                  <Button
                    variant={"outline"}
                    className="border-white text-white bg-green-500 hover:bg-green-700 text-xs md:text-base"
                    onClick={() => handleApprove(teacher.id)}
                  >
                    אישור
                  </Button>
                </div>
                <h3 className="text-base md:text-lg text-black">
                  {teacher.name || "Unnamed Teacher"}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeachersToApprove;
