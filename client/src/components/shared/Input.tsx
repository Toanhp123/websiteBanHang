import clsx from "clsx";

type InputPros = {
    name?: string;
    label?: string;
    type?: "text" | "radio" | "range";
    inputFormat?: string;
    placeholder?: string;
    required?: boolean;
    icon?: string;
    checked?: boolean;
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    setValueList?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// TODO: css cho input range và radio
function Input({
    name = "",
    label = "",
    type = "text",
    inputFormat = "text",
    placeholder = "",
    required = false,
    value = "",
    setValue,
    setValueList,
    checked = false,
}: InputPros) {
    return (
        <div className="flex flex-col gap-2 md:text-xl">
            {label !== "" && (
                <label className="font-semibold">
                    {label} {required ? "*" : "(Optional)"}
                </label>
            )}

            <input
                name={name}
                type={inputFormat}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    if (setValue) {
                        setValue(e.target.value);
                    } else if (setValueList) {
                        setValueList(e);
                    }
                }}
                className={clsx(
                    type === "text" &&
                        "focus:ring-focus-input rounded-2xl border border-gray-300 px-4 py-1 text-[16px] focus:ring-3 focus:outline-none md:rounded-4xl md:py-2 md:text-xl",
                    type === "radio" && "",
                    type === "range" && "",
                )}
                required={required}
                checked={checked}
            />
        </div>
    );
}

export default Input;
