import { Button, Input } from "@/components/shared";
import { useState } from "react";
import { changePassword } from "../services/account.api";

function UpdatePassword() {
    const [pass, setPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [reNewPass, setReNewPass] = useState<string>("");

    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const password = {
            pass: formData.get("pass") as string,
            newPass: formData.get("newPass") as string,
            reNewPass: formData.get("reNewPass") as string,
        };

        await changePassword(password);
    };

    return (
        <form className="space-y-6" onSubmit={(e) => handleChangePassword(e)}>
            <Input
                name="pass"
                value={pass}
                setValue={setPass}
                label="Password"
                placeholder="Enter Password"
                required={true}
            />
            <Input
                name="newPass"
                value={newPass}
                setValue={setNewPass}
                label="New Password"
                placeholder="Enter New Password"
                required={true}
            />
            <Input
                name="reNewPass"
                value={reNewPass}
                setValue={setReNewPass}
                label="Confirm New Password"
                placeholder="Enter New Password"
                required={true}
            />

            <div className="w-55">
                <Button text="Update Password" />
            </div>
        </form>
    );
}

export default UpdatePassword;
