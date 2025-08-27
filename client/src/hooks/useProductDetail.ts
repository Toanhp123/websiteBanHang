import { getDetailProduct } from "@/features/products/services/product.api";
import type { Product } from "@/features/products/types/product.type";
import { useEffect, useState } from "react";

export const useProductDetail = (product_id: string | undefined) => {
    const [loading, setLoading] = useState(true);
    const [productDetail, setProductDetail] = useState<Product>({
        product_id: 0,
        product_name: "",
        product_description: "",
        price: 0,
        totalStock: 0,
        category: "",
        type: "",
        images: [],
    });

    // Lấy danh sách ảnh
    const listImage: string[] = productDetail.images.map(
        (image) => image.image_url,
    );

    // Chỉ lấy ảnh main của sản phẩm
    const mainImage = productDetail.images
        .filter((img) => img.is_main === 1)
        .map((img) => img.image_url)[0];

    const handleGetDetailProduct = async (
        product_id: string,
    ): Promise<void> => {
        const productId = Number(product_id);
        const res = await getDetailProduct(productId);
        setProductDetail(res);
        setLoading(false);
    };

    useEffect(() => {
        if (product_id) {
            handleGetDetailProduct(product_id);
        }
    }, [product_id]);

    return { productDetail, listImage, mainImage, loading };
};
