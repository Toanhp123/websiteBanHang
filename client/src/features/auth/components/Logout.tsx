import { Button } from "@/components/shared";
import { logout } from "../services/auth.api";
import { setAccessToken } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();

        setAccessToken("");
        navigate("/");
    };

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold md:text-3xl">
                    Đăng xuất
                </h1>
                <p className="text-disable font-semibold">
                    Bạn có chắc chắn muốn đăng xuất không?
                </p>
            </div>

            <div className="inline-flex">
                <Button text="Đồng ý, đăng xuất" onClick={handleLogout} />
            </div>
        </div>
    );
}

export default Logout;
