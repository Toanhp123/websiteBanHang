import clsx from "clsx";

type ButtonPros = {
    text?: string;
    textColor?: string;
    icon?: string;
    iconBefore?: boolean;
    bgColor?: string;
    hoverColor?: string;
    border?: string;
    size?: string;
    onClick?: () => Promise<void> | void;
};

function Button({
    text = "",
    textColor = "text-white",
    icon = "",
    iconBefore = true,
    bgColor = "bg-primary",
    hoverColor = "hover:bg-secondary",
    border = "border",
    size = "big",
    onClick,
}: ButtonPros) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex items-center justify-center font-semibold",
                size === "big" &&
                    "w-full gap-2 rounded-2xl border-gray-300 p-[5px] px-4 md:rounded-4xl md:py-2 md:text-xl",
                size === "small" && "gap-1 rounded-4xl px-4 py-2 text-[14px]",
                border,
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
