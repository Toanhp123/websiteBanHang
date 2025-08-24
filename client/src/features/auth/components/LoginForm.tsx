import { Button, Input } from "@/components/shared";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/auth.api";
import type { LoginCredentials } from "../types/auth.type";
import { setAccessToken } from "@/stores/authStore";

function LoginForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const location = useLocation();
    const navigate = useNavigate();

    // Hàm xử lý login
    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>,
        { username, password }: LoginCredentials,
    ): Promise<void> => {
        e.preventDefault();
        const from = location.state?.from?.pathname || "/";

        try {
            const res = await login({ username, password });
            setAccessToken(res.data.accessToken);
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    // TODO: làm hàm xử lý login bằng google
    // Hàm xử lý login bằng google
    // const handleLoginWithGoogle = async (): Promise<void> => {};

    return (
        <form
            className="w-full max-w-4xl space-y-6"
            onSubmit={(e) => handleLogin(e, { username, password })}
        >
            <div className="flex flex-col gap-4">
                <Input
                    label="Username"
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    required={true}
                />

                <Input
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    type="text"
                    required={true}
                />

                <div className="flex">
                    {/* TODO: need to make checkbox  */}
                    {/* <div className="flex flex-1 items-center justify-center gap-1">
                            <Input type="checkbox" />
                            <p>Remember me</p>
                        </div> */}

                    <div>
                        <Link
                            to="/register"
                            className="flex-1 font-semibold text-green-700 underline hover:text-green-600"
                        >
                            Forget password?
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-3 md:space-y-5">
                <Button text="Sign In" />

                <div className="flex items-center justify-center gap-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <div className="text-disable">or Sign In with</div>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <Button
                    text="Sign In With Google"
                    textColor="text-black"
                    icon="fa-brands fa-google"
                    bgColor="bg-white hover:text-white"
                />
            </div>
        </form>
    );
}

export default LoginForm;
