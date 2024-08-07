import React, { useState } from "react";

interface StarRatingProps {
  rating: number | undefined;
  setRating: (rating: number) => void;
  setRatingError: (ratingError: boolean) => void;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  setRatingError,
  totalStars = 5,
}) => {
  const [hover, setHover] = useState<number>(0);
  const handleStarClick = (ratingValue: number) => {
    setRating(ratingValue);
    setRatingError(false);
  };

  const handleMouseLeave = () => {
    if (rating === undefined) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            className={
              ratingValue <= ((rating ?? 0) || hover)
                ? "text-yellow-500"
                : "text-gray-400"
            }
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-3xl">★</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
