import clsx from "clsx";
import { useState } from "react";

function ItemProductDescription() {
    const [tab, setTab] = useState<number>(1);

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

            <div>
                {tab === 1 && (
                    <div className="text-justify">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Eum quo ad perspiciatis dolore atque a recusandae,
                        nihil, eaque odit molestiae eveniet enim nam ipsa animi
                        porro, aut blanditiis mollitia deserunt? Lorem ipsum
                        dolor sit, amet consectetur adipisicing elit. Fugit
                        exercitationem provident itaque officiis molestiae,
                        libero animi eius facere. Eius magnam dolorem ducimus
                        eos tenetur necessitatibus! Reprehenderit dolore vitae
                        magni iste.
                    </div>
                )}

                {/* TODO: thêm api gọi thông tin rồi dùng map để render bảng */}
                {tab === 2 && (
                    <div className="rounded-2xl border border-gray-300">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemProductDescription;
