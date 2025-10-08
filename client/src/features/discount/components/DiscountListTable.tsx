import { useEffect, useState } from "react";
import type { PromotionInfo } from "../types/discount.type";
import {
    changePromotionStatus,
    getPromotionInfo,
} from "../services/discount.api";
import { ITEMS_PER_PAGE_COL } from "@/constants/mics.constants";
import { formatDate } from "@/utils/formatDate";
import { Pagination } from "@/components/shared";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";

function DiscountListTable({ id, popup }: EditPopupPros) {
    const [discountList, setDiscountList] = useState<PromotionInfo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalDiscount, setTotalDiscount] = useState<number>(0);
    const [reload, setReload] = useState(false);
    const [editMenu, setEditMenu] = useState<number | null>(null);

    const handleGetDiscountInfo = async (page: number) => {
        try {
            const res = await getPromotionInfo(page, ITEMS_PER_PAGE_COL);

            if (res) {
                setDiscountList(res.data);
                setTotalDiscount(res.total);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenEditMenu = (id: number) => {
        setEditMenu((prev) => (prev === id ? null : id));
    };

    const handleChangeDiscountStatus = async (
        promotion_id: number,
        promotion_status: string,
    ) => {
        const status =
            promotion_status === "active" || promotion_status === "expired"
                ? "Deleted"
                : "Active";

        try {
            const res = await changePromotionStatus(promotion_id, status);

            if (res.success) {
                setReload((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetDiscountInfo(page);
    }, [page, reload, id]);

    return (
        <div
            className="space-y-8 rounded-2xl bg-white px-8 py-6"
            onClick={() => {
                if (editMenu) {
                    setEditMenu(null);
                }
            }}
        >
            <div>
                <p className="font-semibold">
                    Tìm thấy {discountList.length} trên tổng {totalDiscount} kết
                    quả
                </p>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <td className="px-4 py-2">Mã</td>
                        <td className="px-4 py-2">Tên</td>
                        <td className="px-4 py-2">Phân phối</td>
                        <td className="px-4 py-2">Phạm vi</td>
                        <td className="px-4 py-2">Hiệu lực từ</td>
                        <td className="px-4 py-2">Hiệu lực đến</td>
                        <td className="px-4 py-2">Ngày tạo</td>
                        <td className="px-4 py-2">Trạng thái</td>
                        <td className="px-4 py-2">Thao tác</td>
                    </tr>
                </thead>

                <tbody>
                    {discountList.map((discount) => (
                        <tr
                            key={discount.promotion_id}
                            className="even:bg-gray-100"
                        >
                            <td className="px-4 py-2">
                                {discount.promotion_id}
                            </td>
                            <td className="px-4 py-2">
                                {discount.promotion_name}
                            </td>
                            <td className="px-4 py-2">
                                {discount.distribution_type}
                            </td>
                            <td className="px-4 py-2">
                                {discount.range_apply}
                            </td>
                            <td className="px-4 py-2">
                                {formatDate(discount.valid_from)}
                            </td>
                            <td className="px-4 py-2">
                                {formatDate(discount.valid_to)}
                            </td>
                            <td className="px-4 py-2">
                                {formatDate(discount.created_at)}
                            </td>
                            <td className="px-4 py-2">
                                {discount.promotion_status}
                            </td>
                            <td className="px-4 py-2">
                                <div className="relative">
                                    <button
                                        className="h-8 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"
                                        onClick={() =>
                                            handleOpenEditMenu(
                                                discount.promotion_id ?? -1,
                                            )
                                        }
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {editMenu === discount.promotion_id && (
                                        <div className="shadow-light absolute top-8 right-0 z-50 h-35 w-50 rounded-2xl bg-white">
                                            <div className="flex h-full w-full flex-col px-4 py-2">
                                                <button
                                                    className="text-main-primary disabled:text-disable hover:text-main-secondary flex flex-1 items-center rounded-2xl px-3 font-semibold hover:cursor-pointer hover:bg-gray-300"
                                                    onClick={() =>
                                                        popup({
                                                            discount:
                                                                discount.promotion_id?.toString(),
                                                            mode: "edit",
                                                        })
                                                    }
                                                >
                                                    Chỉnh sửa
                                                </button>

                                                <button
                                                    className="disabled:text-disable flex flex-1 items-center rounded-2xl px-3 font-semibold text-red-600 hover:cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                                    onClick={() =>
                                                        handleChangeDiscountStatus(
                                                            discount.promotion_id ??
                                                                -1,
                                                            discount.promotion_status,
                                                        )
                                                    }
                                                >
                                                    {discount.promotion_status ===
                                                        "active" ||
                                                    discount.promotion_status ===
                                                        "expired"
                                                        ? "Xóa khuyến mãi"
                                                        : "Kích hoạt khuyến mãi"}
                                                </button>

                                                <button
                                                    className="disabled:text-disable flex flex-1 items-center rounded-2xl px-3 font-semibold text-pink-600 hover:cursor-pointer hover:bg-gray-300 hover:text-pink-500"
                                                    onClick={() =>
                                                        popup({
                                                            discount:
                                                                discount.promotion_id?.toString(),
                                                            mode: "detail",
                                                        })
                                                    }
                                                >
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPages={Math.ceil(totalDiscount / ITEMS_PER_PAGE_COL)}
            />
        </div>
    );
}

export default DiscountListTable;
