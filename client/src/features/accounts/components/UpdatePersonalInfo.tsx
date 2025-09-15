import { Button, Input } from "@/components/shared";
import { useState, useEffect } from "react";

function UpdatePersonalInfo() {
    // Mock data (sau này thay bằng API)
    const userMockData = {
        firstName: "Nguyễn",
        lastName: "Văn A",
        email: "vana@example.com",
        phone: "0912345678",
    };

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    useEffect(() => {
        setFirstName(userMockData.firstName);
        setLastName(userMockData.lastName);
        setEmail(userMockData.email);
        setPhone(userMockData.phone);
    }, []);

    return (
        <div className="space-y-8">
            {/* Thông tin hiển thị */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="mb-4 text-2xl font-bold text-gray-800">
                    Thông tin cá nhân
                </h1>
                <div className="space-y-3 text-gray-700">
                    <p>
                        <span className="font-semibold">Họ và tên:</span>{" "}
                        {firstName} {lastName}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {email}
                    </p>
                    <p>
                        <span className="font-semibold">Số điện thoại:</span>{" "}
                        {phone}
                    </p>
                </div>
            </div>

            {/* Form cập nhật */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Cập nhật thông tin
                </h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            value={firstName}
                            setValue={setFirstName}
                            label="Họ"
                            placeholder="Nhập họ"
                        />
                        <Input
                            value={lastName}
                            setValue={setLastName}
                            label="Tên"
                            placeholder="Nhập tên"
                        />
                    </div>

                    <Input
                        value={email}
                        setValue={setEmail}
                        label="Email"
                        inputFormat="email"
                        placeholder="Địa chỉ email"
                    />
                    <Input
                        value={phone}
                        setValue={setPhone}
                        label="Số điện thoại"
                        inputFormat="tel"
                        placeholder="Nhập số điện thoại"
                    />

                    <div className="pt-2">
                        <Button text="Lưu thay đổi" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePersonalInfo;
