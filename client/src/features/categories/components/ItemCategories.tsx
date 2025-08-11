import type { ItemCategoriesPros } from "../types/categories.type";

function ItemCategories({ img, name }: ItemCategoriesPros) {
    // TODO: cần thêm chức năng click vào ra menu
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-25 w-25 rounded-full bg-gray-100 p-6 md:h-35 md:w-35">
                <img src={img} alt="bakery" />
            </div>

            <p className="font-bold">{name}</p>
        </div>
    );
}

export default ItemCategories;
