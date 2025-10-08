import { LoginForm } from "@/features/auth/components";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center p-12 md:justify-around">
            {/* Hình nền cho màn hình máy tính */}
            <div className="hidden h-full w-2/5 rounded-4xl bg-[url(@/assets/images/background/1.png)] bg-cover bg-no-repeat md:block"></div>

            {/* Form đăng nhập */}
            <div className="flex flex-col items-center gap-6 rounded-2xl p-4 shadow-xl md:w-2/6 md:min-w-md md:p-8 2xl:p-12">
                <div className="w-full space-y-1">
                    <h1 className="mb-8 text-center text-xl font-bold md:text-2xl">
                        Đăng Nhập
                    </h1>
                    <p className="text-sm text-gray-500 md:text-xl">
                        Vui lòng điền thông tin để truy cập vào tài khoản của
                        bạn.
                    </p>
                </div>

                <LoginForm />

                <div className="flex gap-1 font-semibold md:text-[18px]">
                    <p>Bạn chưa có tài khoản?</p>

                    <Link
                        to="/register"
                        className="text-green-700 underline hover:text-green-600 md:text-[18px]"
                    >
                        Đăng Ký
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
