import { Button, Input } from "@/components/shared";
import { useState } from "react";

// TODO: cần làm
function UpdatePersonalInfo() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    return (
        <form className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <Input
                    value={firstName}
                    setValue={setFirstName}
                    label="First Name"
                    placeholder="First Name"
                />
                <Input
                    value={lastName}
                    setValue={setLastName}
                    label="Last Name"
                    placeholder="last Name"
                />
            </div>

            <Input
                value={email}
                setValue={setEmail}
                label="Email"
                inputFormat="email"
                placeholder="Email Address"
            />
            <Input
                value={phone}
                setValue={setPhone}
                label="Phone"
                inputFormat="tel"
                placeholder="Phone Number"
            />

            <div className="w-55">
                <Button text="Update Changes" />
            </div>
        </form>
    );
}

export default UpdatePersonalInfo;
