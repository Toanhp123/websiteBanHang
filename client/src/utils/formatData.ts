export const formatData = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate(); // 31
    const month = date.getMonth() + 1; // 8
    const year = date.getFullYear(); // 2025

    const formatted = `${day} tháng ${month} năm ${year}`;

    return formatted;
};
