import clsx from "clsx";
import { useId } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type InputForDashboardPros = {
    id?: string | null;
    name?: string | null;
    type?: string;
    label?: string;
    placeholder?: string;
    file?: File | null;
    acceptFile?: string;
    readOnly?: boolean;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    setFile?: React.Dispatch<React.SetStateAction<File | null>>;
    setListFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegisterReturn;
    error?: string;
};

function InputForDashboard({
    id = null,
    name = null,
    type = "text",
    label,
    placeholder,
    acceptFile = "",
    file = null,
    value,
    setValue,
    readOnly = false,
    setFile,
    setListFile,
    error,
    register,
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
                        readOnly={readOnly}
                        value={register ? undefined : value}
                        onChange={
                            register
                                ? undefined
                                : (e) => setValue?.(e.target.value)
                        }
                        {...register}
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}
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
