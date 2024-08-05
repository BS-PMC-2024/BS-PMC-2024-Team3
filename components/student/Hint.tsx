"use client";
import Image from "next/image";
import BulbIcon from "@/public/selfLearningIcons/BulbIcon.png";
import { Dispatch, SetStateAction, useState } from "react";
import Loading from "../loading";
import { getHint } from "@/lib/openai";

interface HintProps {
  setHintText: Dispatch<SetStateAction<string | undefined>>;
  textForHint: string;
  answerForHint: string | null;
  type: string;
}

const Hint: React.FC<HintProps> = ({
  setHintText,
  textForHint,
  answerForHint,
  type,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleHint = async () => {
    setIsLoading(true);
    const Data = await getHint(textForHint, answerForHint, type);
    if (Data && Data.Hint) {
      setHintText(Data.Hint);
    }
    setIsLoading(false);
  };
  return (
    <div className="relative group flex items-center">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="absolute right-16 -translate-x-full w-max px-2 py-1 bg-lightBeige text-xs sm:text-xs md:text-sm text-darkRed transition-transform duration-500 ease-out group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
            dir="rtl"
          >
            צריך רמז ?
          </div>
          <div className="relative cursor-pointer hover:scale-110 w-8 h-8 md:w-12 md:h-12">
            <Image
              src={BulbIcon}
              alt="BulbIcon"
              layout="fill"
              objectFit="contain"
              className="transition duration-300 ease-in-out group-hover:bg-lightBeige"
              onClick={() => handleHint()}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hint;
