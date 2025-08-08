import { Link } from "react-router-dom";
import { User2Icon, ShoppingCart } from "lucide-react";
import "../index.css";


const Navbar = ({ title = 'E-Store'}) => {

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
              <Link to={"women"}>Women</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li>
              <Link to={"/cart"}>
                <ShoppingCart stroke="3" width={20} height={20} />
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