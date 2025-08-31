import { Input } from "@/components/shared";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import {
    selectBillDetail,
    updateBillDetail,
} from "../redux/billingDetail.slice";
import { FormCheckoutSection } from "@/layouts";

function ShippingAddress() {
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

    return (
        <FormCheckoutSection>
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
        </FormCheckoutSection>
    );
}

export default ShippingAddress;
