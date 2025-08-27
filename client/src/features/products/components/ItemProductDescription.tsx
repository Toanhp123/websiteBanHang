import Loading from "@/features/loading/components/Loading";
import { useProductDetail } from "@/hooks/useProductDetail";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ItemProductDescription() {
    const { product_id } = useParams();
    const [tab, setTab] = useState<number>(1);
    const { productDetail, loading } = useProductDetail(product_id);

    const additionInfo = {
        "Product Type": productDetail.type,
        Supplier: productDetail.supplier,
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-center gap-12 border-b-1 border-gray-300">
                <h1
                    className={clsx(
                        "pb-2 text-2xl font-semibold md:text-3xl",
                        tab === 1 && "border-primary text-primary border-b-3",
                    )}
                    onClick={() => setTab(1)}
                >
                    Description
                </h1>

                <h1
                    className={clsx(
                        "pb-2 text-2xl font-semibold md:text-3xl",
                        tab === 2 && "border-primary text-primary border-b-3",
                    )}
                    onClick={() => setTab(2)}
                >
                    Addition Information
                </h1>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div>
                    {tab === 1 && (
                        <div className="text-justify">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Eum quo ad perspiciatis dolore atque a
                            recusandae, nihil, eaque odit molestiae eveniet enim
                            nam ipsa animi porro, aut blanditiis mollitia
                            deserunt? Lorem ipsum dolor sit, amet consectetur
                            adipisicing elit. Fugit exercitationem provident
                            itaque officiis molestiae, libero animi eius facere.
                            Eius magnam dolorem ducimus eos tenetur
                            necessitatibus! Reprehenderit dolore vitae magni
                            iste.
                        </div>
                    )}

                    {tab === 2 && (
                        <div className="overflow-clip rounded-3xl border border-gray-300">
                            <div className="bg-surface grid grid-cols-4 px-6 py-3">
                                <div className="font-bold">Attribute</div>
                                <div className="col-span-3 font-bold">
                                    Details
                                </div>
                            </div>

                            {Object.entries(additionInfo).map(
                                ([key, value]) => (
                                    <div className="grid grid-cols-4 px-6 py-3 odd:bg-gray-100">
                                        <div>{key}</div>
                                        <div className="col-span-3">
                                            {value}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ItemProductDescription;
