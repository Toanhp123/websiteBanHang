import { TypeFilter } from "@/constants/typeFilter.constants";
import { deleteFilter } from "@/features/filters/redux/filter.slice";
import { useAppDispatch } from "@/hooks/useRedux";
import clsx from "clsx";

type ProsTagItem = {
    text: string | null;
    type?: string;
    isTagOnly?: boolean;
};

function TagItem({
    text,
    type = TypeFilter.ALL,
    isTagOnly = false,
}: ProsTagItem) {
    const dispatch = useAppDispatch();

    // TODO: cần làm sao để xóa thì bên listFilter sẽ chuyển về tất cả
    const handleDeleteFilter = (type: string): void => {
        dispatch(deleteFilter(type));
    };

    return (
        <>
            {!isTagOnly ? (
                <div
                    className={clsx(
                        "bg-secondary rounded-4xl px-4 py-1",
                        text ? "flex items-center gap-2" : "hidden",
                    )}
                >
                    <p className="text-white">{text}</p>
                    <button
                        className="fa-solid fa-x text-[10px] text-white"
                        onClick={() => handleDeleteFilter(type)}
                    ></button>
                </div>
            ) : (
                <div
                    className={clsx(
                        "bg-secondary-light border-secondary text-secondary gap-1 rounded-4xl border px-4 py-1 text-[14px] font-semibold",
                    )}
                >
                    <p>{text}</p>
                </div>
            )}
        </>
    );
}

export default TagItem;
