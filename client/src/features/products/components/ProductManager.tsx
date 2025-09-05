import { useEffect, useState } from "react";
import type { Product } from "../types/product.type";
import { getProductByCondition } from "../services/product.api";
import type { SortOptions } from "@/features/filters/types/filter.type";
import { formatDate } from "@/utils/formatDate";
import { useAppSelector } from "@/hooks/useRedux";
import { selectOptionSortProduct } from "@/features/filters/redux/optionSortProduct.slice";
import { DropdownSortProduct } from "@/components/shared";

function ProductManager() {
    const [listProduct, setListProduct] = useState<Product[]>([]);
    const option = useAppSelector(selectOptionSortProduct);

    const handleGetAllProduct = async (option: SortOptions) => {
        try {
            const res = await getProductByCondition({ option });

            setListProduct(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetAllProduct(option);
    }, [option]);

    // TODO: để làm sau
    return (
        <div className="space-y-8 rounded-2xl bg-white px-8 py-6">
            <div>
                <div className="flex items-center justify-between">
                    <p className="text-disable">
                        Show 0 of {listProduct.length} Product
                    </p>
                    <DropdownSortProduct />
                </div>

                <div className="mt-4 border-b border-gray-300"></div>
            </div>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-center">Image</th>
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Stock</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-right">Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {listProduct.map((product) => (
                        <tr key={product.product_id}>
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
                                        alt="image"
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
                            <td className="px-4 py-4 text-right"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductManager;
