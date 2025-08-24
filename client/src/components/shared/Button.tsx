import clsx from "clsx";

type ButtonPros = {
    text?: string;
    textColor?: string;
    textSize?: "big" | "small";
    icon?: string;
    iconBefore?: boolean;
    bgColor?: string;
    hoverColor?: string;
    border?: string;
    borderColor?: string;
    type?: "big" | "small" | "icon";
    onClick?: () => Promise<void> | void;
};

function Button({
    text = "",
    textColor = "text-white",
    textSize = "big",
    icon = "",
    iconBefore = true,
    bgColor = "bg-primary",
    hoverColor = "hover:bg-secondary",
    border = "border",
    borderColor = "black",
    type = "big",
    onClick,
}: ButtonPros) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex items-center justify-center font-semibold",
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
            )}
        >
            {iconBefore ? (
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
