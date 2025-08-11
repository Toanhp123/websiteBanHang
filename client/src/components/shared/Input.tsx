type SetValue<T> = {
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
};

type InputPros = {
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
};

function Input({
    label = "",
    type = "text",
    placeholder = "",
    required = false,
    value,
    setValue,
}: InputPros & SetValue<string>) {
    return (
        <div className="flex flex-col gap-2 md:text-xl">
            {label !== "" && (
                <label className="font-semibold">
                    {label} {required && "*"}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="focus:ring-focus-input rounded-2xl border border-gray-300 px-4 py-1 text-[16px] focus:ring-3 focus:outline-none md:rounded-4xl md:py-2 md:text-xl"
                required={required}
            />
        </div>
    );
}

export default Input;
