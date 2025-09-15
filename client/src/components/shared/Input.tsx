import clsx from "clsx";
import type { UseFormRegisterReturn } from "react-hook-form";

type InputPros = {
    name?: string;
    label?: string;
    labelColor?: string;
    type?: "text" | "radio" | "range";
    inputFormat?: string;
    placeholder?: string;
    icon?: string;
    checked?: boolean;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    setValueList?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegisterReturn;
    error?: string;
    showError?: boolean;
    required?: boolean;
};

// TODO: css cho input range và radio
function Input({
    name = "",
    label = "",
    labelColor = "",
    type = "text",
    inputFormat = "text",
    placeholder = "",
    value,
    setValue,
    setValueList,
    checked = false,
    register,
    error,
    showError = true,
    required = false,
}: InputPros) {
    return (
        <div className="md:text-md flex flex-col gap-2">
            {label !== "" && (
                <label className={clsx("font-semibold", labelColor)}>
                    {label}
                </label>
            )}

            <input
                name={name}
                type={inputFormat}
                placeholder={placeholder}
                required={required}
                className={clsx(
                    type === "text" &&
                        "focus:ring-focus-input rounded-2xl border border-gray-300 px-4 py-1 text-[16px] focus:ring-3 focus:outline-none md:rounded-4xl md:py-2 md:text-xl",
                    type === "radio" && "",
                    type === "range" && "",
                )}
                checked={type === "radio" ? checked : undefined}
                value={register ? undefined : value}
                onChange={
                    register
                        ? undefined
                        : (e) => {
                              if (setValue) {
                                  setValue(e.target.value);
                              } else if (setValueList) {
                                  setValueList(e);
                              }
                          }
                }
                {...register}
            />

            {type === "text" && showError ? (
                error ? (
                    <p className="min-h-[20px] text-sm text-red-500">{error}</p>
                ) : (
                    // TODO: để xử lý sau
                    // <div className="min-h-[20px]"></div>
                    ""
                )
            ) : (
                ""
            )}
        </div>
    );
}

export default Input;
