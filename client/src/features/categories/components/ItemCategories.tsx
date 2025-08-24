import { useAppDispatch } from "@/hooks/useRedux";
import type { ItemCategoriesPros } from "../types/categories.type";
import { setListFilter } from "@/features/filters/redux/filter.slice";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function ItemCategories({ img, name }: ItemCategoriesPros) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickItem = () => {
        dispatch(setListFilter({ selectName: name, optionsType: "category" }));
        navigate("/shop");
    };

    /**
     * TODO: ấn vào đã lọc nhưng bị lỗi là tagItem bị xóa hết có thể do itemFilter init listName khiến nó xóa biến listFilter làm tagItem mất
     * nhưng không hiểu sao product vẫn lọc đúng
     */
    return (
        <button
            className={clsx("flex flex-col items-center justify-center gap-2")}
            onClick={handleClickItem}
        >
            <div className="h-25 w-25 rounded-full bg-gray-100 p-6 md:h-35 md:w-35">
                <img src={img} alt="bakery" />
            </div>

            <p className="font-bold">{name}</p>
        </button>
    );
}

export default ItemCategories;
