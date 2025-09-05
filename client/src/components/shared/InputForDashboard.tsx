import clsx from "clsx";

type InputForDashboardPros = {
    type?: string;
    label?: string;
    placeholder?: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

function InputForDashboard({
    type,
    label,
    placeholder,
    value,
    setValue,
}: InputForDashboardPros) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-disable font-semibold">{label}</label>

            <input
                type={type}
                className={clsx("rounded-md bg-gray-100 px-5 py-2")}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default InputForDashboard;
