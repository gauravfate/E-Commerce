import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AddProduct from "../pages/Admin/AddProduct";
import AllProducts from "../pages/Admin/AllProducts";
import SingUpAdmin from "../pages/Admin/SingUpAdmin";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/sign-up",
                element: <SignUp />,
            },
            {
                path: "/product/:id",
                element: <ProductDetail />,
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            // admin register page
            {
                path: "/register-admin",
                element: <SingUpAdmin />,
            },
            {
                path: "/admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "add-product",
                        element: <AddProduct />,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />,
                    },
                ],
            },
        ],
    },
]);

export default router;
