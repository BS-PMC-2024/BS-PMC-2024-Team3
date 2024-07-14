import Link from "next/link";
import Image from "next/image";
import LogoHorizontal from "@/public/logos/LogoHorizontal.png";

const LogoButton = () => {
  return (
    <>
      <Link href={"/"}>
        <Image
          src={LogoHorizontal}
          alt={"LogoHorizontal"}
          priority={true}
          width={140}
          height={140}
        />
      </Link>
    </>
  );
};

export default LogoButton;
