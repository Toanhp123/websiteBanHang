import axios from "@/utils/axiosInstance";
import type { Cart } from "../types/cart.type";

/**
 * Hàm gửi cart về backend để lưu trữ
 * @param cart thông tin 1 sản phẩm
 */
export const saveCartToDatabase = async (cart: Cart): Promise<void> => {
    await axios.put("/account/cart", {
        product_id: cart.id_product,
        quantity: cart.quantity,
    });
};

/**
 * Hàm sửa quantity cart ở database
 * @param quantity số lượng sản phẩm
 */
export const changeQuantityItemCartInDatabase = async (
    quantity: number,
    id_product: number,
): Promise<void> => {
    await axios.patch(`/account/cart/${id_product}`, {
        quantity,
    });
};

/**
 * Hàm lấy cart từ backend về
 * @returns trả về danh sách product trong cart
 */
export const getCartFromDatabase = async (): Promise<Cart[]> => {
    const res = await axios.get<Cart[]>("/account/cart");

    return res.data;
};

/**
 * Hàm xóa 1 item trong cart
 * @param id_product id sản phẩm cần xóa
 */
export const deleteItemInCartAtDatabase = async (
    id_product: number,
): Promise<void> => {
    await axios.delete(`/account/cart/${id_product}`);
};

/**
 * Hàm xóa toàn bộ item trong cart người dùng
 */
export const deleteCartAtDatabase = async (): Promise<void> => {
    return await axios.delete(`/account/cart`);
};
