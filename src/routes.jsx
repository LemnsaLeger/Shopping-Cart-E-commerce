import App from "./App"
import Store from "./pages/store"
import Main from "./components/mainDOM"
import Home from "./pages/Home";
import Cart from "./pages/cart";


const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/store",
        element: <Store/>,
    },
    {
        path: "/store/:productName",
        element: <Main />,
    },
    {
        path: "/cart",
        element: < Cart/>,
    }
];

export default routes;