import { useState } from "react";
import { Button, Input } from "@/components/shared";
import { Link, useNavigate } from "react-router-dom";
import {
    tab1Schema,
    tab2Schema,
    tab3Schema,
    type RegisterFormInputs,
} from "../validations/register.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { registerCustomer } from "../services/auth.api";

function RegisterForm() {
    const navigate = useNavigate();
    const [tab, setTab] = useState<number>(1);
    const [formData, setFormData] = useState<Partial<RegisterFormInputs>>({});

    const getResolver = (tab: number) => {
        switch (tab) {
            case 1:
                return yupResolver(tab1Schema);
            case 2:
                return yupResolver(tab2Schema);
            case 3:
                return yupResolver(tab3Schema);
            default:
                return yupResolver(tab1Schema);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm<RegisterFormInputs>({
        resolver: getResolver(tab),
    });

    const handleRegister = async (data: RegisterFormInputs): Promise<void> => {
        handleNextTab();
        setFormData((prev) => ({ ...prev, ...data }));

        try {
            const finalData = {
                ...formData,
            } as RegisterFormInputs;

            const res = await registerCustomer(finalData);

            if (res) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextTab = async (): Promise<void> => {
        const valid = await trigger();
        if (!valid) return;
        if (tab === 3) return;
        setTab((tab) => tab + 1);
    };

    const handleBackTab = (): void => {
        if (tab === 1) return;

        setTab((tab) => tab - 1);
    };

    return (
        <div className="flex w-full flex-col items-center gap-6 rounded-2xl p-4 shadow-xl md:w-2/6 md:min-w-md md:p-8 2xl:p-12">
            <h1 className="text-2xl font-bold md:text-3xl">Logo</h1>

            <div className="w-full space-y-1">
                <h1 className="text-xl font-bold md:text-2xl">Sign Up</h1>
                {tab === 1 && (
                    <p className="text-disable text-sm md:text-xl">
                        Please enter your email address and your username
                    </p>
                )}

                {tab === 2 && (
                    <p className="text-disable text-sm md:text-xl">
                        Complete your profile. Don't worry, only you can see
                        your personal data
                    </p>
                )}

                {tab === 3 && (
                    <p className="text-disable text-sm md:text-xl">
                        Enter your password and retype it
                    </p>
                )}
            </div>

            <form
                id="registerForm"
                className="w-full max-w-4xl space-y-6"
                onSubmit={handleSubmit(handleRegister)}
            >
                {/* Trang 1 của from đăng ký */}
                {tab === 1 && (
                    <div className="space-y-4">
                        <Input
                            label="Username"
                            placeholder="Username"
                            register={register("username")}
                            error={errors.username?.message}
                        />

                        <Input
                            label="Email"
                            placeholder="Email"
                            register={register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                )}

                {/* Trang 2 của from đăng ký */}
                {tab === 2 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                placeholder="First Name"
                                register={register("firstName")}
                                error={errors.firstName?.message}
                            />

                            <Input
                                label="Last Name"
                                placeholder="Last Name"
                                register={register("lastName")}
                                error={errors.lastName?.message}
                            />
                        </div>

                        <Input
                            label="Phone"
                            placeholder="Phone"
                            inputFormat="number"
                            register={register("phone")}
                            error={errors.phone?.message}
                        />

                        <Input
                            label="Birthday"
                            placeholder="Birthday"
                            inputFormat="date"
                            register={register("birthday")}
                            error={errors.birthday?.message}
                        />
                    </div>
                )}

                {/* Trang 3 của from đăng ký */}
                {tab === 3 && (
                    <div className="space-y-4">
                        <Input
                            label="Password"
                            placeholder="Password"
                            inputFormat="password"
                            register={register("password")}
                            error={errors.password?.message}
                        />

                        <Input
                            label="Retype Password"
                            placeholder="Retype Password"
                            inputFormat="password"
                            register={register("retypePass")}
                            error={errors.retypePass?.message}
                        />
                    </div>
                )}

                {/* Button form đăng ký */}
                <div className="space-y-3 md:space-y-5">
                    <div className={tab > 1 ? `flex gap-2` : ``}>
                        {tab > 1 && (
                            <Button
                                text="Back Step"
                                onClick={handleBackTab}
                                buttonType="button"
                            />
                        )}

                        <Button text={tab < 3 ? "Next Step" : "Sign Up"} />
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <div className="text-disable">or Sign Up with</div>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <Button
                        text="Sign Up With Google"
                        textColor="text-black"
                        icon="fa-brands fa-google"
                        bgColor="bg-white hover:text-white"
                    />
                </div>
            </form>

            <div className="flex gap-2 font-semibold md:text-[18px]">
                <p>Already have account?</p>

                <Link
                    to="/login"
                    className="text-green-700 underline underline-offset-2 hover:text-green-600"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
