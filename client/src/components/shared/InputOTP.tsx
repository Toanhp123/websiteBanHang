import React, { useState, useRef } from "react";

interface OtpInputProps {
    length: number;
    onComplete: (code: string) => void;
}

const InputOTP = ({ length, onComplete }: OtpInputProps) => {
    const [values, setValues] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return; // chỉ cho nhập số

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus(); // chuyển sang ô tiếp theo
        }

        // Nếu nhập đủ thì gọi callback
        if (newValues.every((v) => v !== "")) {
            onComplete(newValues.join(""));
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace" && !values[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-between">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        if (el) inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={values[i]}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="focus:ring-focus-input h-12 w-12 rounded-full border border-gray-300 text-center text-xl focus:ring-2 focus:outline-none"
                />
            ))}
        </div>
    );
};

export default InputOTP;
