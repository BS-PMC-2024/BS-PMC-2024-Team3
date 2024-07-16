"use client";
import Image from "next/image";
import GrammarIcon from "@/public/selfLearningIcons/GrammarIcon.png";
import OpenQIcon from "@/public/selfLearningIcons/OpenQIcon.png";
import VocabularyIcon from "@/public/selfLearningIcons/VocabularyIcon.png";

interface CategoriesLinksProps {
  isSidebarOpen: boolean;
  categoryChosen: string;
  handleChooesn: (chosenName: string) => void;
}

const CategoriesLinks: React.FC<CategoriesLinksProps> = ({
  isSidebarOpen,
  categoryChosen,
  handleChooesn,
}) => {
  const categories = [
    { name: "vocabulary", label: "אוצר מילים", icon: VocabularyIcon },
    { name: "grammar", label: "דקדוק", icon: GrammarIcon },
    { name: "openQuestions", label: "שאלות פתוחות", icon: OpenQIcon },
  ];
  const handleLink = (categoryName: string) => {
    handleChooesn(categoryName);
  };
  return (
    <div className="space-y-4 sm:space-y-3">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`group flex items-center cursor-pointer border border-lightRed rounded-full w-full px-2 py-0.5  
            ${
              categoryChosen === category.name
                ? "bg-grayish/20 text-black border-current shadow-md hover:scale-105"
                : "hover:scale-105 hover:border-grayish hover:text-grayish"
            }  `}
          onClick={() => handleLink(category.name)}
        >
          {category.label}
          <Image
            src={category.icon}
            alt={`${category.name}Icon`}
            height={25}
            width={25}
            className={`p-1 sm:mx-2 sm:scale-150 group-hover:filter-none ${
              categoryChosen === category.name ? "filter-none" : "icon-color"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoriesLinks;
