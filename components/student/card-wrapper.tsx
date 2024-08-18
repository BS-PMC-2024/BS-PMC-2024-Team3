"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardWrapperProps {
  image: StaticImageData;
  headerTitle: string;
  urlPath: string;
  badgeContent?: number;
}

export const CardWrapper = ({
  image,
  headerTitle,
  urlPath,
  badgeContent,
}: CardWrapperProps) => {
  return (
    <Link href={urlPath} passHref>
      <div className="relative transform transition-transform duration-300 hover:scale-105">
        {badgeContent !== undefined && badgeContent > 0 && (
          <div className="absolute top-0 right-0 transform -translate-y-1/2 -translate-x-1/2 bg-mediumBeige border border-darkRed rounded-full px-3 py-1 text-darkRed text-base z-[100]">
            {badgeContent}
          </div>
        )}
        <Card className="w-40 sm:w-64 h-32 lg:w-72 lg:h-40 bg-mediumBeige m-4 sm:m-6 text-grayish shadow-md border-grayish hover:border-lightRed hover:text-lightRed hover:shadow-2xl hover:brightness-110">
          <CardContent
            dir="rtl"
            className="flex justify-between items-center h-full p-2"
          >
            <h2 className="text-sm md:text-lg lg:text-xl whitespace-nowrap">
              {headerTitle}
            </h2>

            <Image
              src={image}
              alt={headerTitle}
              priority={true}
              width={200}
              height={200}
              className="scale-75 sm:scale-100"
            />
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};
