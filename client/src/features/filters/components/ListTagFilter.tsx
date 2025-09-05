import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteAllFilter, selectFilter } from "../redux/filter.slice";
import { DropdownSortProduct, TagItem } from "@/components/shared";
import { TypeFilter } from "@/constants/typeFilter.constants";

function ListTagFilter() {
    const listFilter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    // TODO: cần làm sao để xóa thì bên listFilter sẽ chuyển về tất cả
    const handleDeleteFilterOption = () => {
        dispatch(deleteAllFilter());
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">
                    {/* TODO: cần làm thêm để tự động hiển thị thời gian thực */}
                    Showing 1-12 of 2560 results
                </p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-700">Sort by: </p>

                    <DropdownSortProduct />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-700">Active Filter:</p>

                <div className="flex gap-2">
                    {Object.entries(listFilter)
                        .filter(([_, value]) => value !== TypeFilter.ALL)
                        .map(([key, value]) => (
                            <TagItem key={key} text={value} type={key} />
                        ))}
                </div>

                {Object.entries(listFilter)
                    .filter(([_, value]) => value !== TypeFilter.ALL)
                    .some((value) => value[1] !== null && value[1] !== "") && (
                    <p
                        className="text-main-primary font-semibold underline"
                        onClick={handleDeleteFilterOption}
                    >
                        Clear All
                    </p>
                )}
            </div>
        </div>
    );
}

export default ListTagFilter;
