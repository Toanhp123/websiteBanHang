import { Button, Input } from "@/components/shared";
import ListAddressShipping from "./ListAddressShipping";
import { useAppSelector } from "@/hooks/useRedux";
import {
    deleteBillDetail,
    selectBillDetail,
    updateBillDetail,
} from "@/features/checkout/redux/billingDetail.slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createInvoiceAddress } from "../services/invoice.api";
import { addShippingAddress } from "../redux/shippingAddress.slice";

function UpdateAddressShipping() {
    const billDetailSlice = useAppSelector(selectBillDetail);
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

    const handleAddAddressShipping = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const invoiceAddress = {
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            email: formData.get("email") as string,
            street_address: formData.get("street_address") as string,
            city: formData.get("city") as string,
            country: formData.get("country") as string,
            zip_code: formData.get("zip_code") as string,
            phone: formData.get("phone") as string,
        };

        const shippingAddress = await createInvoiceAddress(invoiceAddress);

        dispatch(addShippingAddress(shippingAddress));
    };

    useEffect(() => {
        dispatch(deleteBillDetail());
    }, []);

    return (
        <div className="space-y-8">
            <ListAddressShipping />

            <div className="space-y-4">
                <h1 className="text-xl font-bold">Add New Address</h1>

                <div>
                    <form
                        onSubmit={(e) => handleAddAddressShipping(e)}
                        className="space-y-6"
                    >
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

                        <div className="w-45">
                            <Button text="Add Address" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateAddressShipping;
