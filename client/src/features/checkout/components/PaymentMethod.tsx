import { useState } from "react";
import { FormCheckoutSection } from "@/layouts/Customer";
import { Input } from "@/components/shared";

const PAYMENT_OPTIONS = [
    { id: "cod", name: "Thanh toán khi nhận hàng" },
    { id: "card", name: "Thẻ tín dụng / ghi nợ" },
    { id: "momo", name: "Ví Momo" },
];

export default function PaymentMethod() {
    const [selected, setSelected] = useState<string>("cod");
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardHolder: "",
    });

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <FormCheckoutSection>
            <h1 className="text-2xl font-bold">Phương Thức Thanh Toán</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {PAYMENT_OPTIONS.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelected(option.id)}
                        className={`flex cursor-pointer items-center justify-center rounded-xl border p-6 text-center transition-all ${
                            selected === option.id
                                ? "border-main-primary scale-105 bg-green-50 shadow-lg"
                                : "border-gray-300 hover:scale-105 hover:bg-gray-50"
                        }`}
                    >
                        <p className="font-medium">{option.name}</p>
                    </div>
                ))}
            </div>

            {/* Hiển thị form nhập thẻ nếu chọn phương thức thẻ */}
            {selected === "card" && (
                <div className="mt-6 space-y-4 rounded-xl border border-gray-300 bg-gray-50 p-6">
                    <h2 className="text-xl font-semibold">Thông Tin Thẻ</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            name="cardHolder"
                            setValueList={handleCardChange}
                            value={cardInfo.cardHolder}
                            label="Tên Chủ Thẻ"
                            placeholder="Nhập tên trên thẻ"
                            required
                        />
                        <Input
                            name="cardNumber"
                            setValueList={handleCardChange}
                            value={cardInfo.cardNumber}
                            label="Số Thẻ"
                            placeholder="XXXX XXXX XXXX XXXX"
                            required
                        />
                        <Input
                            name="expiry"
                            setValueList={handleCardChange}
                            value={cardInfo.expiry}
                            label="Ngày Hết Hạn"
                            placeholder="MM/YY"
                            required
                        />
                        <Input
                            name="cvv"
                            setValueList={handleCardChange}
                            value={cardInfo.cvv}
                            label="CVV"
                            placeholder="XXX"
                            required
                        />
                    </div>
                </div>
            )}
        </FormCheckoutSection>
    );
}
