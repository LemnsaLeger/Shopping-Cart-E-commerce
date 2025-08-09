import { Link } from "react-router-dom";
import { User2Icon, ShoppingCart } from "lucide-react";
import "../index.css";

import { useCart } from "../context/cartcontext";

const Navbar = ({ title = 'E-Store'}) => {

  const { cartCount } = useCart();

    return (
      <>
        <nav className="flex justify-evenly">
          <h1 className="text-lg font-bold">{title}</h1>
          <ul className="flex list-none gap-1 justify-around">
            <li>
              <Link to={"/store"}>Collections</Link>
            </li>
            <li>
              <Link to={"/men"}>Men</Link>
            </li>
            <li>
              <Link to={"/women"}>Women</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li className="relative">
              <Link to={"/cart"}>
                <ShoppingCart stroke="3" width={20} height={20} />
                {
                  cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full">
                      {cartCount}
                    </span>
                  )
                }
              </Link>
            </li>
            <li>
              <Link to={"/profile"}>
                <User2Icon stroke="3" width={20} height={20} />
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
}

export default Navbar;