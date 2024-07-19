import LogoTitle from "@/components/auth/LogoTitle";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen pt-16 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige">
      <div className="">
        <LogoTitle />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
