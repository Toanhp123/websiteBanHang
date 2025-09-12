import { InputForDashboard } from "@/components/shared";

function AddDiscountForm() {
    return (
        <div className="space-y-8">
            <form className="space-y-8 rounded-2xl bg-white px-8 py-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Add Discount</h2>
                </div>

                {/* Body */}
                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-700">
                        Discount Information
                    </h2>

                    <div className="grid grid-cols-2 gap-8">
                        <InputForDashboard
                            label="Discount Name"
                            placeholder="Type Here"
                        />
                        <InputForDashboard
                            label="Discount Distribution"
                            placeholder="Type Here"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputForDashboard
                                type="date"
                                label="Discount Start"
                            />
                            <InputForDashboard
                                type="date"
                                label="Discount End"
                            />
                        </div>
                    </div>

                    <div className="grid"></div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-4">
                    <button className="bg-main-primary hover:bg-main-secondary rounded px-4 py-2 text-white">
                        Save Discount
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddDiscountForm;
