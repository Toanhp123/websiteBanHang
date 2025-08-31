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
        <div className="space-y-4">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold md:text-3xl">Logout</h1>
                <p className="text-disable">Are you sure want to log out?</p>
            </div>

            <div className="w-40">
                <Button text="Yes, Logout" onClick={handleLogout} />
            </div>
        </div>
    );
}

export default Logout;
