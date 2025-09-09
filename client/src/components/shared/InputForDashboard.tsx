import clsx from "clsx";
import { useId } from "react";

type InputForDashboardPros = {
    id?: string | null;
    name?: string | null;
    type?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    file?: File | null;
    acceptFile?: string;
    required?: boolean;
    readOnly?: boolean;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    setFile?: React.Dispatch<React.SetStateAction<File | null>>;
    setListFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputForDashboard({
    id = null,
    name = null,
    type = "text",
    label,
    placeholder,
    acceptFile = "",
    value = "",
    file = null,
    required = true,
    readOnly = false,
    setValue,
    setFile,
    setListFile,
}: InputForDashboardPros) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const inputName = name ?? autoId;

    return (
        <div>
            {type !== "file" ? (
                <div className="flex flex-col gap-2">
                    <label className="text-disable font-semibold">
                        {label}
                    </label>

                    <input
                        type={type}
                        className={clsx(
                            "rounded-md bg-gray-100 px-5 py-2",
                            readOnly === true &&
                                "cursor-not-allowed focus:ring-0 focus:outline-none",
                        )}
                        placeholder={placeholder}
                        accept={acceptFile}
                        required={required}
                        value={value}
                        readOnly={readOnly}
                        onChange={(e) => {
                            if (setValue) {
                                setValue(e.target.value);
                            }
                        }}
                    />
                </div>
            ) : (
                <div>
                    <input
                        type={type}
                        id={inputId}
                        name={inputName}
                        className="hidden"
                        onChange={(e) => {
                            if (setFile) {
                                setFile(e.target.files?.[0] || null);
                            } else if (setListFile) {
                                setListFile(e);
                            }
                        }}
                    />

                    <div className="flex items-center gap-4 overflow-hidden rounded-md bg-gray-100">
                        <label
                            htmlFor={inputId}
                            className="bg-main-primary hover:bg-main-secondary cursor-pointer px-4 py-2 text-white"
                        >
                            Chọn file
                        </label>

                        <p className="mr-4 flex-1 truncate">
                            {file ? file.name : "Chưa chọn file"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InputForDashboard;
