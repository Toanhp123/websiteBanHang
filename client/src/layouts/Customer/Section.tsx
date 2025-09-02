import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

function Section({ children }: Props) {
    return (
        <div className="flex justify-center odd:bg-white even:bg-gray-100">
            <div className="w-full max-w-7/8 px-8 py-12">{children}</div>
        </div>
    );
}

export default Section;
