import clsx from "clsx";

type ButtonPros = {
    loading?: boolean;
    text?: string;
    textColor?: string;
    textSize?: "big" | "small";
    icon?: string;
    iconBefore?: boolean;
    bgColor?: string;
    hoverColor?: string;
    textColorHover?: string;
    border?: string;
    borderColor?: string;
    type?: "big" | "small" | "icon";
    disabled?: boolean;
    onClick?: () => Promise<void> | void;
};

function Button({
    loading = false,
    text = "",
    textColor = "text-white",
    textSize = "big",
    icon = "",
    iconBefore = true,
    bgColor = "bg-primary",
    hoverColor = "hover:bg-secondary",
    textColorHover = "hover:text-white",
    border = "border",
    borderColor = "black",
    type = "big",
    disabled = false,
    onClick,
}: ButtonPros) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "disabled:bg-disable flex items-center justify-center font-semibold",
                type === "big" &&
                    "w-full gap-2 rounded-2xl border-gray-300 p-[5px] px-4 md:rounded-4xl md:py-2",
                type === "small" && "gap-1 rounded-4xl px-4 py-2 text-[14px]",
                type === "icon" && "h-10 w-10 rounded-full",
                textSize === "big" && "md:text-xl",
                textSize === "small" && "",
                border,
                borderColor,
                textColor,
                bgColor,
                hoverColor,
                textColorHover,
            )}
            disabled={disabled}
        >
            {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
            ) : iconBefore ? (
                <>
                    {icon !== "" && <i className={icon}></i>}
                    {text !== "" && <p>{text}</p>}
                </>
            ) : (
                <>
                    {text !== "" && <p>{text}</p>}
                    {icon !== "" && <i className={icon}></i>}
                </>
            )}
        </button>
    );
}

export default Button;
