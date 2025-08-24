/**
 * Hàm chuẩn hóa object chuyển tất cả value là [Tất cả] -> [null]
 * Giải thích:
 * - <T extends Record<string, unknown>>
 * - Khai báo generic T: tham số đầu vào filter phải là một object có key dạng string
 * - Nhờ generic, kiểu key của object gốc được giữ nguyên (không mất tên key).
 *
 * - (filter: T): { [K in keyof T]: T[K] | null; }
 * - Hàm nhận một object kiểu T
 * - Trả về một object có cùng tập key như T (keyof T), nhưng giá trị mỗi key là T[K] | null
 * - Tức là thêm null vào union của từng value
 *
 * - Object.entries(filter) // -> [ [key, value], ... ].map(([k, v]) => [k, v === "Tất cả" ? null : v])
 * - Object.entries chuyển object thành mảng các cặp [key, value]
 * - map(...) duyệt từng cặp
 * - Kết quả vẫn là một mảng các cặp [key, value] sau khi đã “chuẩn hoá”
 *
 * - Object.fromEntries(...)
 * - Biến mảng cặp [key, value] về lại object.
 *
 * - as { [K in keyof T]: T[K] | null }
 * - ép kiểu để object trả về có đúng các key của T, và value là T[K] | null
 *
 * @param filter object cần chuẩn hóa
 * @returns object đã chuẩn hóa
 */
export const normalizeFilter = <T extends Record<string, string | unknown>>(
    filter: T,
): { [K in keyof T]: T[K] | null } => {
    return Object.fromEntries(
        Object.entries(filter).map(([k, v]) => [k, v === "Tất cả" ? null : v]),
    ) as { [K in keyof T]: T[K] | null };
};
