import axios from "@/utils/axiosInstance";

export const changePassword = async ({ ...changePassword }): Promise<void> => {
    await axios.put("account/password", { changePassword });
};
