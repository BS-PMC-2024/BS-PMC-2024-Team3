import Link from "next/link";
import Image from "next/image";
import LogoVertical from "@/public/logos/LogoVertical.png";

const LogoTitle = () => {
  return (
    <>
      <Link href={"/"}>
        <Image
          src={LogoVertical}
          alt={"LogoTitle"}
          priority={true}
          width={210}
          height={210}
        />
      </Link>
    </>
  );
};

export default LogoTitle;
