import UserCard from "@/components/user/userCard";
import { IdentificationIcon } from "@heroicons/react/24/outline";
interface StudentCardProps {
  name: string | null;
  image: string | null;
  email: string | null;
}

const StudentCard: React.FC<StudentCardProps> = ({ name, image, email }) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-4 items-center w-2/3 mx-auto bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg shadow-xl backdrop-blur">
        <div
          className="absolute right-1 top-1 flex itesm-center text-sm md:text-base text-darkRed whitespace-nowrap"
          dir="rtl"
        >
          פרטי התלמיד
          <span className="flex items-center mx-2">
            <IdentificationIcon className="w-5 h-5" />
          </span>
        </div>
        <div
          className="flex flex-col text-sm md:text-base text-darkRed mb-1 sm:mb-2 whitespace-nowrap"
          dir="rtl"
        >
          <div className="mb-1 sm:mb-2">שם התלמיד: {name}</div>
          <div className="mb-1 sm:mb-2 font-medium ">
            מייל:
            <a href={`mailto:${email}`} className="underline">
              {" "}
              {email}
            </a>
          </div>
        </div>
        <div className="relative right-0 my-8 mx-2">
          <UserCard name={null} image={image} />
        </div>
      </div>
    </>
  );
};

export default StudentCard;
