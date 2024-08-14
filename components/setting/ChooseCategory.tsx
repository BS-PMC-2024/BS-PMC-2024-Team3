"use client";
import { useState } from "react";
import SideBarChosen from "./side-bar-chosen";
import UserProfile from "./profile/profile";
import TeacherReview from "./review/teacherReview";
import { Session } from "next-auth";
import ContentRating from "./review/contentRating";

interface ChooseCategoryProps {
  session: Session;
  teacher?: TeacherWithScore | null | undefined;
  Content?: ContentType | null | undefined;
  userRole: "student" | "teacher" | "admin";
}

interface TeacherWithScore {
  id: string;
  name: string | null;
  image: string | null;
  score: number | null;
}

interface ContentType {
  id: string;
  rating: number;
  teacherId: string;
  comment?: string | null;
}

const ChooseCategory: React.FC<ChooseCategoryProps> = ({
  session,
  teacher,
  Content,
  userRole,
}) => {
  const [categoryChosen, setCategoryChosen] = useState<string>("profile");
  const handleChosen = (ChosenName: string) => {
    setCategoryChosen(ChosenName);
  };

  return (
    <>
      {
        <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
          <div className="min-h-screen md:min-h-[500px] flex-grow mx-2">
            {categoryChosen === "profile" && <UserProfile session={session} />}
            {categoryChosen === "teacher" && userRole === "student" && (
              <TeacherReview teacher={teacher} />
            )}
            {categoryChosen === "contentRating" && userRole === "teacher" && (
              <ContentRating Content={Content} />
            )}
          </div>
          <SideBarChosen
            categoryChosen={categoryChosen}
            handleChosen={handleChosen}
            userRole={userRole}
          />
        </div>
      }
    </>
  );
};

export default ChooseCategory;
