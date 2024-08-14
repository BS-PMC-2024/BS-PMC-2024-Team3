"use client";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import AcademicCapIcon from "@heroicons/react/24/outline/AcademicCapIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";

interface CategoriesLinksProps {
  isSidebarOpen: boolean;
  categoryChosen: string;
  handleChosen: (chosenName: string) => void;
  userRole: "student" | "teacher" | "admin";
}

const CategoriesLinks: React.FC<CategoriesLinksProps> = ({
  isSidebarOpen,
  categoryChosen,
  handleChosen,
  userRole,
}) => {
  userRole;
  const handleLink = (categoryName: string) => {
    handleChosen(categoryName);
  };

  const getCategories = () => {
    switch (userRole) {
      case "student":
        return [
          { name: "profile", label: "פרופיל", icon: UserCircleIcon },
          { name: "teacher", label: "מורה", icon: AcademicCapIcon },
        ];
      case "teacher":
        return [
          { name: "profile", label: "פרופיל", icon: UserCircleIcon },
          { name: "contentRating", label: "דירוג תוכן", icon: ChartBarIcon },
        ];
      case "admin":
        return [{ name: "profile", label: "פרופיל", icon: UserCircleIcon }];
      default:
        return [];
    }
  };
  const categories = getCategories();

  return (
    <div className="space-y-4 sm:space-y-3">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`group flex items-center justify-center cursor-pointer border border-lightRed rounded-full w-full px-2 py-0.5  
            ${
              categoryChosen === category.name
                ? "bg-grayish/20 text-black border-current shadow-md hover:scale-105"
                : "hover:scale-105 hover:border-grayish hover:text-grayish"
            }  `}
          onClick={() => handleLink(category.name)}
        >
          {category.label}
          <category.icon className="h-8 w-8 mx-2" />
        </div>
      ))}
    </div>
  );
};

export default CategoriesLinks;
