import { FooterInfo } from "@/components/sections";
import { Button, Input } from "@/components/shared";
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");

    return (
        <div className="space-y-18 bg-gray-200 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-gray-600">
                    Our Newsletter
                </p>

                <h1 className="text-center text-2xl font-bold md:text-3xl">
                    Subscribe to Our Newsletter to <br />
                    Get{" "}
                    <span className="text-primary">
                        Update on Our Latest Offers
                    </span>
                </h1>

                <p className="text-disable text-center text-[16px] md:text-[18px]">
                    Get 25% off on your first order just by subscribe to out
                    newsletter
                </p>

                <div className="mt-4 flex gap-2 md:w-1/2">
                    <div className="flex-2">
                        <Input
                            value={email}
                            setValue={setEmail}
                            placeholder="Enter Email Address"
                        />
                    </div>

                    <div className="flex-1">
                        <Button
                            text="Subscribe"
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
