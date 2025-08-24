import clsx from "clsx";

type ProsPaginationButton = {
    text: number;
    icon?: string;
    disable: boolean | undefined;
    currentPage?: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

function PaginationButton({
    text,
    icon = "",
    disable,
    currentPage = 0,
    setPage,
}: ProsPaginationButton) {
    const handleSetPage = (currentPage: number, page: number): void => {
        if (currentPage !== 0) {
            setPage(page);
        } else {
            setPage((page) => page + text);
        }
    };

    return (
        <button
            className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-full font-semibold",
                text === currentPage && "bg-primary text-white",
            )}
            disabled={disable}
            onClick={() => handleSetPage(currentPage, text)}
        >
            {!icon ? text : <i className={icon}></i>}
        </button>
    );
}

export default PaginationButton;
