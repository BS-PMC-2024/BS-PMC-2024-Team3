"use client";
import React, { useState } from "react";
import Loading from "../loading";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Input } from "../ui/input";
import { Student } from "@prisma/client";
import StudentList from "./studentList";

interface StudentChoseProps {
  allStudents: Student[];
  AdminRole?: boolean;
}

const StudentChoose: React.FC<StudentChoseProps> = ({
  allStudents,
  AdminRole,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col py-8 px-2 w-full md:w-3/5 justify-center mx-auto">
        <div
          className="text-דצ md:text-base text-darkRed mb-1 sm:mb-2"
          dir="rtl"
        >
          בחירת תלמיד לפי שם או שם משפחה:
        </div>
        <div className="flex flex-row items-center relative w-full" dir="rtl">
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mx-2" />
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="חפש משתמש .."
            className="rounded-xl shadow-xl pl-8 pr-10 w-full border-grayish"
          />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <UserPlusIcon className="h-5 w-5 text-gray-400 mx-2" />
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {allStudents && (
              <StudentList
                allStudents={allStudents}
                searchTerm={searchTerm}
                AdminRole={AdminRole}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StudentChoose;
