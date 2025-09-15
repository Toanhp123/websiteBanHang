import { useEffect, useState } from "react";
import { getItemType } from "../services/filters.api";
import ItemFilterOption from "./ItemFilterOption";
import { useCategories } from "@/hooks/useCategories";
import type { ItemTypeState } from "../types/filter.type";
import { TypeFilter } from "@/constants/typeFilter.constants";

// TODO: cần thêm giao diện mobile và cần thêm logic để khi xóa tag sẽ tự động chọn tất cả
function ListFilterOption() {
    const category = useCategories();
    const [listItemType, setListItemType] = useState<ItemTypeState>({
        type: TypeFilter.PRODUCT_TYPE,
        itemType: [],
    });
    const availability = {
        type: TypeFilter.AVAILABLE,
        itemType: [
            { id: 1, name: "Còn hàng" },
            {
                id: 2,
                name: "Hết hàng",
            },
        ],
    };

    const handleGetItemType = async () => {
        const itemType = await getItemType();

        setListItemType((prev) => ({
            ...prev,
            itemType: itemType,
        }));
    };

    useEffect(() => {
        handleGetItemType();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Filter Options</h1>

            <ItemFilterOption
                title="Categories"
                options={category.categories}
                optionsType={category.type}
                idGetter={(c) => c.product_category_id}
                nameGetter={(c) => c.product_category_name}
            />

            <ItemFilterOption
                title="Product Type"
                options={listItemType.itemType}
                optionsType={listItemType.type}
                idGetter={(item) => item.product_type_id}
                nameGetter={(item) => item.product_type_name}
            />

            <ItemFilterOption
                title="Availability"
                options={availability.itemType}
                optionsType={availability.type}
                idGetter={(item) => item.id}
                nameGetter={(item) => item.name}
            />
        </div>
    );
}

export default ListFilterOption;
