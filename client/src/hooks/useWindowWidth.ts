import { useEffect, useState } from "react";

export const useWindowWidth = () => {
    const [width, setWidth] = useState<number>(
        document.documentElement.clientWidth,
    );

    useEffect(() => {
        const handleResize = (): void =>
            setWidth(document.documentElement.clientWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};
