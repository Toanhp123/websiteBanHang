import { Button, Input } from "@/components/shared";
import { changePassword } from "../services/account.api";
import {
    changePasswordSchema,
    type ChangePasswordFormInputs,
} from "../validations/changePassword.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormInputs>({
        resolver: yupResolver(changePasswordSchema),
    });

    const handleChangePassword = async (data: ChangePasswordFormInputs) => {
        const password = {
            pass: data.pass,
            newPass: data.newPass,
            reNewPass: data.reNewPass,
        };

        try {
            const res = await changePassword(password);

            console.log(res.message);

            if (res.success) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            className="space-y-6"
            onSubmit={handleSubmit(handleChangePassword)}
        >
            <Input
                name="pass"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                register={register("pass")}
                error={errors.pass?.message}
            />
            <Input
                name="newPass"
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                register={register("newPass")}
                error={errors.newPass?.message}
            />
            <Input
                name="reNewPass"
                label="Xác nhận mật khẩu mới"
                placeholder="Nhập lại mật khẩu mới"
                register={register("reNewPass")}
                error={errors.reNewPass?.message}
            />

            <div className="w-55">
                <Button text="Cập nhật mật khẩu" />
            </div>
        </form>
    );
}

export default UpdatePassword;
