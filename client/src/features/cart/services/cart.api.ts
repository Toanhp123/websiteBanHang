import axios from "@/utils/axiosInstance";
import type { Cart } from "../types/cart.type";

/**
 * Hàm gửi cart về backend để lưu trữ
 * @param Cart thông tin 1 sản phẩm
 */
export const saveCartToDatabase = async (Cart: Cart): Promise<void> => {
    await axios.post("/account/cart", {
        product_id: Cart.id_product,
        quantity: Cart.quantity,
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
export const deleteCartAtDatabase = async (
    id_product: number,
): Promise<void> => {
    await axios.delete(`/account/cart/${id_product}`);
};

// TODO: chưa làm xong
/**
 * Hàm xóa toàn bộ item trong cart người dùng
 */
export const deleteALLCartAtDatabase = async () => {
    return await axios.delete(`/account/cart`);
};
