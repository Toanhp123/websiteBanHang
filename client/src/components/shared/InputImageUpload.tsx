import type { UseFormRegisterReturn } from "react-hook-form";
import InputForDashboard from "./InputForDashboard";
import imageUpload from "@/assets/images/background/imageUpload.png";

type InputImageUploadPros = {
    id?: string | null;
    image: File | null;
    setListImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegisterReturn;
    error?: string | undefined;
};

function InputImageUpload({
    id = null,
    image,
    setListImage,
    register,
    error,
}: InputImageUploadPros) {
    return (
        <div className="shadow-light space-y-4 rounded-2xl p-2">
            <div className="flex items-center justify-center">
                <img
                    className="h-25 w-25"
                    src={image ? URL.createObjectURL(image) : imageUpload}
                    alt="image"
                />
            </div>

            <InputForDashboard
                id={id}
                type="file"
                acceptFile="image/*"
                file={image}
                setListFile={setListImage}
                register={register}
                error={error}
            />
        </div>
    );
}

export default InputImageUpload;
