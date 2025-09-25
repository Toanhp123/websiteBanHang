import { useEffect, useState } from "react";
import clsx from "clsx";
import { getScheduleAllEmployee } from "../services/account.api";
import type { EmployeeMinimal, Schedule, Shifts } from "../types/accounts.type";

function EmployeeScheduleTable() {
    const [dates, setDates] = useState<string[]>([]);
    const [employee, setEmployee] = useState<EmployeeMinimal[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [shifts, setShifts] = useState<Shifts[]>([]);

    const handleGetScheduleAllEmployee = async () => {
        try {
            const res = await getScheduleAllEmployee();
            if (res) {
                setEmployee(res.employees);
                setSchedules(res.schedules);
                setShifts(res.shifts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // lấy 7 ngày từ hôm nay
        const today = new Date();
        const arr: string[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            arr.push(d.toISOString().slice(0, 10));
        }
        setDates(arr);
    }, []);

    useEffect(() => {
        handleGetScheduleAllEmployee();
    }, []);

    return (
        <div className="overflow-auto rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
                Lịch làm việc nhân viên
            </h2>
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-50 text-gray-700">
                    <tr>
                        <th className="border px-4 py-3 text-left">
                            Nhân viên
                        </th>
                        {dates.map((date) => (
                            <th
                                key={date}
                                className="border px-4 py-3 text-center"
                            >
                                {date}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {employee.map((emp, empIndex) => (
                        <tr
                            key={emp.employee_id}
                            className={clsx(
                                empIndex % 2 === 0 ? "bg-gray-50" : "bg-white",
                                "transition hover:bg-blue-50",
                            )}
                        >
                            <td className="border px-4 py-2 font-medium text-gray-800">
                                {emp.employee_name}
                            </td>

                            {dates.map((date, index) => {
                                const scheduleItem = schedules.find(
                                    (s) =>
                                        s.employee_id === emp.employee_id &&
                                        s.work_day === index,
                                );

                                const shiftInfo = scheduleItem
                                    ? shifts.find(
                                          (sh) =>
                                              sh.shift_id ===
                                              scheduleItem.shift_id,
                                      )
                                    : null;

                                return (
                                    <td
                                        key={date}
                                        className={clsx(
                                            "border px-4 py-2 text-center font-medium transition",
                                            shiftInfo
                                                ? "bg-green-200 text-green-800"
                                                : "text-gray-400",
                                        )}
                                    >
                                        {shiftInfo
                                            ? `${shiftInfo.shift_name} (${shiftInfo.start_time}-${shiftInfo.end_time})`
                                            : "-"}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeScheduleTable;
