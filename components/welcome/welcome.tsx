"use client";
import Image from "next/image";
import brain from "@/public/brain.png";
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
interface WelcomePageProps {
  name: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ name }) => {
  const [displayedText, setDisplayedText] = useState("");
  const text =
    "בברוכים הבאים ל- FluentAI, הדרך החדשה שלך לשליטה באנגלית באמצעות הכוח של AI.<br/> FluentAI מציעה פלטפורמה דינמית ואינטואיטיבית המתאימה לסגנון ולקצב הלמידה האישיים שלך.<br/> בין אתה מתחיל מאפס או מחפש לחדד את כישורי השפה שלך, התרגילים מונעי הבינה המלאכותית שלנו, השיעורים האינטראקטיביים והמשוב בזמן אמת מותאמים כדי להפוך את חווית הלמידה שלך למרתקת ויעילה.<br/> שמחים שהצטרפת ל- FluentAI, על מנת להתחיל את המסע שלך בחר אחת מהאופציות למטה.";

  const speed = 15;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, speed);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center px-2 w-full">
      <div className="relative w-1/2 lg:w-2/5 2xl:w-1/4 animate-pingSmall">
        <Zoom>
          <Image
            src={brain}
            alt={"brainAI"}
            className="rounded-full mx-4"
            layout="responsive"
            width={300}
            height={300}
          />
        </Zoom>
      </div>
      <div
        className="flex flex-col justify-center w-full lg:w-3/5 2xl:w-3/4 mx-2"
        dir="rtl"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-7xl text-darkRed mb-4 sm:mb-8">
          ברוך השב, {name}
        </h1>
        <div
          className="text-xs md:text-base lg:text-lg 2xl:text-xl font-medium text-grayish min-h-52"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        ></div>
      </div>
    </div>
  );
};

export default WelcomePage;
