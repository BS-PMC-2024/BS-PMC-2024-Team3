"use client";
import { useState } from "react";
import GrammarContent from "./grammar/grammarContent";
import OpenQuestionsContent from "./open-questions/openQuestionsContent";
import SideBarChosen from "./side-bar-chosen";

const ChooseCategory = () => {
  const [categoryChosen, setCategoryChosen] = useState<string>("");

  const handleChooesn = (ChosenName: string) => {
    setCategoryChosen(ChosenName);
  };

  return (
    <>
      {
        <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
          <div className="min-h-screen md:min-h-[500px] flex-grow mx-2">
            {/* {categoryChosen === "vocabulary" && <VocabularyContent />} */}
            {categoryChosen === "grammar" && <GrammarContent />}
            {categoryChosen === "openQuestions" && <OpenQuestionsContent />}
          </div>
          <SideBarChosen
            categoryChosen={categoryChosen}
            handleChooesn={handleChooesn}
          />
        </div>
      }
    </>
  );
};

export default ChooseCategory;
