import { Input } from "@/components/shared";
import type { ItemFilter } from "../types/filter.type";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { deleteFilter, setListFilter } from "../redux/filter.slice";
import { TypeFilter } from "@/constants/typeFilter";

function ItemFilterOption<T extends object>({
    title,
    options,
    optionsType,
    idGetter,
    nameGetter,
    type = "list",
}: ItemFilter<T>) {
    // TODO: cần cải thiện lại biến selectName
    const [selectName, setSelectName] = useState<string>(TypeFilter.ALL);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectName === TypeFilter.ALL) {
            dispatch(deleteFilter(optionsType));
        } else {
            dispatch(setListFilter({ selectName, optionsType }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectName]);

    return (
        <div className="mb-6">
            <div className="border-b border-gray-200"></div>

            <div className="mt-4 space-y-2">
                <p className="text-xl font-semibold">{title}</p>

                {type === "list" && (
                    <ul className="max-h-30 overflow-y-scroll">
                        <label className="flex items-center gap-2">
                            <Input
                                type="radio"
                                inputFormat="radio"
                                value={TypeFilter.ALL}
                                checked={selectName === TypeFilter.ALL}
                                setValue={setSelectName}
                            />

                            <p className="font-semibold text-gray-700">
                                Tất cả
                            </p>
                        </label>

                        {options.map((item) => {
                            const name = nameGetter(item);
                            const id = idGetter(item);

                            return (
                                <li key={id}>
                                    <label className="flex items-center gap-2">
                                        <Input
                                            type="radio"
                                            inputFormat="radio"
                                            value={name}
                                            checked={selectName === name}
                                            setValue={setSelectName}
                                        />

                                        <p className="font-semibold text-gray-700">
                                            {name}
                                        </p>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {type === "slide" && (
                    <div>
                        <p>$25.00 - $100.00</p>
                        <input type="range" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemFilterOption;
