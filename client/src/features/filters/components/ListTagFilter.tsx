import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteAllFilter, selectFilter } from "../redux/filter.slice";
import { Dropdown, TagItem } from "@/components/shared";
import { TypeFilter } from "@/constants/typeFilter";

function ListTagFilter() {
    const listFilter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">
                    {/* TODO: cần làm thêm để tự động hiển thị thời gian thực */}
                    Showing 1-12 of 2560 results
                </p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-700">Sort by: </p>

                    <Dropdown />
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
                        className="text-primary font-semibold underline"
                        onClick={() => dispatch(deleteAllFilter())}
                    >
                        Clear All
                    </p>
                )}
            </div>
        </div>
    );
}

export default ListTagFilter;
