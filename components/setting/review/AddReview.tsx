"use client";
import { Dispatch, SetStateAction, useState } from "react";
import StarRating from "./starRating";
import { Button } from "@/components/ui/button";
import {
  AddReviewToContent,
  AddReviewToTeacher,
} from "@/lib/ServerActions/ServerActions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface AddReviewProps {
  review: number | null | undefined;
  targetId: string | undefined;
  comnnetLabel?: string | null | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reviewType: "teacher" | "content";
}

const AddReview: React.FC<AddReviewProps> = ({
  review,
  targetId,
  comnnetLabel,
  setIsLoading,
  reviewType,
}) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>();
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const handleSaveChanges = async () => {
    if (!rating) {
      return;
    }
    setIsLoading(true);
    if (reviewType === "teacher" && targetId) {
      await AddReviewToTeacher(review != null, rating, targetId);
    } else if (reviewType === "content" && value) {
      await AddReviewToContent(review != null, value, rating, targetId);
    }
    router.refresh();
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col mx-auto py-4 w-full px-2" dir="rtl">
      <h3 className="text-center text-xl sm:text-2xl text-lightRed">
        {reviewType === "teacher"
          ? "בחר דירוג למורה:"
          : "בחר דירוג לתוכן המופק באמצעות בינה מלאכותית:"}
      </h3>
      <div className="flex flex-col items-center my-2 justify-center">
        <StarRating
          rating={rating}
          setRating={setRating}
          setRatingError={setRatingError}
        />
        {ratingError && <div className="text-red-500 text-sm">חסר דירוג</div>}
      </div>
      {!rating ? (
        <>
          {review && (
            <p className="text-center text-xl sm:text-2xl text-darkRed">
              דירוג נוכחי:
              <br />
              {review}/5
            </p>
          )}
        </>
      ) : (
        <>
          {rating && (
            <p className="text-center text-xl sm:text-2xl text-darkRed">
              {rating}/5
            </p>
          )}
        </>
      )}
      {reviewType === "content" && (
        <>
          <h3 className="text-center text-xl sm:text-2xl text-lightRed">
            הוספת הערה:
          </h3>
          <Input
            type="text"
            className="my-1 p-1 sm:-2 border-lightRed text-darkRed w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              comnnetLabel
                ? "הערה נוכחית: " + comnnetLabel
                : "כתוב פה הערה על התוכן המופק באמצעות בינה מלאכותית .."
            }
          />
        </>
      )}
      <div className="flex flex-col items-center justify-center mt-8 ">
        <Button
          variant={"outline"}
          className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
          onClick={() => handleSaveChanges()}
        >
          שמור שינויים
        </Button>
      </div>
    </div>
  );
};

export default AddReview;
