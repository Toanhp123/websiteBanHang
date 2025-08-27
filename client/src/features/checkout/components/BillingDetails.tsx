import { Input } from "@/components/shared";
import { useState } from "react";

function BillingDetails() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [streetAddress, setStreetAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Shipping Address</h1>

            <div>
                <form action="" className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                        <Input
                            setValue={setFirstName}
                            value={firstName}
                            label="First Name"
                            required={true}
                            placeholder="First Name"
                        />
                        <Input
                            setValue={setLastName}
                            value={lastName}
                            label="Last Name"
                            required={true}
                            placeholder="Last Name"
                        />
                    </div>

                    <Input
                        setValue={setCompanyName}
                        value={companyName}
                        label="Company Name"
                        required={false}
                        placeholder="Enter Company Name"
                    />
                    <Input
                        setValue={setCountry}
                        value={country}
                        label="Country"
                        required={true}
                        placeholder="Select Country"
                    />
                    <Input
                        setValue={setStreetAddress}
                        value={streetAddress}
                        label="Street Address"
                        required={true}
                        placeholder="Enter Street Address"
                    />
                    <Input
                        setValue={setCity}
                        value={city}
                        label="City"
                        required={true}
                        placeholder="Select City"
                    />
                    <Input
                        setValue={setZipCode}
                        value={zipCode}
                        label="Zip Code"
                        required={true}
                        placeholder="Enter Zip Code"
                    />
                    <Input
                        setValue={setPhone}
                        value={phone}
                        label="Phone Number"
                        required={true}
                        placeholder="Enter Phone Number"
                    />
                    <Input
                        setValue={setEmail}
                        value={email}
                        label="Email Address"
                        required={true}
                        placeholder="Enter Email Address"
                    />
                </form>
            </div>
        </div>
    );
}

export default BillingDetails;
