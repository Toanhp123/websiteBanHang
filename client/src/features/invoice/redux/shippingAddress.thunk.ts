import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteAddressShipping } from "../services/invoice.api";

export const deleteShippingAddressAsync = createAsyncThunk(
    "invoice/address/delete",
    async (invoice_address_id: number) => {
        await deleteAddressShipping(invoice_address_id);

        return invoice_address_id;
    },
);
