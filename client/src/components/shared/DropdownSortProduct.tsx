import { setOption } from "@/features/filters/redux/optionSortProduct.slice";
import type { SortOptions } from "@/features/filters/types/filter.type";
import { useAppDispatch } from "@/hooks/useRedux";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const options = [
    { id: 1, name: "latest" },
    { id: 2, name: "oldest" },
    { id: 3, name: "Price Low To High" },
    { id: 4, name: "Price High To Low" },
];

function DropdownSortProduct() {
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState(options[0]);

    useEffect(() => {
        dispatch(setOption(selected.name as SortOptions));
    }, [selected, dispatch]);

    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <ListboxButton className="relative flex w-55 items-center justify-between gap-2 rounded-4xl border border-gray-300 px-6 py-2">
                        {selected.name}
                        <i className="fa-solid fa-caret-down"></i>
                    </ListboxButton>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border bg-white shadow-lg">
                            {options.map((option) => (
                                <ListboxOption
                                    key={option.id}
                                    value={option}
                                    className={({ active }) =>
                                        `cursor-pointer px-4 py-2 select-none ${
                                            active
                                                ? "bg-main-primary text-white"
                                                : "text-gray-900"
                                        }`
                                    }
                                >
                                    {option.name}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export default DropdownSortProduct;
