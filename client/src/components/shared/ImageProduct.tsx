import clsx from "clsx";

type ProsImageProduct = {
    src: string;
    selected?: boolean;
};

function ImageProduct({ src, selected = false }: ProsImageProduct) {
    return (
        <div
            className={clsx(
                "flex aspect-square items-center justify-center rounded-2xl border p-6",
                selected ? "border-main-primary border-3" : "border-gray-300",
            )}
        >
            <img src={src} alt="image" />
        </div>
    );
}

export default ImageProduct;
