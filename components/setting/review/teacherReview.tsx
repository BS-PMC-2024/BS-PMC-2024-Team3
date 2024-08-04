import { useState } from "react";
import UserCard from "../../user/userCard";
import AddReview from "./AddReview";
import Loading from "@/components/loading";

interface TeacherReviewProps {
  teacher: TeacherWithScore | null | undefined;
}

interface TeacherWithScore {
  id: string;
  name: string | null;
  image: string | null;
  score: number | null;
}

const TeacherReview: React.FC<TeacherReviewProps> = ({ teacher }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl text-grayish" dir="rtl">
            דירוג מורה
          </h1>
          <div className="flex flex-col items-center justify-center w-full py-4">
            {teacher?.name && (
              <UserCard name={teacher?.name} image={teacher?.image} />
            )}
            <AddReview
              review={teacher?.score}
              targetId={teacher?.id}
              setIsLoading={setIsLoading}
              reviewType="teacher"
            />
          </div>
        </>
      )}
    </>
  );
};

export default TeacherReview;
