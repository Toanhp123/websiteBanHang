import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

const options = [
    { id: 1, name: "Tùy chọn 1" },
    { id: 2, name: "Tùy chọn 2" },
    { id: 3, name: "Tùy chọn 3" },
];

// TODO: cần làm thêm
function Dropdown() {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <ListboxButton className="relative flex w-full items-center gap-2 rounded-4xl border border-gray-300 px-6 py-2">
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
                                                ? "bg-blue-500 text-white"
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

export default Dropdown;
