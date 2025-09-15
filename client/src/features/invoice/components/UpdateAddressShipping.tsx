import { Button, Input } from "@/components/shared";
import ListAddressShipping from "./ListAddressShipping";
import { useAppSelector } from "@/hooks/useRedux";
import {
    deleteBillDetail,
    selectBillDetail,
} from "@/features/checkout/redux/billingDetail.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createInvoiceAddress } from "../services/invoice.api";
import { addShippingAddress } from "../redux/shippingAddress.slice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    updateAddressShipping,
    type UpdateAddressShippingFormInputs,
} from "../validations/updateAddressShipping.schema";

function UpdateAddressShipping() {
    const billDetailSlice = useAppSelector(selectBillDetail);
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<UpdateAddressShippingFormInputs>({
        resolver: yupResolver(updateAddressShipping),
        defaultValues: { ...billDetailSlice },
    });

    const onSubmit = async (data: UpdateAddressShippingFormInputs) => {
        const shippingAddress = await createInvoiceAddress(data);
        dispatch(addShippingAddress(shippingAddress));
    };

    useEffect(() => {
        dispatch(deleteBillDetail());
    }, [dispatch]);

    return (
        <div className="space-y-8">
            <ListAddressShipping />

            <div className="space-y-4">
                <h1 className="text-xl font-bold">Thêm địa chỉ mới</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
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
                        label="Địa chỉ Email"
                        placeholder="Nhập địa chỉ Email"
                        register={register("email")}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Địa chỉ đường"
                        placeholder="Nhập địa chỉ đường"
                        register={register("street_address")}
                        error={errors.street_address?.message}
                    />

                    <div className="grid grid-cols-2 gap-8">
                        <Input
                            label="Quốc gia"
                            placeholder="Chọn quốc gia"
                            register={register("country")}
                            error={errors.country?.message}
                        />
                        <Input
                            label="Thành phố"
                            placeholder="Chọn thành phố"
                            register={register("city")}
                            error={errors.city?.message}
                        />
                        <Input
                            label="Mã bưu điện"
                            placeholder="Nhập mã bưu điện"
                            register={register("zip_code")}
                            error={errors.zip_code?.message}
                        />
                        <Input
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại"
                            register={register("phone")}
                            error={errors.phone?.message}
                        />
                    </div>

                    <div className="w-45">
                        <Button text="Thêm địa chỉ" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateAddressShipping;
