function FooterInfo() {
    return (
        <div className="bg-main-primary space-y-12 rounded-2xl px-8 py-12">
            <div className="grid grid-cols-2 gap-4 text-gray-200 md:grid-cols-3 xl:grid-cols-5">
                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">Logo</li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatibus quidem suscipit earum atque aliquam
                    </li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Company
                    </li>
                    <li>About Us</li>
                    <li>Blog</li>
                    <li>Contact Us</li>
                    <li>Career</li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Customer Services
                    </li>
                    <li>My Account</li>
                    <li>Track Your Order</li>
                    <li>Return</li>
                    <li>FAQ</li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Our information
                    </li>
                    <li>Privacy</li>
                    <li>User Term & Condition</li>
                    <li>Return Policy</li>
                </ul>

                <ul className="space-y-2">
                    <li className="mb-4 text-xl font-bold text-white">
                        Contact Us
                    </li>
                    <li>+0123-456-789</li>
                    <li>example@gmail.com</li>
                    <li>Address</li>
                </ul>
            </div>

            <div className="border-b border-green-600"></div>

            <div className="flex items-center justify-between text-white">
                <p>Copyright 2024. All Right Reserved</p>

                <div className="flex items-center justify-center">
                    <p>English</p>
                    <div className="mx-2 h-6 border-r border-white"></div>
                    <p>USD</p>
                </div>
            </div>
        </div>
    );
}

export default FooterInfo;
