import type { UserRole } from "@/features/auth/types/auth.type";

export interface Employee {
    employee_id: number;
    employee_first_name: string;
    employee_last_name: string;
    employee_phone: string;
    employee_birthday: string;
    employee_address: string;
    employee_hire_date: string;
    employee_position_name: string;
    role_name: UserRole;
    email: string;
}

export interface EmployeeDetail extends Employee {
    account_id: number;
    username: string;
}

export type PositionEmployee = {
    employee_position_id: number;
    employee_position_name: string;
    employee_position_description: string;
};

export type Customer = {
    customer_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    customer_birthday: string;
    customer_type: string;
    email: string;
    account_status: "pending" | "approved" | "rejected";
};

export type CustomerMinimal = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
};

export type Shifts = {
    shift_id: number;
    shift_name: string;
    start_time: string;
    end_time: string;
};

export interface EmployeeMinimal {
    employee_id: number;
    employee_name: string;
}

export interface Schedule {
    work_schedule_id: number;
    work_day: number;
    shift_id: number;
    employee_id: number;
}

export interface EmployeeScheduleResponse {
    employees: EmployeeMinimal[];
    schedules: Schedule[];
    shifts: Shifts[];
}
