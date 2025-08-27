import { Input } from "@/components/shared";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import {
    selectBillDetail,
    updateBillDetail,
} from "../redux/billingDetail.slice";

function BillingAddress() {
    const billDetailSlice = useAppSelector(selectBillDetail);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        dispatch(
            updateBillDetail({
                key: name as keyof typeof billDetailSlice,
                value,
            }),
        );
    };

    return (
        <div className="shadow-light m-2 space-y-6 rounded-2xl p-8">
            <h1 className="text-xl font-bold">Billing Address</h1>

            <div>
                <form action="" className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                        <Input
                            name="firstName"
                            setValueList={handleChange}
                            value={billDetailSlice.firstName}
                            label="First Name"
                            required={true}
                            placeholder="First Name"
                        />
                        <Input
                            name="lastName"
                            setValueList={handleChange}
                            value={billDetailSlice.lastName}
                            label="Last Name"
                            required={true}
                            placeholder="Last Name"
                        />
                    </div>

                    <Input
                        name="email"
                        setValueList={handleChange}
                        value={billDetailSlice.email}
                        label="Email Address"
                        required={true}
                        placeholder="Enter Email Address"
                    />

                    <Input
                        name="streetAddress"
                        setValueList={handleChange}
                        value={billDetailSlice.streetAddress}
                        label="Street Address"
                        required={true}
                        placeholder="Enter Street Address"
                    />

                    <div className="grid grid-cols-2 gap-8">
                        <Input
                            name="country"
                            setValueList={handleChange}
                            value={billDetailSlice.country}
                            label="Country"
                            required={true}
                            placeholder="Select Country"
                        />
                        <Input
                            name="city"
                            setValueList={handleChange}
                            value={billDetailSlice.city}
                            label="City"
                            required={true}
                            placeholder="Select City"
                        />
                        <Input
                            name="zipCode"
                            setValueList={handleChange}
                            value={billDetailSlice.zipCode}
                            label="Zip Code"
                            required={true}
                            placeholder="Enter Zip Code"
                        />
                        <Input
                            name="phone"
                            setValueList={handleChange}
                            value={billDetailSlice.phone}
                            label="Phone Number"
                            required={true}
                            placeholder="Enter Phone Number"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BillingAddress;
