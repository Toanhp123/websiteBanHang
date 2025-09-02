import { Button } from "@/components/shared";

function Header() {
    return (
        <div className="flex w-full items-center justify-end border-b border-gray-300 p-4">
            <div className="flex items-center gap-2">
                <h1>Logo</h1>
                <div>
                    <Button
                        icon="fa-solid fa-bars"
                        textColor="text-gray-500"
                        border=""
                        bgColor=""
                        hoverColor=""
                        textColorHover=""
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
