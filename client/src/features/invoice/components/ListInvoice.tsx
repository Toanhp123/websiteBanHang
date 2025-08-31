import { useEffect } from "react";
import { getAllInvoiceDetail } from "../services/invoice.api";
import ItemInvoice from "./ItemInvoice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
    selectAllInvoiceDetail,
    setAllInvoiceDetail,
} from "../redux/allInvoiceDetail.slice";

function ListInvoice() {
    const listInvoice = useAppSelector(selectAllInvoiceDetail);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getListInvoiceDetail = async () => {
            const res = await getAllInvoiceDetail();

            if (res) {
                dispatch(setAllInvoiceDetail(res));
            }
        };

        getListInvoiceDetail();
    }, [dispatch]);

    return (
        <div className="space-y-6">
            {listInvoice.map((invoice) => (
                <div key={invoice.invoice_id}>
                    <ItemInvoice {...invoice} />
                </div>
            ))}
        </div>
    );
}

export default ListInvoice;
