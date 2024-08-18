"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ReactElement } from "react";
import { Zoom } from "react-awesome-reveal";

interface CardWrapperProps {
  Icon: ReactElement;
  headerTitle: string;
  urlPath: string;
  badgeContent?: number;
}

export const CardWrapper = ({
  Icon,
  headerTitle,
  urlPath,
  badgeContent,
}: CardWrapperProps) => {
  return (
    <Zoom>
      <Link href={urlPath} passHref>
        <div className="relative transform transition-transform duration-300 hover:scale-105">
          {badgeContent !== undefined && badgeContent > 0 && (
            <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-1/2 bg-mediumBeige border border-darkRed rounded-full px-3 py-1 text-darkRed text-base z-[100]">
              {badgeContent}
            </div>
          )}
          <Card className="w-64 h-32 lg:w-72 lg:h-40 bg-mediumBeige my-2 mx-2 text-grayish shadow-md border-grayish hover:border-lightRed hover:text-lightRed hover:shadow-2xl hover:brightness-110">
            <CardContent
              dir="rtl"
              className="flex justify-center items-center gap-2 h-full p-2"
            >
              <h2 className="text-md md:text-lg lg:text-xl whitespace-nowrap">
                {headerTitle}
              </h2>
              {Icon}
            </CardContent>
          </Card>
        </div>
      </Link>
    </Zoom>
  );
};
