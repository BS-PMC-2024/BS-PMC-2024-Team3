"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../ui/button";

interface TitleAndButtonProps {
  PageName: string;
  PreviousPageUrl?: string;
  PreviousPageName?: string;
  SubTitle?: boolean;
}

const TitleAndButton: React.FC<TitleAndButtonProps> = ({
  PageName,
  PreviousPageUrl,
  PreviousPageName,
  SubTitle,
}) => {
  return (
    <>
      <div className="flex justify-between items-center text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        {PreviousPageName && PreviousPageUrl ? (
          <Link href={PreviousPageUrl}>
            <Button
              variant={"outline"}
              className="bg-transparent border-lightRed hover:bg-mediumBeige text-lightRed hover:text-black"
            >
              <ArrowUturnLeftIcon width={22} height={22} className="mr-1" />
              <div className="hidden md:block">חזרה ל{PreviousPageName} </div>
              <div className="block md:hidden">חזרה</div>
            </Button>
          </Link>
        ) : (
          <Link href={"/"}>
            <Button
              variant={"outline"}
              className="bg-transparent border-lightRed hover:bg-mediumBeige text-lightRed hover:text-black"
            >
              <ArrowUturnLeftIcon width={22} height={22} className="mr-1" />
              <div className="hidden md:block">חזרה לדף ראשי </div>
              <div className="block md:hidden">חזרה </div>
            </Button>
          </Link>
        )}
        <div
          className={`${
            !SubTitle
              ? `text-lg sm:text-3xl lg:text-5xl`
              : `text-lg sm:text-3xl`
          } text-center text-darkRed`}
          dir="rtl"
        >
          {PageName}
        </div>
      </div>
    </>
  );
};

export default TitleAndButton;
