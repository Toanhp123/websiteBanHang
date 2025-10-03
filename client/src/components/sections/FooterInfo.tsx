import logo from "@/assets/images/background/image2.png";


function FooterInfo() {
    return (
        <div className="bg-main-primary space-y-12 rounded-2xl px-8 py-12">
            <div className="grid grid-cols-2 gap-4 text-gray-200 md:grid-cols-3 xl:grid-cols-5">
                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        <div className=" lg:flex-1/4">
                           <img src={logo} alt="Logo" className="h-12"/>
                        </div>
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Chúng tôi cam kết mang đến cho khách hàng dịch vụ tốt
                        nhất.
                    </li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Công ty
                    </li>
                    <li>Về chúng tôi</li>
                    <li>Blog</li>
                    <li>Liên hệ</li>
                    <li>Tuyển dụng</li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Dịch vụ khách hàng
                    </li>
                    <li>Tài khoản của tôi</li>
                    <li>Theo dõi đơn hàng</li>
                    <li>Đổi trả</li>
                    <li>Câu hỏi thường gặp</li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Thông tin
                    </li>
                    <li>Chính sách bảo mật</li>
                    <li>Điều khoản sử dụng</li>
                    <li>Chính sách đổi trả</li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Liên hệ
                    </li>
                    <li>+0123-456-789</li>
                    <li>example@gmail.com</li>
                    <li>Địa chỉ công ty</li>
                </ul>
            </div>

            <div className="border-b border-gray-200"></div>

            <div className="flex items-center text-white">
                <p>Bản quyền © 2024. Đã đăng ký mọi quyền.</p>
            </div>
        </div>
    );
}

export default FooterInfo;
