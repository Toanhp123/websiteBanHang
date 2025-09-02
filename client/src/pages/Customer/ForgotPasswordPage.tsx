import { ForgotPass } from "@/features/auth/components";

function ForgotPasswordPage() {
    return (
        <div className="flex h-screen items-center justify-center p-12 md:justify-around">
            {/* Background Image cho màn hình máy tính */}
            <div className="hidden h-full w-2/5 rounded-4xl bg-[url(@/assets/images/background/1.png)] bg-cover bg-no-repeat md:block"></div>

            <ForgotPass />
        </div>
    );
}

export default ForgotPasswordPage;
