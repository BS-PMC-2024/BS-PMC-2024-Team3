"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardWrapperProps {
  image: StaticImageData;
  headerTitle: string;
  urlPath: string;
}

export const CardWrapper = ({
  image,
  headerTitle,
  urlPath,
}: CardWrapperProps) => {
  return (
    <Link href={urlPath} passHref>
      <div className="transform transition-transform duration-300 hover:scale-105">
        <Card className="w-64 h-32 lg:w-72 lg:h-40 bg-mediumBeige my-4 mx-12 text-grayish shadow-md border-grayish hover:border-lightRed hover:text-lightRed hover:shadow-2xl hover:brightness-110">
          <CardContent
            dir="rtl"
            className="flex justify-between items-center h-full p-2"
          >
            <h2 className="text-md md:text-lg lg:text-xl whitespace-nowrap">
              {headerTitle}
            </h2>

            <Image
              src={image}
              alt={headerTitle}
              priority={true}
              width={200}
              height={200}
              className=""
            />
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};
