import InputForDashboard from "./InputForDashboard";
import imageUpload from "@/assets/images/background/imageUpload.png";

type InputImageUploadPros = {
    id?: string | null;
    required?: boolean;
    image: File | null;
    setImage?: React.Dispatch<React.SetStateAction<File | null>>;
    setListImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputImageUpload({
    id = null,
    required = true,
    image,
    setImage,
    setListImage,
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
                required={required}
                type="file"
                acceptFile="image/*"
                setFile={setImage}
                file={image}
                setListFile={setListImage}
            />
        </div>
    );
}

export default InputImageUpload;
