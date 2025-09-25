import { useEffect, useState } from "react";
import { getAllShifts, registerSchedule } from "../services/account.api";
import type { Shifts } from "../types/accounts.type";
import { useNavigate } from "react-router-dom";

const DAYS = [
    { value: 1, label: "Thứ 2" },
    { value: 2, label: "Thứ 3" },
    { value: 3, label: "Thứ 4" },
    { value: 4, label: "Thứ 5" },
    { value: 5, label: "Thứ 6" },
    { value: 6, label: "Thứ 7" },
    { value: 0, label: "Chủ nhật" },
];

export default function EmployeeWeeklySchedule() {
    const navigate = useNavigate();
    const [shifts, setShifts] = useState<Shifts[]>([]);

    const initialSchedule = DAYS.reduce(
        (acc, day) => ({ ...acc, [day.value]: null }),
        {},
    );
    const [schedule, setSchedule] =
        useState<Record<number, number | null>>(initialSchedule);

    const handleSelectShift = (day: number, shift_id: number) => {
        setSchedule((prev) => ({ ...prev, [day]: shift_id }));
    };

    const handleGetShifts = async () => {
        try {
            const res = await getAllShifts();

            setShifts(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            const res = await registerSchedule(schedule);

            if (res.success) {
                console.log(res.message);
                navigate("/dashboard/employeeSchedule");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReset = () => {
        setSchedule(initialSchedule);
    };

    useEffect(() => {
        handleGetShifts();
    }, []);

    return (
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-xl">
            <table className="w-full border-collapse overflow-hidden rounded-xl shadow-md">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="border px-4 py-3 text-left text-gray-700">
                            Ngày
                        </th>
                        {shifts.map((shift) => (
                            <th
                                key={shift.shift_id}
                                className="border px-4 py-3 text-center text-gray-700"
                            >
                                {`${shift.shift_name} (${shift.start_time} - ${shift.end_time})`}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {DAYS.map((day) => (
                        <tr
                            key={day.value}
                            className="transition hover:bg-gray-50"
                        >
                            <td className="border px-4 py-3 font-medium text-gray-700">
                                {day.label}
                            </td>
                            {shifts.map((shift) => (
                                <td
                                    key={shift.shift_id}
                                    className="border px-4 py-3 text-center"
                                >
                                    <div
                                        className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition ${
                                            schedule[day.value] ===
                                            shift.shift_id
                                                ? "border-blue-700 bg-blue-500"
                                                : "border-gray-300 bg-gray-100"
                                        } flex items-center justify-center border`}
                                        onClick={() =>
                                            handleSelectShift(
                                                day.value,
                                                shift.shift_id,
                                            )
                                        }
                                    >
                                        {schedule[day.value] ===
                                            shift.shift_id && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6 flex justify-end gap-4">
                <button
                    onClick={handleReset}
                    className="rounded-lg bg-gray-400 px-6 py-2 font-semibold text-white transition hover:bg-gray-500"
                >
                    Hủy
                </button>
                <button
                    onClick={handleSave}
                    className="bg-main-primary hover:bg-main-secondary rounded-lg px-6 py-2 font-semibold text-white transition"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
}
