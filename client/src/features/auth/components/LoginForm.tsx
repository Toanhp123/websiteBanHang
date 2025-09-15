import { Button, Input } from "@/components/shared";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/auth.api";
import { isUserRole } from "../types/auth.type";
import { setAccessToken, setRole } from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, type LoginFormInputs } from "../validations/login.schema";

function LoginForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });

    const handleLogin = async (data: LoginFormInputs): Promise<void> => {
        const from = location.state?.from?.pathname || "/";

        try {
            const res = await loginCustomer({
                username: data.username,
                password: data.password,
            });

            if (
                isUserRole(res.data.user.role) &&
                res.data.user.role === "Customer"
            ) {
                setRole(res.data.user.role);
                setAccessToken(res.data.accessToken);
                navigate(from, { replace: true });
            }

            if (
                (isUserRole(res.data.user.role) &&
                    res.data.user.role === "Admin") ||
                res.data.user.role === "Employee"
            ) {
                setRole(res.data.user.role);
                setAccessToken(res.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // TODO: làm hàm xử lý đăng nhập bằng Google
    // Hàm xử lý đăng nhập bằng Google
    // const handleLoginWithGoogle = async (): Promise<void> => {};

    return (
        <form
            className="w-full max-w-4xl space-y-6"
            onSubmit={handleSubmit(handleLogin)}
        >
            <div className="flex flex-col gap-4">
                <Input
                    label="Tên đăng nhập"
                    placeholder="Nhập tên đăng nhập"
                    register={register("username")}
                    error={errors.username?.message}
                />

                <Input
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    register={register("password")}
                    inputFormat="password"
                    error={errors.password?.message}
                />

                <div className="flex items-center justify-end">
                    <div>
                        <Link
                            to="/forgotPassword"
                            className="flex-1 font-semibold text-green-700 underline underline-offset-2 hover:text-green-600"
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>
            </div>

            <div className="space-y-3 md:space-y-5">
                <Button text="Đăng nhập" />

                <div className="flex items-center justify-center gap-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <div className="text-disable">hoặc đăng nhập với</div>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <Button
                    text="Đăng nhập bằng Google"
                    textColor="text-black"
                    icon="fa-brands fa-google"
                    bgColor="bg-white hover:text-white"
                />
            </div>
        </form>
    );
}

export default LoginForm;
