import { useState } from "react";

function AddDiscountForm() {
    // Mock data (sau này thay bằng API)
    const products = [
        { id: 1, name: "Cà phê sữa" },
        { id: 2, name: "Trà đào" },
        { id: 3, name: "Bánh ngọt" },
    ];

    const categories = [
        { id: 1, name: "Đồ uống" },
        { id: 2, name: "Bánh ngọt" },
    ];

    const [formData, setFormData] = useState({
        promotion_name: "",
        valid_from: "",
        valid_to: "",
        distribution_type: "share",
        range_apply: "invoice",
        product_ids: [] as number[],

        // Effect
        effect_type: "",
        effect_value: "",
        buy_x: "",
        gift_y: "",

        // Rule
        rule_type: "",
        rule_operator: ">=",
        rule_value: "",
        category_id: "",
        product_id: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, (option) =>
            Number(option.value),
        );
        setFormData({ ...formData, product_ids: selected });
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", formData);
        // TODO: gọi API backend để lưu promotion
    };

    return (
        <div className="rounded-2xl bg-white shadow-md">
            <form className="space-y-8 px-8 py-6" onSubmit={handleSubmitForm}>
                {/* Thông tin chung */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">
                        Thông tin khuyến mãi
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="promotion_name"
                            placeholder="Tên khuyến mãi"
                            value={formData.promotion_name}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                            required
                        />
                        <select
                            name="distribution_type"
                            value={formData.distribution_type}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="share">Share</option>
                            <option value="exclusive">Exclusive</option>
                        </select>
                        <select
                            name="range_apply"
                            value={formData.range_apply}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="invoice">Invoice</option>
                            <option value="product">Product</option>
                        </select>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                name="valid_from"
                                value={formData.valid_from}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            <input
                                type="date"
                                name="valid_to"
                                value={formData.valid_to}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                        </div>
                    </div>

                    {formData.range_apply === "product" && (
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-medium">
                                Chọn sản phẩm áp dụng
                            </label>
                            <select
                                multiple
                                value={formData.product_ids.map(String)}
                                onChange={handleMultiSelect}
                                className="h-32 w-full rounded border px-3 py-2"
                            >
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Effect */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">Hiệu ứng</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <select
                            name="effect_type"
                            value={formData.effect_type}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="">-- Chọn hiệu ứng --</option>
                            <option value="DISCOUNT_PERCENT">
                                Giảm theo %
                            </option>
                            <option value="DISCOUNT_AMOUNT">
                                Giảm theo số tiền
                            </option>
                            <option value="BUY_X_GIFT_Y">Mua X tặng Y</option>
                        </select>

                        {/* render input tùy loại */}
                        {formData.effect_type === "DISCOUNT_PERCENT" && (
                            <input
                                type="number"
                                name="effect_value"
                                placeholder="Nhập % giảm"
                                value={formData.effect_value}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                        )}
                        {formData.effect_type === "DISCOUNT_AMOUNT" && (
                            <input
                                type="number"
                                name="effect_value"
                                placeholder="Nhập số tiền giảm"
                                value={formData.effect_value}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                        )}
                        {formData.effect_type === "BUY_X_GIFT_Y" && (
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="buy_x"
                                    placeholder="Mua X"
                                    value={formData.buy_x}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                />
                                <input
                                    type="number"
                                    name="gift_y"
                                    placeholder="Tặng Y"
                                    value={formData.gift_y}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Rule */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">Điều kiện</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <select
                            name="rule_type"
                            value={formData.rule_type}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="">-- Chọn điều kiện --</option>
                            <option value="MIN_INVOICE_AMOUNT">
                                Hóa đơn tối thiểu
                            </option>
                            <option value="MIN_PRODUCT_QTY">
                                Số lượng sản phẩm tối thiểu
                            </option>
                            <option value="PRODUCT_CATEGORY">
                                Theo danh mục
                            </option>
                            <option value="PRODUCT_ID">Theo sản phẩm</option>
                        </select>

                        {/* input tương ứng rule */}
                        {(formData.rule_type === "MIN_INVOICE_AMOUNT" ||
                            formData.rule_type === "MIN_PRODUCT_QTY") && (
                            <>
                                <select
                                    name="rule_operator"
                                    value={formData.rule_operator}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                >
                                    <option value=">=">&gt;=</option>
                                    <option value="<=">&lt;=</option>
                                    <option value="==">==</option>
                                </select>
                                <input
                                    type="number"
                                    name="rule_value"
                                    placeholder="Nhập giá trị"
                                    value={formData.rule_value}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                />
                            </>
                        )}

                        {formData.rule_type === "PRODUCT_CATEGORY" && (
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {formData.rule_type === "PRODUCT_ID" && (
                            <select
                                name="product_id"
                                value={formData.product_id}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            >
                                <option value="">-- Chọn sản phẩm --</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                    >
                        Lưu khuyến mãi
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDiscountForm;
