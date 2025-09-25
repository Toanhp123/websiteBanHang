import type { EditPopupPros } from "../types/warehouse.type";

function ReceiptRefundedDetailPopup({ id, popup }: EditPopupPros) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 p-4">
            <form className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl"></form>
        </div>
    );
}

export default ReceiptRefundedDetailPopup;
