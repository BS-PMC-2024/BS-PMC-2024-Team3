"use client";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../ui/button";

interface TitleAndButtonProps {
  PageName: string;
}

const TitleAndButton: React.FC<TitleAndButtonProps> = ({ PageName }) => {
  return (
    <>
      <div className="flex justify-between items-center text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
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
        <div
          className="pt-8 text-2xl sm:text-3xl lg:text-5xl text-center text-darkRed mb-4 sm:mb-8"
          dir="rtl"
        >
          {PageName}
        </div>
      </div>
    </>
  );
};

export default TitleAndButton;
