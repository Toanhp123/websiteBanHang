import type { ReactNode } from "react";

type PropFormCheckoutSection = {
    children: ReactNode;
};

function FormCheckoutSection({ children }: PropFormCheckoutSection) {
    return (
        <div className="shadow-light m-2 space-y-4 rounded-2xl p-8">
            {children}
        </div>
    );
}

export default FormCheckoutSection;
