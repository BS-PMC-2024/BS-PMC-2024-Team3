import { useState } from "react";
import UserCard from "../../user/userCard";
import AddReview from "./AddReview";
import Loading from "@/components/loading";
interface ContentRatingProps {
  Content: ContentType | null | undefined;
}

interface ContentType {
  id: string;
  comment: string | null;
  teacherId: string;
  rating: number;
  teacherId: string;
  comment?: string | null;
}

const ContentRating: React.FC<ContentRatingProps> = ({ Content }) => {
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
            דירוג התוכן:
          </h1>
          <div className="flex flex-col items-center justify-center w-full py-4">
            <AddReview
              review={Content?.rating}
              targetId={Content?.id}
              comnnetLabel={Content?.comment}
              setIsLoading={setIsLoading}
              reviewType="content"
            />
          </div>
        </>
      )}
    </>
  );
};
export default ContentRating;