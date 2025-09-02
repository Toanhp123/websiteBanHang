type ButtonSidebarDashboardPros = {
    closeSidebar: boolean;
    icon: string;
    text: string;
    onClick: () => void;
};

function ButtonSidebarDashboard({
    closeSidebar,
    icon,
    text,
    onClick,
}: ButtonSidebarDashboardPros) {
    return (
        <div
            className="flex items-center justify-start gap-2"
            onClick={onClick}
        >
            <i className={`${icon} text-disable text-2xl`}></i>
            {!closeSidebar && <p>{text}</p>}
        </div>
    );
}

export default ButtonSidebarDashboard;
