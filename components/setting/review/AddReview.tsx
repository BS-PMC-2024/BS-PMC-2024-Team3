"use client";
import { Dispatch, SetStateAction, useState } from "react";
import StarRating from "./starRating";
import { Button } from "@/components/ui/button";
import { AddReviewToTeacher } from "@/lib/ServerActions/ServerActions";
import {
  AddReviewToContent,
  AddReviewToTeacher,
} from "@/lib/ServerActions/ServerActions";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

@@ -26,22 +29,24 @@ const AddReview: React.FC<AddReviewProps> = ({
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const handleSaveChanges = async () => {
    if (!rating || !targetId) {
    if (!rating) {
      return;
    }
    setIsLoading(true);
    if (reviewType === "teacher") {
    if (reviewType === "teacher" && targetId) {
      await AddReviewToTeacher(review != null, rating, targetId);
    } else if (reviewType === "content") {
      // await AddReviewToContent(review != null, rating, targetId);
    } else if (reviewType === "content" && value) {
      await AddReviewToContent(review != null, value, rating, targetId);
    }
    router.refresh();
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col mx-auto py-4 w-full px-2" dir="rtl">
      <h3 className="text-center text-xl sm:text-2xl text-lightRed">
        {reviewType === "teacher" ? "בחר דירוג למורה:" : "בחר דירוג לתוכן:"}
        {reviewType === "teacher"
          ? "בחר דירוג למורה:"
          : "בחר דירוג לתוכן המופק באמצעות בינה מלאכותית:"}
      </h3>
      <div className="flex flex-col items-center my-2 justify-center">
        <StarRating
@@ -52,11 +57,15 @@ const AddReview: React.FC<AddReviewProps> = ({
        {ratingError && <div className="text-red-500 text-sm">חסר דירוג</div>}
      </div>
      {!rating ? (
        <p className="text-center text-xl sm:text-2xl text-darkRed">
          דירוג נוכחי:
          <br />
          {review}/5
        </p>
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
@@ -78,7 +87,7 @@ const AddReview: React.FC<AddReviewProps> = ({
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              comnnetLabel
                ? comnnetLabel
                ? "הערה נוכחית: " + comnnetLabel
                : "כתוב פה הערה על התוכן המופק באמצעות בינה מלאכותית .."
            }
          /></AddReviewProps>