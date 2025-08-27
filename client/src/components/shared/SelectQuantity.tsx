import { changeQuantityItemCart } from "@/features/cart/redux/cart.thunk";
import { useAppDispatch } from "@/hooks/useRedux";

type SelectQuantityPros = {
    saveChangeCartToDatabase?: boolean;
    product_id: number;
    quantity: number;
    setQuantity?: React.Dispatch<React.SetStateAction<number>>;
    setQuantityInList?: React.Dispatch<
        React.SetStateAction<Record<number, number>>
    >;
};

// TODO: cần thêm event tăng quantity
function SelectQuantity({
    saveChangeCartToDatabase = false,
    product_id,
    quantity,
    setQuantity,
    setQuantityInList,
}: SelectQuantityPros) {
    const dispatch = useAppDispatch();

    const handleDecreaseQuantity = (): void => {
        if (setQuantity && quantity > 0) {
            setQuantity((q) => q - 1);
        }

        if (setQuantityInList && quantity > 0) {
            const newQuantity = quantity - 1;

            setQuantityInList((prev) => ({
                ...prev,
                [product_id]: newQuantity,
            }));
        }

        if (saveChangeCartToDatabase) {
            dispatch(
                changeQuantityItemCart({
                    quantity: quantity - 1,
                    id_product: product_id,
                }),
            );
        }
    };

    const handleIncreaseQuantity = (): void => {
        if (setQuantity) {
            setQuantity((q) => q + 1);
        }

        if (setQuantityInList) {
            const newQuantity = quantity + 1;

            setQuantityInList((prev) => ({
                ...prev,
                [product_id]: newQuantity,
            }));
        }

        if (saveChangeCartToDatabase) {
            dispatch(
                changeQuantityItemCart({
                    quantity: quantity + 1,
                    id_product: product_id,
                }),
            );
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex items-center justify-center rounded-4xl border border-gray-300">
                <div
                    className="px-4 py-2"
                    onClick={() => {
                        handleDecreaseQuantity();
                    }}
                >
                    -
                </div>
                <div className="h-full border-r border-gray-300"></div>
                <div className="px-4 py-2">{quantity}</div>
                <div className="h-full border-r border-gray-300"></div>
                <div
                    className="px-4 py-2"
                    onClick={() => handleIncreaseQuantity()}
                >
                    +
                </div>
            </div>
        </div>
    );
}

export default SelectQuantity;
