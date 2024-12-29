import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "./network/user";
import { login, logout } from "./store/userSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // fetch user details
        fetchUserDetails().then((userData) => {
            console.log("hi",userData);
            if (userData) {
                dispatch(login(userData.data));
            } else {
                dispatch(logout());
            }
        });
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-116px)]">
                <Outlet />
            </main>
            <Footer />

            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
}

export default App;
