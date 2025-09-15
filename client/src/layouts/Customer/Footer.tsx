import { FooterInfo } from "@/components/sections";
import { Button, Input } from "@/components/shared";
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");

    return (
        <div className="space-y-18 bg-gray-200 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-gray-600">
                    Bản tin của chúng tôi
                </p>

                <h1 className="text-center text-2xl font-bold md:text-3xl">
                    Đăng ký nhận bản tin để <br />
                    Nhận{" "}
                    <span className="text-main-primary">
                        cập nhật về ưu đãi mới nhất
                    </span>
                </h1>

                <p className="text-disable text-center text-[16px] md:text-[18px]">
                    Nhận ngay{" "}
                    <span className="font-semibold">25% giảm giá</span> cho đơn
                    hàng đầu tiên khi bạn đăng ký nhận bản tin của chúng tôi
                </p>

                <div className="mt-4 flex gap-2 md:w-1/2">
                    <div className="flex-2">
                        <Input
                            value={email}
                            setValue={setEmail}
                            placeholder="Nhập địa chỉ email"
                        />
                    </div>

                    <div className="flex-1">
                        <Button
                            text="Đăng ký"
                            bgColor="bg-surface"
                            textColor="text-black"
                        />
                    </div>
                </div>
            </div>

            <FooterInfo />
        </div>
    );
}

export default Footer;
