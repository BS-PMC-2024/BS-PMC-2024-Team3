import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const WaitForApprovedCard = () => {
  return (
    <CardWrapper
      headerLabel="אנא המתן לאישור מנהל האתר"
      headerTitle="!לא ניתן להתחבר כעת"
      backButtonHref="/waitforapprove"
      backButtonLabel="מנהל האתר אישר אותך? לחץ כאן לרענון"
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
