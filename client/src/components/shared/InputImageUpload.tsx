import type { UseFormRegisterReturn } from "react-hook-form";
import InputForDashboard from "./InputForDashboard";
import imageUpload from "@/assets/images/background/imageUpload.png";

type InputImageUploadPros = {
    id?: string | null;
    image: File | string | null;
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
    let previewSrc = imageUpload;

    if (image instanceof File) {
        previewSrc = URL.createObjectURL(image);
    } else if (typeof image === "string" && image.trim() !== "") {
        previewSrc = `http://localhost:3000/${image}`;
    }

    return (
        <div className="shadow-light space-y-4 rounded-2xl p-2">
            <div className="flex items-center justify-center">
                <img
                    className="h-25 w-25 object-contain"
                    src={previewSrc}
                    alt="image"
                />
            </div>

            <InputForDashboard
                id={id || undefined}
                type="file"
                acceptFile="image/*"
                file={image instanceof File ? image : null}
                setListFile={setListImage}
                register={register}
                error={error}
            />
        </div>
    );
}

export default InputImageUpload;
