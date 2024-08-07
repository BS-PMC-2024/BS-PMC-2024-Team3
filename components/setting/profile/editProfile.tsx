import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateUserDetails } from "@/lib/ServerActions/ServerActions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface EditProfileProps {
  imagePreviewUrl: string;
  setImagePreviewUrl: Dispatch<SetStateAction<string>>;
  name: string | null;
  setName: Dispatch<SetStateAction<string | null>>;
  handleEditImage: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  imagePreviewUrl,
  setImagePreviewUrl,
  name,
  setName,
  handleEditImage,
}) => {
  const [ErrorName, setErrorName] = useState<boolean>(false);
  const [ErrorImage, setErrorImage] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(
    imagePreviewUrl
  );
  const [currentName, setCurrentName] = useState<string | null>(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      setImagePreviewUrl(e.target.value);
      setErrorImage(false);
    } else if (e.target.name === "name") {
      setName(e.target.value);
      setErrorName(false);
    }
  };

  const validURL = (str: string) => {
    return /^(https?:\/\/)?(([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3})(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
      str.trim()
    );
  };

  const handleSaveChanges = async () => {
    let valid = true;
    let updateNeeded = false;
    if (!name) {
      setErrorName(true);
      valid = false;
    }
    if (imagePreviewUrl && !validURL(imagePreviewUrl)) {
      setErrorImage(true);
      valid = false;
    }
    const nameChanged = currentName !== name;
    const imageChanged = currentImage !== imagePreviewUrl;
    updateNeeded = nameChanged || imageChanged;

    if (valid && updateNeeded) {
      await UpdateUserDetails(
        nameChanged ? name : null,
        imageChanged ? imagePreviewUrl : null
      );
      signOut();
    }
  };

  return (
    <>
      <div className="flex flex-col w-full sm:w-3/5 mt-4 mx-auto" dir="rtl">
        <div className="flex justify-between">
          <div className="text-base sm:text-xl text-darkRed">ערוך פרופיל </div>
          <XMarkIcon
            className="h-7 w-7 text-lightRed hover:brightness-110 hover:scale-125 cursor-pointer"
            onClick={handleEditImage}
          />
        </div>
        <Label className="text-base text-grayish">קישור לתמונה</Label>
        <Input
          id="image"
          type="text"
          name="image"
          className="p-1 sm:-2 border-mediumBeige text-darkRed"
          value={imagePreviewUrl || ""}
          onChange={handleChange}
        />
        {ErrorImage ? (
          <p className="text-sm text-red-600">הכנס קישור תקין</p>
        ) : null}
        <Label className="text-base text-grayish">שם מלא</Label>
        <Input
          id="name"
          type="text"
          name="name"
          className="p-1 sm:-2 border-mediumBeige text-darkRed"
          value={name || ""}
          onChange={handleChange}
        />
        {ErrorName ? (
          <p className="text-sm text-red-600">
            הכנס שם מלא תקין (שם ושם משפחה)
          </p>
        ) : null}
        <div className="flex flex-col items-center justify-center mt-8 ">
          <Button
            variant={"outline"}
            className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
            onClick={() => handleSaveChanges()}
          >
            שמור שינויים
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
