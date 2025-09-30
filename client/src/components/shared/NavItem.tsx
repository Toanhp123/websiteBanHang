import { Link } from "react-router-dom";

type NavItemPros = {
    text: string;
    to: string;
};

function NavItem({ text, to }: NavItemPros) {
    return (
        <Link className="text-red-500 font-bold" to={`/${to}`}>
            {text}
        </Link>
    );
}

export default NavItem;
