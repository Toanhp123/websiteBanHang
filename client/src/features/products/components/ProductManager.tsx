import { useEffect, useState } from "react";
import type { Product } from "../types/product.type";
import { deleteProduct, getProductByCondition } from "../services/product.api";
import type { SortOptions } from "@/features/filters/types/filter.type";
import { formatDate } from "@/utils/formatDate";
import { useAppSelector } from "@/hooks/useRedux";
import { selectOptionSortProduct } from "@/features/filters/redux/optionSortProduct.slice";
import { DropdownSortProduct, Pagination } from "@/components/shared";
import { ITEMS_PER_PAGE_COL } from "@/constants/mics.constants";
import type { EditPopupPros } from "@/features/warehouse/types/warehouse.type";

function ProductManager({ id, popup }: EditPopupPros) {
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const [listProductLength, setListProductLength] = useState<number>(0);
    const [editMenu, setEditMenu] = useState<number | null>(null);
    const option = useAppSelector(selectOptionSortProduct);
    const [page, setPage] = useState<number>(1);

    const handleGetAllProduct = async (option: SortOptions, page: number) => {
        try {
            const res = await getProductByCondition({
                option,
                itemsPerPage: ITEMS_PER_PAGE_COL,
                page,
            });

            setListProduct(res.data);
            setListProductLength(res.total);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenEditMenu = (id: number) => {
        setEditMenu((prev) => (prev === id ? null : id));
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            deleteProduct(id);

            setListProduct((prev) => prev.filter((p) => p.product_id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllProduct(option, page);
    }, [option, id, page]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

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
                <div className="flex items-center justify-between">
                    <p className="font-semibold">
                        Hiển thị {listProduct.length} trên {listProductLength}{" "}
                        sản phẩm
                    </p>
                    <DropdownSortProduct />
                </div>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-center">Ảnh</th>
                        <th className="px-4 py-2 text-left">Tên sản phẩm</th>
                        <th className="px-4 py-2 text-left">Giá</th>
                        <th className="px-4 py-2 text-left">Tồn kho</th>
                        <th className="px-4 py-2 text-left">Ngày thêm</th>
                        <th className="px-4 py-2 text-right">Chỉnh sửa</th>
                    </tr>
                </thead>

                <tbody>
                    {listProduct.map((product) => (
                        <tr
                            key={product.product_id}
                            className="even:bg-gray-100"
                        >
                            <td className="px-4 py-4">{product.product_id}</td>
                            <td className="flex justify-center px-4 py-4">
                                <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-2xl">
                                    <img
                                        src={
                                            `http://localhost:3000/` +
                                            product.images.filter(
                                                (img) =>
                                                    img.is_main === 1 &&
                                                    img.product_id ===
                                                        product.product_id,
                                            )[0].image_url
                                        }
                                        alt="ảnh"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                {product.product_name}
                            </td>
                            <td className="px-4 py-4 text-left">
                                {product.price}
                            </td>
                            <td className="px-4 py-4 text-left">
                                {product.totalStock}
                            </td>
                            <td className="px-4 py-4 text-left">
                                {formatDate(product.product_date_add)}
                            </td>
                            <td className="px-4 py-4 text-right">
                                <div className="relative">
                                    <button
                                        className="h-8 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"
                                        onClick={() =>
                                            handleOpenEditMenu(
                                                product.product_id,
                                            )
                                        }
                                    >
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </button>

                                    {editMenu === product.product_id && (
                                        <div className="shadow-light absolute top-8 right-0 z-50 h-35 w-50 rounded-2xl bg-white">
                                            <div className="flex h-full w-full flex-col px-4 py-2">
                                                <button
                                                    className="text-main-primary disabled:text-disable hover:text-main-secondary flex flex-1 items-center rounded-2xl px-3 font-semibold hover:cursor-pointer hover:bg-gray-300"
                                                    onClick={() =>
                                                        popup({
                                                            product:
                                                                product.product_id.toString(),
                                                            mode: "edit",
                                                        })
                                                    }
                                                >
                                                    Sửa sản phẩm
                                                </button>

                                                <button
                                                    className="disabled:text-disable flex flex-1 items-center rounded-2xl px-3 font-semibold text-red-600 hover:cursor-pointer hover:bg-gray-300 hover:text-red-500"
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product.product_id,
                                                        )
                                                    }
                                                >
                                                    Xóa sản phẩm
                                                </button>

                                                <button
                                                    className="disabled:text-disable flex flex-1 items-center rounded-2xl px-3 font-semibold text-pink-600 hover:cursor-pointer hover:bg-gray-300 hover:text-pink-500"
                                                    onClick={() =>
                                                        popup({
                                                            product:
                                                                product.product_id.toString(),
                                                            mode: "detail",
                                                        })
                                                    }
                                                >
                                                    Chi tiết sản phẩm
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
                totalPages={Math.ceil(listProductLength / ITEMS_PER_PAGE_COL)}
            />
        </div>
    );
}

export default ProductManager;
