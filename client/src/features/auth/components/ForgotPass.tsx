import { Button, Input, InputOTP } from "@/components/shared";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    checkEmailToGetOTP,
    resetPassword,
    verifyOtp,
} from "../services/auth.api";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    forgotPassEmailSchema,
    forgotPassResetSchema,
    type ForgotPassEmailFormInputs,
    type ForgotPassResetFormInputs,
} from "../validations/forgotPass.schema";

function ForgotPass() {
    const navigate = useNavigate();
    const [tab, setTab] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const {
        register: registerEmail,
        watch: watchEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
    } = useForm<ForgotPassEmailFormInputs>({
        resolver: yupResolver(forgotPassEmailSchema),
    });

    const {
        register: registerPass,
        handleSubmit: handleSubmitPass,
        formState: { errors: errorsPass },
    } = useForm<ForgotPassResetFormInputs>({
        resolver: yupResolver(forgotPassResetSchema),
    });

    const email = watchEmail().email;

    const handleResetPassword = async (data: ForgotPassResetFormInputs) => {
        try {
            const res = await resetPassword(data.pass, email);

            if (res) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOtpComplete = async (code: string) => {
        try {
            setLoading(true);
            const res = await verifyOtp(email, code);

            if (res.valid) {
                setTab((prev) => prev + 1);
            } else {
                setError(res.message);
                setIsValid(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetVerifyCode = async (
        data: ForgotPassEmailFormInputs,
    ): Promise<void> => {
        try {
            setLoading(true);
            const isEmailValid = await checkEmailToGetOTP(data.email);

            if (isEmailValid) {
                setTab((prev) => prev + 1);
            } else {
                setIsValid(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 rounded-2xl p-4 shadow-xl md:w-2/6 md:min-w-md md:p-8 2xl:p-12">
            <h1 className="text-2xl font-bold md:text-3xl">Logo</h1>

            <div className="w-full space-y-1">
                <h1 className="text-xl font-bold md:text-2xl">
                    {tab === 1 && "Quên mật khẩu?"}
                    {tab === 2 && "Xác minh mã"}
                    {tab === 3 && "Đặt lại mật khẩu mới"}
                </h1>

                <div className="text-sm text-gray-500 md:text-xl">
                    {tab === 1 && (
                        <p className="text-disable">
                            Đừng lo, chúng tôi sẽ giúp bạn đặt lại mật khẩu
                        </p>
                    )}
                    {tab === 2 && (
                        <p className="text-disable">
                            Vui lòng nhập mã mà chúng tôi vừa gửi đến email{" "}
                            <span className="text-main-primary font-semibold">
                                {email}
                            </span>
                        </p>
                    )}
                    {tab === 3 && (
                        <p className="text-disable">
                            Mật khẩu phải có ít nhất 6 ký tự
                        </p>
                    )}
                </div>
            </div>

            <div className="w-full max-w-4xl">
                {tab === 1 && (
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmitEmail(handleGetVerifyCode)}
                    >
                        <div>
                            <Input
                                label="Email"
                                placeholder="Nhập email tại đây"
                                register={registerEmail("email")}
                                error={errorsEmail.email?.message}
                            />

                            {!isValid && (
                                <p className="mt-1 font-semibold text-red-500">
                                    Không tìm thấy email
                                </p>
                            )}
                        </div>

                        <Button
                            text="Xác nhận"
                            loading={loading}
                            disabled={loading}
                        />
                    </form>
                )}

                {tab === 2 && (
                    <form className="space-y-6">
                        <h1 className="text-xl font-semibold">Mã OTP *</h1>

                        <div>
                            <InputOTP
                                length={6}
                                onComplete={handleOtpComplete}
                            />

                            <p className="mt-1 font-semibold text-red-500">
                                {error}
                            </p>
                        </div>

                        <Button
                            text="Xác nhận"
                            loading={loading}
                            disabled={loading}
                        />
                    </form>
                )}

                {tab === 3 && (
                    <form
                        onSubmit={handleSubmitPass(handleResetPassword)}
                        className="space-y-4"
                    >
                        <Input
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu"
                            inputFormat="password"
                            register={registerPass("pass")}
                            error={errorsPass.pass?.message}
                        />
                        <Input
                            label="Xác nhận mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            inputFormat="password"
                            register={registerPass("rePass")}
                            error={errorsPass.rePass?.message}
                        />

                        <Button text="Đặt lại mật khẩu" />
                    </form>
                )}
            </div>

            <div className="flex gap-1 font-semibold md:text-[18px]">
                <p>Nhớ mật khẩu rồi?</p>

                <Link
                    to="/login"
                    className="text-green-700 underline underline-offset-2 hover:text-green-600 md:text-[18px]"
                >
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}

export default ForgotPass;
