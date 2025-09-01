import { useAppDispatch } from "@/hooks/useRedux";
import { Button } from "@/components/shared";
import { deleteShippingAddressAsync } from "../redux/shippingAddress.thunk";
import { useGetAddressShipping } from "@/hooks/useGetAddressShipping";

function ListAddressShipping() {
    const shippingAddress = useGetAddressShipping();
    const dispatch = useAppDispatch();

    const handleDeleteAddressShipping = (invoice_address_id: number) => {
        dispatch(deleteShippingAddressAsync(invoice_address_id));
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 divide-y divide-gray-300 rounded-2xl border border-gray-300 px-4 pt-4">
                {shippingAddress.map((address) => (
                    <div
                        key={address.invoice_address_id}
                        className="flex items-center justify-between pb-4"
                    >
                        <div>
                            <h1 className="font-semibold">{`${address.first_name} ${address.last_name}`}</h1>
                            <p className="text-disable">
                                {`${address.street_address}, ${address.city}, ${address.country}`}
                            </p>
                        </div>

                        <div>
                            <Button
                                onClick={() =>
                                    handleDeleteAddressShipping(
                                        address.invoice_address_id,
                                    )
                                }
                                text="Delete"
                                textSize="small"
                                bgColor=""
                                textColor="text-red-500"
                                border=""
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListAddressShipping;
