type DropdownPros = {
    options: { id: number | string; name: string }[];
    text: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

function Dropdown({ options, text, value, setValue }: DropdownPros) {
    return (
        <div className="relative flex flex-col gap-2">
            <label className="">{text}</label>

            <select
                className="h-10 w-full appearance-none rounded-md bg-gray-100 px-4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option value={0}>-- Select {text} --</option>
                {options?.map((option) => (
                    <option
                        className="rounded-2xl"
                        key={option.id}
                        value={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>

            {/* Icon custom */}
            <span className="pointer-events-none absolute top-1/2 right-3 translate-y-1/30 text-gray-500">
                <i className="fa-solid fa-sort-down"></i>
            </span>
        </div>
    );
}

export default Dropdown;
