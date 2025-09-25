import { Button, Input } from "@/components/shared";
import { useState, useEffect } from "react";
import { changeProfile, getProfile } from "../services/account.api";
import type { CustomerMinimal } from "../types/accounts.type";
import {
    updateProfileSchema,
    type UpdateProfileFormInputs,
} from "../validations/updateProfile.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isEqual } from "lodash";

function UpdatePersonalInfo() {
    const [profile, setProfile] = useState<CustomerMinimal | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileFormInputs>({
        resolver: yupResolver(updateProfileSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            phone_number: "",
        },
    });

    const currentData = watch();

    const isChanged = profile && !isEqual(profile, currentData);

    const getChangedFields = () => {
        if (!profile) return {};

        const changes: Record<string, unknown> = {};

        Object.entries(currentData).forEach(([key, value]) => {
            if ((profile as Record<string, unknown>)[key] !== value) {
                changes[key] = value;
            }
        });

        return changes;
    };

    const handleGetProfile = async () => {
        try {
            const res = await getProfile();

            if (res) {
                const data = {
                    ...res,
                };

                Object.entries(data).forEach(([key, value]) => {
                    setValue(key as keyof UpdateProfileFormInputs, value);
                });

                setProfile(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeProfile = async () => {
        const changes = getChangedFields();

        try {
            const res = await changeProfile(changes);

            if (res.success) {
                console.log(res.message);

                setReload((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetProfile();
    }, [reload]);

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
                        {profile?.first_name} {profile?.last_name}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {profile?.email}
                    </p>
                    <p>
                        <span className="font-semibold">Số điện thoại:</span>{" "}
                        {profile?.phone_number}
                    </p>
                </div>
            </div>

            {/* Form cập nhật */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    Cập nhật thông tin
                </h2>

                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handleChangeProfile)}
                >
                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="Họ"
                            placeholder="Nhập họ"
                            register={register("first_name")}
                            error={errors.first_name?.message}
                        />
                        <Input
                            label="Tên"
                            placeholder="Nhập tên"
                            register={register("last_name")}
                            error={errors.last_name?.message}
                        />
                    </div>

                    <Input
                        label="Email"
                        inputFormat="email"
                        placeholder="Địa chỉ email"
                        register={register("email")}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Số điện thoại"
                        inputFormat="tel"
                        placeholder="Nhập số điện thoại"
                        register={register("phone_number")}
                        error={errors.phone_number?.message}
                    />

                    <div className="pt-2">
                        <Button text="Lưu thay đổi" disabled={!isChanged} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePersonalInfo;
