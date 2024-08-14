import UserCard from "@/components/user/userCard";
import { IdentificationIcon } from "@heroicons/react/24/outline";
interface TeacherCardProps {
  name: string | null;
  image: string | null;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ name, image }) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-4 items-center w-5/6 md:w-2/3 mx-auto bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg shadow-xl backdrop-blur">
        <div
          className="absolute right-1 top-1 flex itesm-center text-sm md:text-base text-darkRed whitespace-nowrap"
          dir="rtl"
        >
          פרטי המורה המלמד
          <span className="flex items-center mx-2">
            <IdentificationIcon className="w-5 h-5" />
          </span>
        </div>
        <div
          className="flex flex-col text-sm md:text-base text-darkRed mb-1 sm:mb-2 whitespace-nowrap"
          dir="rtl"
        >
          <div className="mb-1 sm:mb-2">שם המורה: {name}</div>
        </div>
        <div className="relative right-0 my-8 mx-2">
          <UserCard name={null} image={image} />
        </div>
      </div>
    </>
  );
};

export default TeacherCard;
