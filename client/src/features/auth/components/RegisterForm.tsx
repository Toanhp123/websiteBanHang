import { useState } from "react";
import { register } from "../services/auth.api";
import type { RegisterCredentials, UserInfo } from "../types/auth.type";
import { Button, Input } from "@/components/shared";
import { Link } from "react-router-dom";

function RegisterForm() {
    const [tab, setTab] = useState<number>(1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birthday, setBirthday] = useState<string>(
        new Date().toISOString().split("T")[0],
    );
    const [address, setAddress] = useState<string>("");
    const [retypePass, setRetypePass] = useState<string>("");

    const userInfo: UserInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        birthday: birthday,
        phoneNumber: phone,
    };

    const registerCredentials: RegisterCredentials = {
        username: username,
        password:
            password === retypePass && password !== "" ? password : undefined,
    };

    //TODO: cần xử lý sự kiện chuyển trang handleNextStep đang bị hiện tượng khi đến step 3 gọi func back step sẽ gọi onSubmit form dẫn đến không lùi được, cần làm nốt sự kiện đăng ký người dùng
    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();

        handleNextTab();

        if (registerCredentials.password === undefined) return;

        const res = await register(userInfo, registerCredentials);
    };

    const handleNextTab = (): void => {
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
                onSubmit={(e) => handleRegister(e)}
            >
                {/* Trang 1 của from đăng ký */}
                {tab === 1 && (
                    <div className="space-y-4">
                        <Input
                            label="Username"
                            placeholder="Username"
                            value={username}
                            setValue={setUsername}
                            required={true}
                        />

                        <Input
                            label="Email"
                            placeholder="Email"
                            value={email}
                            setValue={setEmail}
                            required={true}
                        />
                    </div>
                )}

                {/* Trang 2 của from đăng ký */}
                {tab === 2 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                label="First Name"
                                placeholder="First Name"
                                value={firstName}
                                setValue={setFirstName}
                                required={true}
                            />

                            <Input
                                label="Last Name"
                                placeholder="Last Name"
                                value={lastName}
                                setValue={setLastName}
                                required={true}
                            />
                        </div>

                        <Input
                            label="Phone"
                            placeholder="Phone"
                            value={phone}
                            setValue={setPhone}
                            required={true}
                            inputFormat="tel"
                        />

                        <Input
                            label="Birthday"
                            placeholder="Birthday"
                            value={birthday}
                            setValue={setBirthday}
                            required={true}
                            inputFormat="date"
                        />

                        <Input
                            label="Address"
                            placeholder="Address"
                            value={address}
                            setValue={setAddress}
                            required={true}
                        />
                    </div>
                )}

                {/* Trang 3 của from đăng ký */}
                {tab === 3 && (
                    <div className="space-y-4">
                        <Input
                            label="Password"
                            placeholder="Password"
                            value={password}
                            setValue={setPassword}
                            required={true}
                            inputFormat="password"
                        />

                        <Input
                            label="Retype Password"
                            placeholder="Retype Password"
                            value={retypePass}
                            setValue={setRetypePass}
                            required={true}
                            inputFormat="password"
                        />
                    </div>
                )}

                {/* Button form đăng ký */}
                <div className="space-y-3 md:space-y-5">
                    <div className={tab > 1 ? `flex gap-2` : ``}>
                        {tab > 1 && (
                            <Button text="Back Step" onClick={handleBackTab} />
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
                    className="text-green-700 underline hover:text-green-600"
                >
                    Sign In
                </Link>
            </div>
        </div>
    );
}

export default RegisterForm;
