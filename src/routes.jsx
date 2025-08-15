import App from "./App"
import Store from "./pages/store"
import Main from "./components/mainDOM"
import Home from "./pages/Home";
import Cart from "./pages/cart";
import PageNotFound from "./pages/pageNotFound";


const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <PageNotFound />,
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