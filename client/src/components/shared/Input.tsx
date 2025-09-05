import clsx from "clsx";

type InputPros = {
    name?: string;
    label?: string;
    labelColor?: string;
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
    labelColor = "",
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
        <div className="md:text-md flex flex-col gap-2">
            {label !== "" && (
                <label className={clsx("font-semibold", labelColor)}>
                    {label} {required && "*"}
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
