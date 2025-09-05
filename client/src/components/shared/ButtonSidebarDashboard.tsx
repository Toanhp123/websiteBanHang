import clsx from "clsx";

type ListOption = {
    text: string;
    func: () => void;
};

type ButtonSidebarDashboardPros = {
    closeSidebar: boolean;
    icon: string;
    text: string;
    menu?: boolean;
    closeMenu?: boolean;
    listOption?: ListOption[];
    onClick: () => void;
};

function ButtonSidebarDashboard({
    closeSidebar,
    icon,
    text,
    menu = false,
    closeMenu = false,
    listOption = [],
    onClick,
}: ButtonSidebarDashboardPros) {
    return (
        <div>
            <button
                className={clsx(
                    "flex h-full w-full rounded-xl px-6 py-3 hover:cursor-pointer hover:bg-gray-300",
                    menu && "justify-between",
                )}
                onClick={onClick}
            >
                <div className="flex gap-2">
                    <i className={`${icon} text-disable text-2xl`}></i>
                    {!closeSidebar && <p>{text}</p>}
                </div>

                {menu &&
                    !closeSidebar &&
                    (closeMenu ? (
                        <i className="fa-solid fa-sort-down"></i>
                    ) : (
                        <i className="fa-solid fa-sort-up pt-2"></i>
                    ))}
            </button>

            {menu && !closeMenu && (
                <ul
                    className={clsx(
                        "mt-1 list-disc space-y-4 pl-16",
                        closeSidebar ? "hidden" : "block",
                    )}
                >
                    {listOption.map((option, index) => (
                        <li
                            key={index}
                            className="text-start hover:cursor-pointer hover:text-gray-400"
                            onClick={option.func}
                        >
                            {option.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ButtonSidebarDashboard;
