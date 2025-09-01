import { Input } from "@/components/shared";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import {
    deleteBillDetail,
    selectBillDetail,
    updateBillDetail,
} from "../redux/billingDetail.slice";
import { FormCheckoutSection } from "@/layouts";
import { useGetAddressShipping } from "@/hooks/useGetAddressShipping";
import { useEffect, useState } from "react";
import type { BillDetailState } from "../types/checkout.type";

function ShippingAddress() {
    const [selectOption, setSelectOption] = useState<string>("");
    const billDetailSlice = useAppSelector(selectBillDetail);
    const listShippingAddress = useGetAddressShipping();
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        dispatch(
            updateBillDetail({
                key: name as keyof typeof billDetailSlice,
                value,
            }),
        );
    };

    useEffect(() => {
        if (selectOption === "custom") {
            dispatch(deleteBillDetail());
        }

        if (Number(selectOption)) {
            const shippingAddress = listShippingAddress.filter(
                (shippingAddress) =>
                    shippingAddress.invoice_address_id === Number(selectOption),
            )[0];

            Object.entries(shippingAddress).map(([key, value]) => {
                dispatch(
                    updateBillDetail({
                        key: key as keyof BillDetailState,
                        value,
                    }),
                );
            });
        }
    }, [selectOption]);

    return (
        <FormCheckoutSection>
            <div className="space-y-4">
                <h1 className="text-xl font-bold">Exits Shipping Address</h1>

                <div className="grid grid-cols-1 gap-4 divide-y divide-gray-300 rounded-2xl border border-gray-300 px-4 pt-4">
                    <div className="h-30 overflow-auto">
                        {listShippingAddress.map((address) => (
                            <label
                                key={address.invoice_address_id}
                                className="flex justify-between"
                            >
                                <div className="flex items-center justify-between pb-4 pl-4">
                                    <div className="flex gap-4">
                                        <h1 className="font-semibold">{`${address.first_name} ${address.last_name}`}</h1>
                                        <p className="text-disable">
                                            {`${address.street_address}, ${address.city}, ${address.country}`}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center pr-4 pb-4">
                                    <Input
                                        type="radio"
                                        inputFormat="radio"
                                        value={address.invoice_address_id.toString()}
                                        checked={
                                            selectOption ===
                                            address.invoice_address_id.toString()
                                        }
                                        setValue={setSelectOption}
                                    />
                                </div>
                            </label>
                        ))}
                    </div>

                    <label className="flex justify-between">
                        <div className="flex items-center justify-between pb-4 pl-4">
                            <div className="flex gap-4">
                                <h1 className="font-semibold">
                                    New Shipping Address
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center pr-4 pb-4">
                            <Input
                                type="radio"
                                inputFormat="radio"
                                value="custom"
                                checked={selectOption === "custom"}
                                setValue={setSelectOption}
                            />
                        </div>
                    </label>
                </div>
            </div>

            {selectOption === "custom" && (
                <div className="space-y-4">
                    <h1 className="text-xl font-bold">Shipping Address</h1>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                name="first_name"
                                setValueList={handleChange}
                                value={billDetailSlice.first_name}
                                label="First Name"
                                required={true}
                                labelColor="text-disable"
                                placeholder="First Name"
                            />
                            <Input
                                name="last_name"
                                setValueList={handleChange}
                                value={billDetailSlice.last_name}
                                label="Last Name"
                                required={true}
                                labelColor="text-disable"
                                placeholder="Last Name"
                            />
                        </div>

                        <Input
                            name="email"
                            setValueList={handleChange}
                            value={billDetailSlice.email}
                            label="Email Address"
                            required={true}
                            labelColor="text-disable"
                            placeholder="Enter Email Address"
                        />

                        <Input
                            name="street_address"
                            setValueList={handleChange}
                            value={billDetailSlice.street_address}
                            label="Street Address"
                            required={true}
                            labelColor="text-disable"
                            placeholder="Enter Street Address"
                        />

                        <div className="grid grid-cols-2 gap-8">
                            <Input
                                name="country"
                                setValueList={handleChange}
                                value={billDetailSlice.country}
                                label="Country"
                                required={true}
                                labelColor="text-disable"
                                placeholder="Select Country"
                            />
                            <Input
                                name="city"
                                setValueList={handleChange}
                                value={billDetailSlice.city}
                                label="City"
                                required={true}
                                labelColor="text-disable"
                                placeholder="Select City"
                            />
                            <Input
                                name="zip_code"
                                setValueList={handleChange}
                                value={billDetailSlice.zip_code}
                                label="Zip Code"
                                required={true}
                                labelColor="text-disable"
                                placeholder="Enter Zip Code"
                            />
                            <Input
                                name="phone"
                                setValueList={handleChange}
                                value={billDetailSlice.phone}
                                label="Phone Number"
                                required={true}
                                labelColor="text-disable"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                    </form>
                </div>
            )}
        </FormCheckoutSection>
    );
}

export default ShippingAddress;
