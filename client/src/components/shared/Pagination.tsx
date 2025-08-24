import PaginationButton from "./PaginationButton";

type ProsPagination = {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ currentPage, totalPages, setPage }: ProsPagination) {
    const delta = 1; // số trang 2 bên
    const range = [];

    for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
    ) {
        range.push(i);
    }

    if (currentPage - delta > 2) {
        range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
        range.push("...");
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <PaginationButton
                setPage={setPage}
                text={-1}
                disable={currentPage === 1}
                icon="fa-solid fa-arrow-left"
            />

            <PaginationButton
                disable={currentPage === 1}
                currentPage={currentPage}
                setPage={setPage}
                text={1}
            />

            {range.map((item, index) => {
                if (typeof item === "number") {
                    return (
                        <PaginationButton
                            key={index}
                            disable={currentPage === item}
                            currentPage={currentPage}
                            setPage={setPage}
                            text={item}
                        />
                    );
                } else {
                    return (
                        <div key={index} className="font-semibold">
                            {item}
                        </div>
                    );
                }
            })}

            {totalPages > 1 && (
                <PaginationButton
                    disable={currentPage === totalPages}
                    currentPage={currentPage}
                    setPage={setPage}
                    text={totalPages}
                />
            )}

            <PaginationButton
                setPage={setPage}
                text={1}
                disable={currentPage === totalPages}
                icon="fa-solid fa-arrow-right"
            />
        </div>
    );
}

export default Pagination;
