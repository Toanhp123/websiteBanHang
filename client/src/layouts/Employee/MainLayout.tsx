import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
    children: ReactNode;
};

function MainLayout({ children }: Props) {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="">
                <Sidebar />
            </div>

            <div className="flex flex-1 flex-col">
                <Header />

                <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
