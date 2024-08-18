import { useState } from "react";
import { Rating } from "@prisma/client";
import UserCard from "../user/userCard";
import { Fade } from "react-awesome-reveal";

interface TeacherRatingType {
  rating: Rating[] | null;
}

interface TeacherReviewListProps {
  Teachers: {
    id: string;
    name: string | null;
    image: string | null;
    teacher: TeacherRatingType | null;
  }[];
  searchTerm: string;
}

const TeacherReviewList: React.FC<TeacherReviewListProps> = ({
  Teachers,
  searchTerm,
}) => {
  const [TeacherReviewList, setTeacherReviewList] = useState(Teachers);
  const calculateAverageRating = (ratings: Rating[] | null): number => {
    if (!ratings || ratings.length === 0) return 0;
    const totalScore = ratings.reduce(
      (acc, currentRating) => acc + currentRating.score,
      0
    );
    return totalScore / ratings.length;
  };

  const formatRatingDisplay = (rating: number): string => {
    if (Math.floor(rating) === rating) {
      return rating.toString();
    }
    return rating.toFixed(1);
  };

  return (
    <div className="rounded-2xl border border-grayish my-4 shadow-grayish shadow-xl p-1 sm:p-2 lg:p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {TeacherReviewList.filter(
          (teacher) => teacher.name && teacher.name.includes(searchTerm)
        ).map((teacher) => (
          <>
            <Fade>
              <div className="flex flex-col items-center w-full md:w-auto">
                {teacher?.name && (
                  <UserCard name={teacher?.name} image={teacher?.image} />
                )}
                <div className="flex flex-col items-center justify-center">
                  {teacher.teacher && teacher.teacher.rating && (
                    <>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => {
                          const ratingValue = index + 1;
                          return (
                            <span
                              key={index}
                              className={
                                ratingValue <=
                                Math.round(
                                  calculateAverageRating(
                                    teacher.teacher
                                      ? teacher.teacher.rating
                                      : null
                                  )
                                )
                                  ? "text-3xl text-yellow-500"
                                  : "text-3xl text-gray-400"
                              }
                            >
                              ★
                            </span>
                          );
                        })}
                      </div>
                      <p className="text-center text-lg md:text-xl text-darkRed">
                        דירוג נוכחי:{" "}
                        {formatRatingDisplay(
                          calculateAverageRating(teacher.teacher.rating)
                        )}
                        /5
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Fade>
          </>
        ))}
      </div>
    </div>
  );
};

export default TeacherReviewList;
