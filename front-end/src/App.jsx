import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import OrderDegtailsPage from "./Pages/OrderDegtailsPage";
import MyOrderPage from "./Pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />

            <Routes>
                <Route path="/" element={<UserLayout />}>
                    {/* User Layout */}
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="collections/:collection" element={<CollectionPage />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route
                        path="order-confirmation"
                        element={<OrderConfirmationPage />}
                    />
                    <Route path="order/:id" element={<OrderDegtailsPage />} />
                    <Route path="my-orders" element={<MyOrderPage />} />
                </Route>

                <Route>
                    <Route path="/admin" element={<AdminLayout />} />
                    {/* Admin Layout */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
